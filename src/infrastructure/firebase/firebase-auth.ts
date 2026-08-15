import {
  getAuth,
  type Auth,
} from "firebase/auth";

import { getFirebaseApp } from "@/infrastructure/firebase/firebase-client";

let firebaseAuth: Auth | null = null;

/**
 * Returns the Firebase Authentication instance.
 *
 * We will use this later for the private admin dashboard.
 */
export function getFirebaseAuth(): Auth | null {
  if (firebaseAuth) {
    return firebaseAuth;
  }

  const firebaseApp = getFirebaseApp();

  if (!firebaseApp) {
    return null;
  }

  firebaseAuth = getAuth(firebaseApp);

  return firebaseAuth;
}