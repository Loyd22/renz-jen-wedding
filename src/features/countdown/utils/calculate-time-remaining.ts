import type { TimeRemaining } from "@/features/countdown/types/countdown.types";

/**
 * Calculates the remaining time between the current date
 * and the wedding date.
 *
 * This is a pure utility function:
 * - It does not use React.
 * - It does not create intervals.
 * - It can be tested independently.
 */
export function calculateTimeRemaining(
  targetDate: string | Date,
  currentDate: Date = new Date(),
): TimeRemaining {
  const targetTime =
    targetDate instanceof Date
      ? targetDate.getTime()
      : new Date(targetDate).getTime();

  const currentTime = currentDate.getTime();

  // Protect the application from an invalid wedding date.
  if (Number.isNaN(targetTime)) {
    throw new Error("The configured wedding date is invalid.");
  }

  const difference = targetTime - currentTime;

  // When the target date has arrived or passed,
  // return zero instead of negative values.
  if (difference <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      totalMilliseconds: 0,
      hasStarted: true,
    };
  }

  const millisecondsPerSecond = 1000;
  const millisecondsPerMinute = millisecondsPerSecond * 60;
  const millisecondsPerHour = millisecondsPerMinute * 60;
  const millisecondsPerDay = millisecondsPerHour * 24;

  const days = Math.floor(difference / millisecondsPerDay);

  const hours = Math.floor(
    (difference % millisecondsPerDay) / millisecondsPerHour,
  );

  const minutes = Math.floor(
    (difference % millisecondsPerHour) / millisecondsPerMinute,
  );

  const seconds = Math.floor(
    (difference % millisecondsPerMinute) / millisecondsPerSecond,
  );

  return {
    days,
    hours,
    minutes,
    seconds,
    totalMilliseconds: difference,
    hasStarted: false,
  };
}