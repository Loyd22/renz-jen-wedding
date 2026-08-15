// This file centralizes the Firebase environment variables.
//
// Firebase's public web configuration is used by the browser.
// Database protection will come from Authentication and Firestore rules.

export const environment = {
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
    storageBucket:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
    messagingSenderId:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
  },
} as const;

/**
 * Checks whether every required Firebase setting exists.
 *
 * This lets the wedding website continue running even before
 * Firebase has been fully configured.
 */
export function isFirebaseConfigured(): boolean {
  return Object.values(environment.firebase).every(
    (value) => value.trim().length > 0,
  );
}