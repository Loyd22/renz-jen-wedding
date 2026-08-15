import type { Timestamp } from "firebase/firestore";

export interface RsvpSubmission {
  id: string;

  fullName: string;
  normalizedFullName: string;

  email: string;
  phone: string;

  attendance:
    | "attending"
    | "declined";

  guestCount: number;

  guestNames: string[];

  message: string;

  agreementAccepted: boolean;

  createdAt: Timestamp | null;
  updatedAt: Timestamp | null;
}