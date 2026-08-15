interface CountdownUnitProps {
  value: string;
  label: string;
}

export function CountdownUnit({
  value,
  label,
}: CountdownUnitProps) {
  return (
    <div
      className="
        flex
        min-h-36
        flex-col
        items-center
        justify-center
        border
        border-[var(--color-antique-gold)]/35
        px-3
        py-6
        text-center
        sm:min-h-40
        sm:px-5
      "
    >
      <span
        aria-hidden="true"
        className="
          font-[family-name:var(--font-serif)]
          text-[clamp(3rem,10vw,5.5rem)]
          font-medium
          leading-none
          text-[var(--color-warm-white)]
        "
      >
        {value}
      </span>

      <span className="sr-only">
        {value} {label}
      </span>

      <span
        className="
          mt-4
          text-[0.65rem]
          uppercase
          tracking-[0.28em]
          text-[var(--color-soft-gold)]
          sm:text-xs
        "
      >
        {label}
      </span>
    </div>
  );
}