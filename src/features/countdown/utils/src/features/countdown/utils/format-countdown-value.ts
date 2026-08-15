/**
 * Formats countdown values with leading zeros.
 *
 * Examples:
 * 4 becomes "04"
 * 12 remains "12"
 */
export function formatCountdownValue(value: number): string {
  return String(value).padStart(2, "0");
}