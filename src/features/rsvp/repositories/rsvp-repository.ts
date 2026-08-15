import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import type { RsvpFormValues } from "@/features/rsvp/schemas/rsvp-schema";
import { getFirestoreDatabase } from "@/infrastructure/firebase/firestore-client";
import { firestoreCollections } from "@/infrastructure/firebase/firestore-collections";

function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

function convertGuestNames(value: string): string[] {
  return value
    .split("\n")
    .map((name) => name.trim())
    .filter(Boolean)
    .slice(0, 10);
}

export async function createRsvpSubmission(
  values: RsvpFormValues,
): Promise<string> {
  const database = getFirestoreDatabase();

  if (!database) {
    throw new Error(
      "Firebase is not configured. Check your environment variables.",
    );
  }

  const submission = {
    fullName: values.fullName.trim(),

    normalizedFullName: normalizeName(
      values.fullName,
    ),

    email: values.email.trim(),

    phone: values.phone.trim(),

    attendance: values.attendance,

    guestCount:
      values.attendance === "attending"
        ? values.guestCount
        : 0,

    guestNames:
      values.attendance === "attending"
        ? convertGuestNames(values.guestNames)
        : [],

    message: values.message.trim(),

    agreementAccepted:
      values.agreementAccepted,

    createdAt: serverTimestamp(),

    updatedAt: serverTimestamp(),
  };

  const documentReference = await addDoc(
    collection(
      database,
      firestoreCollections.rsvpSubmissions,
    ),
    submission,
  );

  return documentReference.id;
}