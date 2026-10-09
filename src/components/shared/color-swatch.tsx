interface ColorSwatchProps {
  name: string;
  value: string;
}

export function ColorSwatch({
  name,
  value,
}: ColorSwatchProps) {
  return (
    <li className="text-center">
      <span
        aria-hidden="true"
        className="
          mx-auto
          block
          h-10
          w-10
          rounded-full
          border
          border-black/10
          shadow-sm
          sm:h-16
          sm:w-16
        "
        style={{ backgroundColor: value }}
      />

      <span
        className="
          mt-3
          block
          text-[9px]
          uppercase
          tracking-[0.08em]
          sm:text-xs
          sm:tracking-[0.16em]
          text-[var(--color-charcoal)]/65
        "
      >
        {name}
      </span>
    </li>
  );
}
