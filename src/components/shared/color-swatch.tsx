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
          h-14
          w-14
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
          text-xs
          uppercase
          tracking-[0.16em]
          text-[var(--color-charcoal)]/65
        "
      >
        {name}
      </span>
    </li>
  );
}