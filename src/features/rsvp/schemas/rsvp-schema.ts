import { z } from "zod";

export const attendanceOptions = [
  "attending",
  "declined",
] as const;

export const rsvpSchema = z
  .object({
    fullName: z
      .string()
      .trim()
      .min(2, "Please enter your full name.")
      .max(120, "Full name is too long."),

    attendance: z.enum(attendanceOptions, {
      message: "Please select your attendance.",
    }),

    agreementAccepted: z
      .boolean()
      .refine((value) => value, {
        message:
          "Please confirm that the information is correct.",
      }),
  });

export type RsvpFormValues =
  z.infer<typeof rsvpSchema>;
