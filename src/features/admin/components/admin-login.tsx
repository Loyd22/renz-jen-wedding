"use client";

import {
  useState,
  type FormEvent,
} from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import { getFirebaseAuth } from "@/infrastructure/firebase/firebase-auth";

interface AdminLoginProps {
  onLogin: () => void;
}

export function AdminLogin({
  onLogin,
}: AdminLoginProps) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState<string | null>(null);

  const [isLoading, setIsLoading] =
    useState(false);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError(null);
    setIsLoading(true);

    try {
      const auth =
        getFirebaseAuth();

      if (!auth) {
        throw new Error(
          "Firebase Authentication is not configured.",
        );
      }

      await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      onLogin();
    } catch (error) {
      console.error(
        "Admin login failed:",
        error,
      );

      setError(
        "Invalid email or password.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div
      className="
        mx-auto
        max-w-md
        border
        border-[var(--color-antique-gold)]/30
        bg-[#F8F5EE]
        p-8
        sm:p-10
      "
    >
      <div className="text-center">
        <p
          className="
            text-xs
            uppercase
            tracking-[0.2em]
            text-[var(--color-antique-gold)]
          "
        >
          Renz & Jen
        </p>

        <h1
          className="
            mt-3
            font-[family-name:var(--font-serif)]
            text-4xl
            text-[var(--color-dark-olive)]
          "
        >
          Admin Login
        </h1>

        <p
          className="
            mt-3
            text-sm
            text-[var(--color-charcoal)]/60
          "
        >
          Sign in to view RSVP
          responses.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-5"
      >
        <label
          className="
            block
            text-sm
            text-[var(--color-dark-olive)]
          "
        >
          Email Address

          <input
            type="email"
            value={email}
            onChange={(event) =>
              setEmail(
                event.target.value,
              )
            }
            autoComplete="email"
            required
            className="
              mt-2
              w-full
              border
              border-[var(--color-antique-gold)]/30
              bg-white
              px-4
              py-3
              outline-none
              focus:border-[var(--color-antique-gold)]
            "
          />
        </label>

        <label
          className="
            block
            text-sm
            text-[var(--color-dark-olive)]
          "
        >
          Password

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value,
              )
            }
            autoComplete="current-password"
            required
            className="
              mt-2
              w-full
              border
              border-[var(--color-antique-gold)]/30
              bg-white
              px-4
              py-3
              outline-none
              focus:border-[var(--color-antique-gold)]
            "
          />
        </label>

        {error && (
          <p
            role="alert"
            className="
              border-l-2
              border-red-700
              bg-red-50
              px-4
              py-3
              text-sm
              text-red-800
            "
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="
            w-full
            bg-[var(--color-dark-olive)]
            px-6
            py-4
            text-sm
            font-medium
            uppercase
            tracking-[0.15em]
            text-white
            disabled:opacity-60
          "
        >
          {isLoading
            ? "Signing in..."
            : "Sign In"}
        </button>
      </form>
    </div>
  );
}