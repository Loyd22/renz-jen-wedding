"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  LogOut,
  RefreshCw,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

import { signOut } from "firebase/auth";

import { getFirebaseAuth } from "@/infrastructure/firebase/firebase-auth";

import {
  getRsvpSubmissions,
} from "@/features/admin/repositories/admin-rsvp-repository";

import type {
  RsvpSubmission,
} from "@/features/admin/types/rsvp-submission";

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({
  onLogout,
}: AdminDashboardProps) {
  const [
    submissions,
    setSubmissions,
  ] = useState<RsvpSubmission[]>([]);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState<string | null>(null);

  // Load the RSVP responses when the dashboard first opens.
  useEffect(() => {
    let isMounted = true;

    async function loadInitialSubmissions() {
      try {
        const data =
          await getRsvpSubmissions();

        if (isMounted) {
          setSubmissions(data);
        }
      } catch (error) {
        console.error(
          "Could not load RSVP submissions:",
          error,
        );

        if (isMounted) {
          setError(
            "Could not load RSVP responses.",
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    void loadInitialSubmissions();

    return () => {
      isMounted = false;
    };
  }, []);

  // Used when the admin manually presses Refresh.
  async function handleRefresh() {
    setIsLoading(true);
    setError(null);

    try {
      const data =
        await getRsvpSubmissions();

      setSubmissions(data);
    } catch (error) {
      console.error(
        "Could not refresh RSVP submissions:",
        error,
      );

      setError(
        "Could not load RSVP responses.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  const statistics =
    useMemo(() => {
      const attending =
        submissions.filter(
          (submission) =>
            submission.attendance ===
            "attending",
        );

      const declined =
        submissions.filter(
          (submission) =>
            submission.attendance ===
            "declined",
        );

      const totalAttendingGuests =
        attending.reduce(
          (
            total,
            submission,
          ) =>
            total +
            submission.guestCount,
          0,
        );

      return {
        responses:
          submissions.length,

        attendingResponses:
          attending.length,

        declinedResponses:
          declined.length,

        totalAttendingGuests,
      };
    }, [submissions]);

  async function handleLogout() {
    const auth =
      getFirebaseAuth();

    if (auth) {
      await signOut(auth);
    }

    onLogout();
  }

  return (
    <div>
      {/* Dashboard header */}
      <div
        className="
          flex
          flex-col
          gap-5
          border-b
          border-[var(--color-antique-gold)]/25
          pb-8
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
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
              mt-2
              font-[family-name:var(--font-serif)]
              text-4xl
              text-[var(--color-dark-olive)]
            "
          >
            RSVP Dashboard
          </h1>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() =>
              void handleRefresh()
            }
            disabled={isLoading}
            className="
              flex
              items-center
              gap-2
              border
              border-[var(--color-dark-olive)]
              px-4
              py-2
              text-sm
              text-[var(--color-dark-olive)]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            <RefreshCw
              size={16}
              className={
                isLoading
                  ? "animate-spin"
                  : ""
              }
            />

            Refresh
          </button>

          <button
            type="button"
            onClick={() =>
              void handleLogout()
            }
            className="
              flex
              items-center
              gap-2
              bg-[var(--color-dark-olive)]
              px-4
              py-2
              text-sm
              text-white
            "
          >
            <LogOut size={16} />

            Logout
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div
        className="
          mt-8
          grid
          gap-4
          sm:grid-cols-2
          lg:grid-cols-4
        "
      >
        <StatCard
          title="Responses"
          value={
            statistics.responses
          }
          icon={
            <Users size={20} />
          }
        />

        <StatCard
          title="Accepting"
          value={
            statistics.attendingResponses
          }
          icon={
            <UserCheck size={20} />
          }
        />

        <StatCard
          title="Declined"
          value={
            statistics.declinedResponses
          }
          icon={
            <UserX size={20} />
          }
        />

        <StatCard
          title="Total Guests"
          value={
            statistics.totalAttendingGuests
          }
          icon={
            <Users size={20} />
          }
        />
      </div>

      {/* Error message */}
      {error && (
        <p
          role="alert"
          className="
            mt-8
            border-l-2
            border-red-700
            bg-red-50
            px-4
            py-3
            text-red-800
          "
        >
          {error}
        </p>
      )}

      {/* Loading state */}
      {isLoading ? (
        <p
          className="
            mt-10
            text-center
            text-[var(--color-charcoal)]/60
          "
        >
          Loading RSVP responses...
        </p>
      ) : (
        <div
          className="
            mt-8
            overflow-x-auto
            border
            border-[var(--color-antique-gold)]/25
          "
        >
          <table
            className="
              w-full
              min-w-[1000px]
              border-collapse
              bg-white
              text-left
              text-sm
            "
          >
            <thead
              className="
                bg-[#F4F0E7]
                text-[var(--color-dark-olive)]
              "
            >
              <tr>
                <th className="px-4 py-4">
                  Guest
                </th>

                <th className="px-4 py-4">
                  Status
                </th>

                <th className="px-4 py-4">
                  Guests
                </th>

                <th className="px-4 py-4">
                  Additional Guests
                </th>

                <th className="px-4 py-4">
                  Contact
                </th>

                <th className="px-4 py-4">
                  Message
                </th>

                <th className="px-4 py-4">
                  Submitted
                </th>
              </tr>
            </thead>

            <tbody>
              {submissions.map(
                (submission) => (
                  <tr
                    key={
                      submission.id
                    }
                    className="
                      border-t
                      border-[var(--color-antique-gold)]/15
                    "
                  >
                    <td className="px-4 py-4">
                      <p className="font-medium">
                        {
                          submission.fullName
                        }
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      {submission.attendance ===
                      "attending"
                        ? "Attending"
                        : "Declined"}
                    </td>

                    <td className="px-4 py-4">
                      {
                        submission.guestCount
                      }
                    </td>

                    <td className="px-4 py-4">
                      {submission
                        .guestNames
                        .length >
                      0
                        ? submission.guestNames.join(
                            ", ",
                          )
                        : "—"}
                    </td>

                    <td className="px-4 py-4">
                      <div>
                        {submission.email ||
                          "—"}
                      </div>

                      <div
                        className="
                          mt-1
                          text-[var(--color-charcoal)]/60
                        "
                      >
                        {submission.phone ||
                          "—"}
                      </div>
                    </td>

                    <td
                      className="
                        max-w-xs
                        px-4
                        py-4
                      "
                    >
                      {submission.message ||
                        "—"}
                    </td>

                    <td className="px-4 py-4">
                      {formatTimestamp(
                        submission.createdAt,
                      )}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>

          {submissions.length ===
            0 && (
            <p
              className="
                py-12
                text-center
                text-[var(--color-charcoal)]/60
              "
            >
              No RSVP responses
              yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div
      className="
        border
        border-[var(--color-antique-gold)]/25
        bg-[#F8F5EE]
        p-6
      "
    >
      <div
        className="
          flex
          items-center
          justify-between
          text-[var(--color-antique-gold)]
        "
      >
        <span
          className="
            text-xs
            uppercase
            tracking-[0.12em]
            text-[var(--color-dark-olive)]
          "
        >
          {title}
        </span>

        {icon}
      </div>

      <p
        className="
          mt-4
          font-[family-name:var(--font-serif)]
          text-4xl
          text-[var(--color-dark-olive)]
        "
      >
        {value}
      </p>
    </div>
  );
}

function formatTimestamp(
  timestamp:
    RsvpSubmission["createdAt"],
): string {
  if (!timestamp) {
    return "—";
  }

  return timestamp
    .toDate()
    .toLocaleString(
      "en-PH",
      {
        dateStyle: "medium",
        timeStyle: "short",
      },
    );
}