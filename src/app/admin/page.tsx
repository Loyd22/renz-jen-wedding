"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  type User,
} from "firebase/auth";

import { AdminDashboard } from "@/features/admin/components/admin-dashboard";
import { AdminLogin } from "@/features/admin/components/admin-login";
import { getFirebaseAuth } from "@/infrastructure/firebase/firebase-auth";

export default function AdminPage() {
  const auth = getFirebaseAuth();

  const [user, setUser] =
    useState<User | null>(
      () => auth?.currentUser ?? null,
    );

  const [
    isCheckingAuth,
    setIsCheckingAuth,
  ] = useState(() => auth !== null);

  useEffect(() => {
    if (!auth) {
      return;
    }

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (firebaseUser) => {
          setUser(firebaseUser);
          setIsCheckingAuth(false);
        },
      );

    return unsubscribe;
  }, [auth]);

  if (!auth) {
    return (
      <main
        className="
          min-h-screen
          bg-[var(--color-warm-white)]
          px-6
          py-24
        "
      >
        <p
          className="
            text-center
            text-red-700
          "
        >
          Firebase Authentication is not configured.
        </p>
      </main>
    );
  }

  if (isCheckingAuth) {
    return (
      <main
        className="
          min-h-screen
          bg-[var(--color-warm-white)]
          px-6
          py-24
        "
      >
        <p
          className="
            text-center
            text-[var(--color-charcoal)]/60
          "
        >
          Checking authentication...
        </p>
      </main>
    );
  }

  return (
    <main
      className="
        min-h-screen
        bg-[var(--color-warm-white)]
        px-4
        py-16
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-7xl">
        {user ? (
          <AdminDashboard
            onLogout={() =>
              setUser(null)
            }
          />
        ) : (
          <AdminLogin
            onLogin={() => {
              setUser(
                auth.currentUser,
              );
            }}
          />
        )}
      </div>
    </main>
  );
}