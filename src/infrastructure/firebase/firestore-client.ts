import {
  getFirestore,
  type Firestore,
} from "firebase/firestore";

import { getFirebaseApp } from "@/infrastructure/firebase/firebase-client";

let firestoreDatabase: Firestore | null = null;

/**
 * Returns the shared Firestore database instance.
 *
 * Null means Firebase has not been configured yet.
 */
export function getFirestoreDatabase(): Firestore | null {
  if (firestoreDatabase) {
    return firestoreDatabase;
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return null;
  }

  firestoreDatabase = getFirestore(firebaseApp);

  return firestoreDatabase;
}