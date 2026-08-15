// This type describes the calculated countdown values.
export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMilliseconds: number;
  hasStarted: boolean;
}