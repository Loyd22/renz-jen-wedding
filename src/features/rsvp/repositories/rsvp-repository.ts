import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

import { rsvpSchema, type RsvpFormValues } from "@/features/rsvp/schemas/rsvp-schema";
import { getFirestoreDatabase } from "@/infrastructure/firebase/firestore-client";
import { firestoreCollections } from "@/infrastructure/firebase/firestore-collections";

function normalizeName(name: string): string {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

export async function createRsvpSubmission(
  values: RsvpFormValues,
): Promise<string> {
  const validatedValues = rsvpSchema.parse(values);
  const database = getFirestoreDatabase();

  if (!database) {
    throw new Error(
      "Firebase is not configured. Check your environment variables.",
    );
  }

  const submission = {
    fullName: validatedValues.fullName,

    normalizedFullName: normalizeName(
      validatedValues.fullName,
    ),

    attendance: validatedValues.attendance,

    guestCount:
      validatedValues.attendance === "attending"
        ? 1
        : 0,

    agreementAccepted:
      validatedValues.agreementAccepted,

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
