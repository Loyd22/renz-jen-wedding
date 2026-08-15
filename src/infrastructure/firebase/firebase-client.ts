import {
  getApp,
  getApps,
  initializeApp,
  type FirebaseApp,
} from "firebase/app";

import {
  environment,
  isFirebaseConfigured,
} from "@/config/environment";

let firebaseApp: FirebaseApp | null = null;

/**
 * Returns one shared Firebase application instance.
 *
 * Next.js refreshes modules during development, so this function
 * prevents Firebase from being initialized more than once.
 */
export function getFirebaseApp(): FirebaseApp | null {
  if (!isFirebaseConfigured()) {
    return null;
  }

  if (firebaseApp) {
    return firebaseApp;
  }

  firebaseApp =
    getApps().length > 0
      ? getApp()
      : initializeApp(environment.firebase);

  return firebaseApp;
}