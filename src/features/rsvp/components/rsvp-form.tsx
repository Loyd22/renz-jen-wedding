"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  LoaderCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";

import {
  rsvpSchema,
  type RsvpFormValues,
} from "@/features/rsvp/schemas/rsvp-schema";

import { createRsvpSubmission } from "@/features/rsvp/repositories/rsvp-repository";

const inputClassName = `
  mt-2
  w-full
  border
  border-[var(--color-antique-gold)]/35
  bg-white
  px-4
  py-3
  text-[var(--color-charcoal)]
  outline-none
  transition
  placeholder:text-[var(--color-charcoal)]/35
  focus:border-[var(--color-antique-gold)]
`;

const labelClassName = `
  block
  text-sm
  font-medium
  text-[var(--color-dark-olive)]
`;

export function RsvpForm() {
  const [submissionError, setSubmissionError] =
    useState<string | null>(null);

  const [isSuccessful, setIsSuccessful] =
    useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<RsvpFormValues>({
    resolver: zodResolver(rsvpSchema),

    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      attendance: "attending",
      guestCount: 1,
      guestNames: "",
      message: "",
      agreementAccepted: false,
    },
  });

  const attendance = watch("attendance");

  async function onSubmit(
    values: RsvpFormValues,
  ): Promise<void> {
    setSubmissionError(null);
    setIsSuccessful(false);

    try {
      await createRsvpSubmission(values);

      setIsSuccessful(true);

      reset({
        fullName: "",
        email: "",
        phone: "",
        attendance: "attending",
        guestCount: 1,
        guestNames: "",
        message: "",
        agreementAccepted: false,
      });
    } catch (error) {
      console.error(
        "RSVP submission failed:",
        error,
      );

      setSubmissionError(
        "We could not submit your RSVP. Please try again.",
      );
    }
  }

  if (isSuccessful) {
    return (
      <div
        className="
          border
          border-[var(--color-antique-gold)]/35
          bg-white
          px-6
          py-12
          text-center
          sm:px-10
        "
      >
        <CheckCircle2
          className="
            mx-auto
            text-[var(--color-antique-gold)]
          "
          size={42}
        />

        <h3
          className="
            mt-5
            font-[family-name:var(--font-serif)]
            text-3xl
            text-[var(--color-dark-olive)]
          "
        >
          RSVP Received
        </h3>

        <p
          className="
            mx-auto
            mt-4
            max-w-lg
            leading-7
            text-[var(--color-charcoal)]/70
          "
        >
          Thank you for responding. Your RSVP has been
          successfully recorded.
        </p>

        <button
          type="button"
          onClick={() =>
            setIsSuccessful(false)
          }
          className="
            mt-8
            border
            border-[var(--color-dark-olive)]
            px-6
            py-3
            text-sm
            font-medium
            uppercase
            tracking-[0.15em]
            text-[var(--color-dark-olive)]
            transition
            hover:bg-[var(--color-dark-olive)]
            hover:text-white
          "
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        border
        border-[var(--color-antique-gold)]/30
        bg-[#F8F5EE]
        p-6
        sm:p-10
      "
      noValidate
    >
      {/* Basic guest information */}
      <div
        className="
          grid
          gap-6
          sm:grid-cols-2
        "
      >
        <FormField
          label="Full Name"
          error={
            errors.fullName?.message
          }
        >
          <input
            {...register("fullName")}
            type="text"
            autoComplete="name"
            placeholder="Juan Dela Cruz"
            className={inputClassName}
          />
        </FormField>

        <FormField
          label="Email Address"
          error={
            errors.email?.message
          }
        >
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            placeholder="guest@example.com"
            className={inputClassName}
          />
        </FormField>

        <FormField
          label="Phone Number"
          error={
            errors.phone?.message
          }
        >
          <input
            {...register("phone")}
            type="tel"
            autoComplete="tel"
            placeholder="09XX XXX XXXX"
            className={inputClassName}
          />
        </FormField>
      </div>

      {/* Attendance selection */}
      <fieldset className="mt-8">
        <legend
          className={
            labelClassName
          }
        >
          Will you be attending?
        </legend>

        <div
          className="
            mt-3
            grid
            gap-3
            sm:grid-cols-2
          "
        >
          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              border
              border-[var(--color-antique-gold)]/30
              bg-white
              px-4
              py-4
            "
          >
            <input
              {...register(
                "attendance",
              )}
              type="radio"
              value="attending"
            />

            <span>
              Joyfully accepts
            </span>
          </label>

          <label
            className="
              flex
              cursor-pointer
              items-center
              gap-3
              border
              border-[var(--color-antique-gold)]/30
              bg-white
              px-4
              py-4
            "
          >
            <input
              {...register(
                "attendance",
              )}
              type="radio"
              value="declined"
            />

            <span>
              Regretfully declines
            </span>
          </label>
        </div>

        <FieldError
          message={
            errors.attendance?.message
          }
        />
      </fieldset>

      {/* Only show these fields if attending */}
      {attendance ===
        "attending" && (
        <div
          className="
            mt-8
            space-y-6
          "
        >
          <FormField
            label="Number of Attending Guests"
            error={
              errors.guestCount
                ?.message
            }
          >
            <select
              {...register(
                "guestCount",
                {
                  valueAsNumber: true,
                },
              )}
              className={
                inputClassName
              }
            >
              {[
                1, 2, 3, 4, 5,
                6, 7, 8, 9, 10,
              ].map(
                (count) => (
                  <option
                    key={count}
                    value={count}
                  >
                    {count}
                  </option>
                ),
              )}
            </select>
          </FormField>

          <FormField
            label="Names of Additional Guests"
            error={
              errors.guestNames
                ?.message
            }
            helperText="Enter one name per line."
          >
            <textarea
              {...register(
                "guestNames",
              )}
              rows={4}
              placeholder={`Maria Dela Cruz\nPedro Dela Cruz`}
              className={
                inputClassName
              }
            />
          </FormField>
        </div>
      )}

      {/* Message */}
      <div className="mt-8">
        <FormField
          label="Message for the Couple"
          error={
            errors.message?.message
          }
        >
          <textarea
            {...register("message")}
            rows={4}
            placeholder="Leave a message for Renz and Jen"
            className={
              inputClassName
            }
          />
        </FormField>
      </div>

      {/* Confirmation */}
      <label
        className="
          mt-8
          flex
          items-start
          gap-3
          text-sm
          leading-6
          text-[var(--color-charcoal)]/75
        "
      >
        <input
          {...register(
            "agreementAccepted",
          )}
          type="checkbox"
          className="mt-1"
        />

        <span>
          I confirm that the
          information provided above is
          correct.
        </span>
      </label>

      <FieldError
        message={
          errors
            .agreementAccepted
            ?.message
        }
      />

      {/* Submission error */}
      {submissionError && (
        <p
          role="alert"
          className="
            mt-6
            border-l-2
            border-red-700
            bg-red-50
            px-4
            py-3
            text-sm
            text-red-800
          "
        >
          {submissionError}
        </p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          mt-8
          flex
          w-full
          items-center
          justify-center
          gap-2
          bg-[var(--color-dark-olive)]
          px-6
          py-4
          text-sm
          font-medium
          uppercase
          tracking-[0.18em]
          text-white
          transition
          hover:opacity-90
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {isSubmitting && (
          <LoaderCircle
            aria-hidden="true"
            className="animate-spin"
            size={18}
          />
        )}

        {isSubmitting
          ? "Submitting..."
          : "Submit RSVP"}
      </button>
    </form>
  );
}

interface FormFieldProps {
  label: string;
  error?: string;
  helperText?: string;
  children: React.ReactNode;
}

function FormField({
  label,
  error,
  helperText,
  children,
}: FormFieldProps) {
  return (
    <label
      className={
        labelClassName
      }
    >
      {label}

      {children}

      {helperText &&
        !error && (
          <span
            className="
              mt-2
              block
              text-xs
              font-normal
              text-[var(--color-charcoal)]/55
            "
          >
            {helperText}
          </span>
        )}

      <FieldError
        message={error}
      />
    </label>
  );
}

function FieldError({
  message,
}: {
  message?: string;
}) {
  if (!message) {
    return null;
  }

  return (
    <span
      role="alert"
      className="
        mt-2
        block
        text-sm
        font-normal
        text-red-700
      "
    >
      {message}
    </span>
  );
}