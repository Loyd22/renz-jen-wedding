"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  LogOut,
  Printer,
  RefreshCw,
  Trash2,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

import { signOut } from "firebase/auth";

import { getFirebaseAuth } from "@/infrastructure/firebase/firebase-auth";

import {
  deleteRsvpSubmission,
  getRsvpSubmissions,
} from "@/features/admin/repositories/admin-rsvp-repository";

import type {
  RsvpSubmission,
} from "@/features/admin/types/rsvp-submission";

interface AdminDashboardProps {
  onLogout: () => void;
}

interface PrintableGuest {
  name: string;
  primaryGuest: string;
  type:
    | "Primary Guest"
    | "Additional Guest";
}

type StatusFilter =
  | "all"
  | "attending"
  | "declined";

export function AdminDashboard({
  onLogout,
}: AdminDashboardProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteNotice, setDeleteNotice] = useState<string | null>(null);
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

  const [
    statusFilter,
    setStatusFilter,
  ] = useState<StatusFilter>("all");

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

  async function handleRefresh() {
    if (deletingId || isLoading) return;
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

  async function handleDelete(submission: RsvpSubmission) {
    if (deletingId || isLoading) return;
    if (!window.confirm(`Delete the RSVP for ${submission.fullName}? This permanently removes this response and cannot be undone.`)) {
      return;
    }

    setDeletingId(submission.id);
    setDeleteNotice(null);
    setError(null);
    try {
      await deleteRsvpSubmission(submission.id);
      setSubmissions((current) => current.filter((item) => item.id !== submission.id));
      setDeleteNotice(`RSVP for ${submission.fullName} deleted.`);
    } catch (error) {
      const code = (error as { code?: string }).code;
      setError(code === "permission-denied"
        ? "You do not have permission to delete this RSVP. Sign in with the authorized admin account."
        : "Could not delete this RSVP. Please try again.");
    } finally {
      setDeletingId(null);
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

  const filteredSubmissions =
    useMemo(() => {
      if (statusFilter === "all") {
        return submissions;
      }

      return submissions.filter(
        (submission) =>
          submission.attendance ===
          statusFilter,
      );
    }, [
      submissions,
      statusFilter,
    ]);

  const printableGuests =
    useMemo<PrintableGuest[]>(() => {
      const guests: PrintableGuest[] =
        [];

      const attendingSubmissions =
        submissions.filter(
          (submission) =>
            submission.attendance ===
            "attending",
        );

      for (
        const submission of
          attendingSubmissions
      ) {
        guests.push({
          name:
            submission.fullName,

          primaryGuest:
            submission.fullName,

          type:
            "Primary Guest",
        });

        submission.guestNames.forEach(
          (guestName) => {
            guests.push({
              name: guestName,

              primaryGuest:
                submission.fullName,

              type:
                "Additional Guest",
            });
          },
        );

        const expectedAdditionalGuests =
          Math.max(
            submission.guestCount -
              1,
            0,
          );

        const unnamedGuestCount =
          Math.max(
            expectedAdditionalGuests -
              submission.guestNames
                .length,
            0,
          );

        for (
          let index = 0;
          index <
          unnamedGuestCount;
          index += 1
        ) {
          guests.push({
            name:
              "Name not provided",

            primaryGuest:
              submission.fullName,

            type:
              "Additional Guest",
          });
        }
      }

      return guests.sort((first, second) =>
        first.name.trim().localeCompare(second.name.trim(), "en-PH", {
          sensitivity: "base",
        }),
      );
    }, [submissions]);

  async function handleLogout() {
    const auth =
      getFirebaseAuth();

    if (auth) {
      await signOut(auth);
    }

    onLogout();
  }

  function handlePrint() {
    window.print();
  }

  return (
    <>
      {/* Normal admin dashboard */}
      <div className="print:hidden">
        {/* Header */}
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

          <div
            className="
              flex
              flex-wrap
              gap-3
            "
          >
            <button
              type="button"
              onClick={
                handlePrint
              }
              disabled={
                printableGuests.length ===
                0
              }
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
                transition
                hover:bg-[var(--color-dark-olive)]
                hover:text-white
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <Printer
                size={16}
              />

              Print Attendee List
            </button>

            <button
              type="button"
              onClick={() =>
                void handleRefresh()
              }
              disabled={
                isLoading || deletingId !== null
              }
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
                transition
                hover:bg-[var(--color-dark-olive)]
                hover:text-white
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
              <LogOut
                size={16}
              />

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
              <Users
                size={20}
              />
            }
          />

          <StatCard
            title="Accepting"
            value={
              statistics
                .attendingResponses
            }
            icon={
              <UserCheck
                size={20}
              />
            }
          />

          <StatCard
            title="Declined"
            value={
              statistics
                .declinedResponses
            }
            icon={
              <UserX
                size={20}
              />
            }
          />

          <StatCard
            title="Total Guests"
            value={
              statistics
                .totalAttendingGuests
            }
            icon={
              <Users
                size={20}
              />
            }
          />
        </div>

        {/* Filter buttons */}
        <div
          className="
            mt-8
            flex
            flex-wrap
            gap-3
          "
        >
          <button
            type="button"
            onClick={() =>
              setStatusFilter(
                "all",
              )
            }
            className={`
              border
              px-5
              py-2
              text-sm
              font-medium
              transition

              ${
                statusFilter ===
                "all"
                  ? `
                    border-[var(--color-dark-olive)]
                    bg-[var(--color-dark-olive)]
                    text-white
                  `
                  : `
                    border-[var(--color-dark-olive)]/40
                    bg-transparent
                    text-[var(--color-dark-olive)]
                    hover:border-[var(--color-dark-olive)]
                  `
              }
            `}
          >
            All (
            {
              statistics.responses
            }
            )
          </button>

          <button
            type="button"
            onClick={() =>
              setStatusFilter(
                "attending",
              )
            }
            className={`
              border
              px-5
              py-2
              text-sm
              font-medium
              transition

              ${
                statusFilter ===
                "attending"
                  ? `
                    border-[var(--color-dark-olive)]
                    bg-[var(--color-dark-olive)]
                    text-white
                  `
                  : `
                    border-[var(--color-dark-olive)]/40
                    bg-transparent
                    text-[var(--color-dark-olive)]
                    hover:border-[var(--color-dark-olive)]
                  `
              }
            `}
          >
            Attending (
            {
              statistics.attendingResponses
            }
            )
          </button>

          <button
            type="button"
            onClick={() =>
              setStatusFilter(
                "declined",
              )
            }
            className={`
              border
              px-5
              py-2
              text-sm
              font-medium
              transition

              ${
                statusFilter ===
                "declined"
                  ? `
                    border-red-700
                    bg-red-700
                    text-white
                  `
                  : `
                    border-red-700/40
                    bg-transparent
                    text-red-700
                    hover:border-red-700
                  `
              }
            `}
          >
            Declined (
            {
              statistics.declinedResponses
            }
            )
          </button>
        </div>

        {deleteNotice && (
          <p role="status" className="mt-6 text-[var(--color-dark-olive)]">
            {deleteNotice}
          </p>
        )}

        {/* Error */}
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

        {/* Loading */}
        {isLoading ? (
          <p
            className="
              mt-10
              text-center
              text-[var(--color-charcoal)]/60
            "
          >
            Loading RSVP
            responses...
          </p>
        ) : (
          <div
            className="
              mt-5
              overflow-x-auto
              border
              border-[var(--color-antique-gold)]/25
            "
          >
            <table
              className="
                w-full
                min-w-[1100px]
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
                    Full Name
                  </th>

                  <th className="px-4 py-4">Normalized Name</th>

                  <th className="px-4 py-4">
                    Attendance
                  </th>

                  <th className="px-4 py-4">
                    Guest Count
                  </th>

                  <th className="px-4 py-4">Confirmation Accepted</th>

                  <th className="px-4 py-4">
                    Created At
                  </th>
                  <th className="px-4 py-4">Updated At</th>
                  <th className="px-4 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredSubmissions.map(
                  (
                    submission,
                  ) => (
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
                        {submission.normalizedFullName || "—"}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={
                            submission.attendance ===
                            "attending"
                              ? `
                                inline-block
                                bg-[var(--color-dark-olive)]/10
                                px-3
                                py-1
                                font-medium
                                text-[var(--color-dark-olive)]
                              `
                              : `
                                inline-block
                                bg-red-50
                                px-3
                                py-1
                                font-medium
                                text-red-700
                              `
                          }
                        >
                          {submission.attendance ===
                          "attending"
                            ? "Attending"
                            : "Declined"}
                        </span>
                      </td>

                      <td className="px-4 py-4">
                        {
                          submission.guestCount
                        }
                      </td>

                      <td className="px-4 py-4">
                        {submission.agreementAccepted ? "Yes" : "No"}
                      </td>

                      <td className="px-4 py-4">
                        {formatTimestamp(
                          submission.createdAt,
                        )}
                      </td>
                      <td className="px-4 py-4">
                        {formatTimestamp(submission.updatedAt)}
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          onClick={() => void handleDelete(submission)}
                          disabled={deletingId !== null || isLoading}
                          aria-label={`Delete RSVP for ${submission.fullName}`}
                          className="inline-flex min-h-11 items-center gap-2 rounded border border-red-700/30 px-3 py-2 text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Trash2 aria-hidden="true" size={16} />
                          {deletingId === submission.id ? "Deleting..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>

            {filteredSubmissions.length ===
              0 && (
              <p
                className="
                  py-12
                  text-center
                  text-[var(--color-charcoal)]/60
                "
              >
                {statusFilter ===
                "attending"
                  ? "No attending guests yet."
                  : statusFilter ===
                      "declined"
                    ? "No declined guests yet."
                    : "No RSVP responses yet."}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Print-only attendee list */}
      <section
        className="
          hidden
          print:block
          print:text-black
        "
      >
        <div className="mb-8 text-center">
          <p
            className="
              text-sm
              uppercase
              tracking-widest
            "
          >
            Renz & Jen
          </p>

          <h1
            className="
              mt-2
              text-3xl
              font-bold
            "
          >
            Wedding Attendee
            List
          </h1>

          <p className="mt-2">
            December 10, 2026
          </p>

          <p
            className="
              mt-1
              font-semibold
            "
          >
            Total Expected
            Attendees:{" "}
            {
              printableGuests.length
            }
          </p>
        </div>

        <table
          className="
            w-full
            table-fixed
            border-collapse
            text-left
            text-sm
          "
        >
          <colgroup>
            <col className="w-12" />
            <col />
            <col className="w-24" />
          </colgroup>
          <thead>
            <tr>
              <th
                className="
                  border
                  border-black
                  px-3
                  py-2
                "
              >
                #
              </th>

              <th
                className="
                  border
                  border-black
                  px-3
                  py-2
                "
              >
                Guest Name
              </th>

              <th
                className="
                  border
                  border-black
                  px-3
                  py-2
                "
              >
                Check-in
              </th>
            </tr>
          </thead>

          <tbody>
            {printableGuests.map(
              (
                guest,
                index,
              ) => (
                <tr
                  key={`${guest.primaryGuest}-${guest.name}-${index}`}
                >
                  <td
                    className="
                      border
                      border-black
                      px-3
                      py-2
                    "
                  >
                    {index + 1}
                  </td>

                  <td
                    className="
                      border
                      border-black
                      px-3
                      py-2
                    "
                  >
                    {guest.name}
                  </td>

                  <td
                    className="
                      border
                      border-black
                      px-3
                      py-2
                    "
                  >
                    <span
                      aria-label="Unchecked attendance box"
                      className="mx-auto block h-5 w-5 border border-black bg-white"
                    />
                  </td>
                </tr>
              ),
            )}
          </tbody>
        </table>
      </section>
    </>
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
        dateStyle:
          "medium",
        timeStyle:
          "short",
        timeZone: "Asia/Manila",
      },
    );
}
