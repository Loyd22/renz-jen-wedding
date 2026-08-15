"use client";

import { CountdownUnit } from "@/features/countdown/components/countdown-unit";
import { useCountdown } from "@/features/countdown/hooks/use-countdown";
import { formatCountdownValue } from "@/features/countdown/utils/format-countdown-value";

interface WeddingCountdownProps {
  targetDate: string;
}

export function WeddingCountdown({
  targetDate,
}: WeddingCountdownProps) {
  const { timeRemaining } = useCountdown(targetDate);

if (!timeRemaining) {
    return (
      <div
        aria-label="Loading wedding countdown"
        className="
          grid
          grid-cols-2
          gap-3
          md:grid-cols-4
        "
      >
        {["Days", "Hours", "Minutes", "Seconds"].map((label) => (
          <div
            key={label}
            className="
              flex
              min-h-36
              animate-pulse
              flex-col
              items-center
              justify-center
              border
              border-[var(--color-antique-gold)]/20
              bg-white/5
            "
          >
            <div className="h-14 w-20 bg-white/10" />
            <div className="mt-4 h-3 w-16 bg-white/10" />
          </div>
        ))}
      </div>
    );
  }

  if (timeRemaining.hasStarted) {
    return (
      <div className="py-10 text-center">
        <p
          aria-live="polite"
          className="
            font-[family-name:var(--font-script)]
            text-5xl
            text-[var(--color-soft-gold)]
            sm:text-6xl
          "
        >
          Today is the day!
        </p>

        <p className="mt-4 text-sm uppercase tracking-[0.25em] text-white/70">
          Our celebration has begun
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="
          grid
          grid-cols-2
          gap-3
          md:grid-cols-4
        "
      >
        <CountdownUnit
          value={String(timeRemaining.days)}
          label="Days"
        />

        <CountdownUnit
          value={formatCountdownValue(timeRemaining.hours)}
          label="Hours"
        />

        <CountdownUnit
          value={formatCountdownValue(timeRemaining.minutes)}
          label="Minutes"
        />

        <CountdownUnit
          value={formatCountdownValue(timeRemaining.seconds)}
          label="Seconds"
        />
      </div>

      <p
        aria-live="polite"
        className="sr-only"
      >
        {timeRemaining.days} days remaining until the wedding.
      </p>
    </>
  );
}