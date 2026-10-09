import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { test } from "node:test";
import { createRequire } from "node:module";
import ts from "typescript";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const require = createRequire(import.meta.url);

// Exercise the actual TypeScript modules without contacting the live database.
function loadModule(relativePath, imports = {}) {
  const filename = path.resolve(import.meta.dirname, "..", relativePath);
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
  });
  const loadedModule = { exports: {} };
  vm.runInThisContext(`(function(require, module, exports) {${outputText}\n})`, { filename })(
    (name) => Object.hasOwn(imports, name) ? imports[name] : require(name),
    loadedModule,
    loadedModule.exports,
  );
  return loadedModule.exports;
}

const schemaModule = loadModule("src/features/rsvp/schemas/rsvp-schema.ts");
const validResponse = {
  fullName: "  Juan Dela Cruz  ",
  attendance: "attending",
  agreementAccepted: true,
};

test("admin deletion targets only the selected RSVP and propagates permission failures", async () => {
  const database = {};
  const deleted = [];
  let configured = true;
  let denied = false;
  const { deleteRsvpSubmission } = loadModule("src/features/admin/repositories/admin-rsvp-repository.ts", {
    "@/infrastructure/firebase/firestore-client": { getFirestoreDatabase: () => configured ? database : null },
    "@/infrastructure/firebase/firestore-collections": {
      firestoreCollections: { rsvpSubmissions: "rsvpSubmissions" },
    },
    "firebase/firestore": {
      doc: (db, collection, id) => {
        assert.equal(db, database);
        return `${collection}/${id}`;
      },
      deleteDoc: async (reference) => {
        if (denied) throw Object.assign(new Error("Denied"), { code: "permission-denied" });
        deleted.push(reference);
      },
    },
  });
  await deleteRsvpSubmission("selected-response");
  assert.deepEqual(deleted, ["rsvpSubmissions/selected-response"]);
  await assert.rejects(deleteRsvpSubmission(""), /Invalid RSVP/);
  await assert.rejects(deleteRsvpSubmission("other/path"), /Invalid RSVP/);
  configured = false;
  await assert.rejects(deleteRsvpSubmission("selected-response"), /not configured/);
  configured = true;
  denied = true;
  await assert.rejects(deleteRsvpSubmission("another-response"), { code: "permission-denied" });
  assert.deepEqual(deleted, ["rsvpSubmissions/selected-response"]);
});

test("the rendered form contains only name, attendance, confirmation, and submit", () => {
  const { RsvpForm } = loadModule("src/features/rsvp/components/rsvp-form.tsx", {
    "@/features/rsvp/schemas/rsvp-schema": schemaModule,
    "@/features/rsvp/repositories/rsvp-repository": { createRsvpSubmission: async () => "test-id" },
  });
  const html = renderToStaticMarkup(createElement(RsvpForm));
  assert.deepEqual([...html.matchAll(/<input[^>]*name="([^"]+)"/g)].map(match => match[1]), [
    "fullName", "attendance", "attendance", "agreementAccepted",
  ]);
  assert.match(html, /Submit RSVP/);
  assert.doesNotMatch(html, /<textarea|<select/);
});

test("minimal responses validate for either attendance choice; invalid responses fail", () => {
  const { rsvpSchema } = schemaModule;
  for (const attendance of ["attending", "declined"]) {
    const result = rsvpSchema.parse({ ...validResponse, attendance });
    assert.equal(result.fullName, "Juan Dela Cruz");
    assert.equal(result.attendance, attendance);
  }
  for (const invalid of [
    { fullName: "   " },
    { fullName: "A" },
    { fullName: "A".repeat(121) },
    { attendance: "maybe" },
    { attendance: undefined },
    { agreementAccepted: false },
    { agreementAccepted: undefined },
  ]) {
    assert.equal(rsvpSchema.safeParse({ ...validResponse, ...invalid }).success, false);
  }
});

test("database writes contain only the simplified data and derived guest count", async () => {
  const writes = [];
  const timestamp = { serverTimestamp: true };
  const { createRsvpSubmission } = loadModule("src/features/rsvp/repositories/rsvp-repository.ts", {
    "@/features/rsvp/schemas/rsvp-schema": schemaModule,
    "@/infrastructure/firebase/firestore-client": { getFirestoreDatabase: () => ({}) },
    "@/infrastructure/firebase/firestore-collections": {
      firestoreCollections: { rsvpSubmissions: "rsvpSubmissions" },
    },
    "firebase/firestore": {
      collection: (_database, name) => name,
      serverTimestamp: () => timestamp,
      addDoc: async (collection, data) => {
        writes.push({ collection, data });
        return { id: "test-id" };
      },
    },
  });
  for (const attendance of ["attending", "declined"]) {
    assert.equal(await createRsvpSubmission({
      ...validResponse, attendance, fullName: "  Juan   Dela Cruz  ",
      email: "old@example.com", phone: "123", guestCount: 8,
      guestNames: "Another Guest", message: "Old message",
    }), "test-id");
    const { collection, data } = writes.at(-1);
    assert.equal(collection, "rsvpSubmissions");
    assert.deepEqual(Object.keys(data).sort(), [
      "fullName", "normalizedFullName", "attendance", "guestCount",
      "agreementAccepted", "createdAt", "updatedAt",
    ].sort());
    assert.equal(data.fullName, "Juan   Dela Cruz");
    assert.equal(data.normalizedFullName, "juan dela cruz");
    assert.equal(data.guestCount, attendance === "attending" ? 1 : 0);
    assert.equal(data.agreementAccepted, true);
    assert.equal(data.createdAt, timestamp);
    assert.equal(data.updatedAt, timestamp);
  }
  await assert.rejects(createRsvpSubmission({ ...validResponse, agreementAccepted: false }));
  assert.equal(writes.length, 2);
});

test("admin reads new documents and preserves historical guest details", async () => {
  const documents = [
    { ...validResponse, fullName: "New Guest", guestCount: 1 },
    { ...validResponse, fullName: "Declined Guest", attendance: "declined", guestCount: 0 },
    { ...validResponse, fullName: "Legacy Guest", guestCount: 3,
      guestNames: ["Guest Two", "Guest Three"], email: "old@example.com", message: "Hello" },
  ];
  const { getRsvpSubmissions } = loadModule("src/features/admin/repositories/admin-rsvp-repository.ts", {
    "@/infrastructure/firebase/firestore-client": { getFirestoreDatabase: () => ({}) },
    "@/infrastructure/firebase/firestore-collections": {
      firestoreCollections: { rsvpSubmissions: "rsvpSubmissions" },
    },
    "firebase/firestore": {
      collection: () => ({}), orderBy: () => ({}), query: () => ({}),
      getDocs: async () => ({ docs: documents.map((data, index) => ({ id: String(index), data: () => data })) }),
    },
  });
  const result = await getRsvpSubmissions();
  assert.equal(result[0].guestCount, 1);
  assert.deepEqual(result[0].guestNames, []);
  assert.equal(result[0].email, "");
  assert.equal(result[0].message, "");
  assert.equal(result[1].guestCount, 0);
  assert.equal(result[1].attendance, "declined");
  assert.equal(result[2].guestCount, 3);
  assert.deepEqual(result[2].guestNames, ["Guest Two", "Guest Three"]);
  assert.equal(result[2].email, "old@example.com");
});
