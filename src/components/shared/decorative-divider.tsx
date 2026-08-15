export function DecorativeDivider() {
  return (
    <div
      aria-hidden="true"
      className="mx-auto flex w-full max-w-xs items-center gap-4"
    >
      <span className="h-px flex-1 bg-[var(--color-antique-gold)]/50" />

      <span
        className="
          h-2
          w-2
          rotate-45
          border
          border-[var(--color-antique-gold)]
        "
      />

      <span className="h-px flex-1 bg-[var(--color-antique-gold)]/50" />
    </div>
  );
}