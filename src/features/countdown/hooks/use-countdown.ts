"use client";

import { useEffect, useState } from "react";

import type { TimeRemaining } from "@/features/countdown/types/countdown.types";
import { calculateTimeRemaining } from "@/features/countdown/utils/calculate-time-remaining";

interface UseCountdownResult {
  timeRemaining: TimeRemaining | null;
}

export function useCountdown(targetDate: string): UseCountdownResult {
  const [timeRemaining, setTimeRemaining] =
    useState<TimeRemaining | null>(null);

  useEffect(() => {
    // Browser timers return numeric IDs.
    let intervalId: number | null = null;

    function updateCountdown(): void {
      const updatedTime = calculateTimeRemaining(targetDate);

      setTimeRemaining(updatedTime);

      // Stop the timer when the wedding date has arrived.
      if (updatedTime.hasStarted && intervalId !== null) {
        window.clearInterval(intervalId);
        intervalId = null;
      }
    }

    // Schedule the first update asynchronously to satisfy ESLint.
    const initialTimeoutId = window.setTimeout(() => {
      const initialTime = calculateTimeRemaining(targetDate);

      setTimeRemaining(initialTime);

      // Start the interval only when the wedding is still upcoming.
      if (!initialTime.hasStarted) {
        intervalId = window.setInterval(updateCountdown, 1000);
      }
    }, 0);

    // Clean up both timers when the component unmounts.
    return () => {
      window.clearTimeout(initialTimeoutId);

      if (intervalId !== null) {
        window.clearInterval(intervalId);
      }
    };
  }, [targetDate]);

  return {
    timeRemaining,
  };
}