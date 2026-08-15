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

    email: z
      .string()
      .trim()
      .email("Please enter a valid email address.")
      .or(z.literal("")),

    phone: z
      .string()
      .trim()
      .max(30, "Phone number is too long."),

    attendance: z.enum(attendanceOptions, {
      message: "Please select your attendance.",
    }),

    guestCount: z
    .number()
    .int()
    .min(0)
    .max(10),

    guestNames: z
      .string()
      .trim()
      .max(500, "Guest names are too long."),

    message: z
      .string()
      .trim()
      .max(1000, "Message is too long."),

    agreementAccepted: z
    .boolean()
    .refine((value) => value, {
    message: "Please confirm that the information is correct.",
  }),
  })
  .superRefine((data, context) => {
    if (
      data.attendance === "attending" &&
      data.guestCount < 1
    ) {
      context.addIssue({
        code: "custom",
        path: ["guestCount"],
        message: "Select at least one attending guest.",
      });
    }

    if (
      data.attendance === "declined" &&
      data.guestCount !== 0
    ) {
      context.addIssue({
        code: "custom",
        path: ["guestCount"],
        message: "Guest count must be zero when declining.",
      });
    }
  });

export type RsvpFormValues = z.infer<typeof rsvpSchema>;