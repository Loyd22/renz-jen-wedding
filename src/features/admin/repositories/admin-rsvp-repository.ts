import {
  collection,
  getDocs,
  orderBy,
  query,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

import type { RsvpSubmission } from "@/features/admin/types/rsvp-submission";
import { getFirestoreDatabase } from "@/infrastructure/firebase/firestore-client";
import { firestoreCollections } from "@/infrastructure/firebase/firestore-collections";

function convertDocument(
  document: QueryDocumentSnapshot<DocumentData>,
): RsvpSubmission {
  const data = document.data();

  return {
    id: document.id,

    fullName:
      typeof data.fullName === "string"
        ? data.fullName
        : "",

    normalizedFullName:
      typeof data.normalizedFullName === "string"
        ? data.normalizedFullName
        : "",

    email:
      typeof data.email === "string"
        ? data.email
        : "",

    phone:
      typeof data.phone === "string"
        ? data.phone
        : "",

    attendance:
      data.attendance === "declined"
        ? "declined"
        : "attending",

    guestCount:
      typeof data.guestCount === "number"
        ? data.guestCount
        : 0,

    guestNames:
      Array.isArray(data.guestNames)
        ? data.guestNames.filter(
            (name): name is string =>
              typeof name === "string",
          )
        : [],

    message:
      typeof data.message === "string"
        ? data.message
        : "",

    agreementAccepted:
      data.agreementAccepted === true,

    createdAt:
      data.createdAt ?? null,

    updatedAt:
      data.updatedAt ?? null,
  };
}

export async function getRsvpSubmissions(): Promise<
  RsvpSubmission[]
> {
  const database =
    getFirestoreDatabase();

  if (!database) {
    throw new Error(
      "Firebase is not configured.",
    );
  }

  const rsvpQuery = query(
    collection(
      database,
      firestoreCollections.rsvpSubmissions,
    ),
    orderBy("createdAt", "desc"),
  );

  const snapshot =
    await getDocs(rsvpQuery);

  return snapshot.docs.map(
    convertDocument,
  );
}