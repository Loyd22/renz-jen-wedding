import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: SectionHeadingProps) {
  const titleColor = light
    ? "text-[var(--color-warm-white)]"
    : "text-[var(--color-dark-olive)]";

  const descriptionColor = light
    ? "text-white/75"
    : "text-[var(--color-charcoal)]/75";

  return (
    <header className="mx-auto max-w-2xl text-center">
      {eyebrow ? (
        <p
          className="
            mb-3
            text-sm
            uppercase
            tracking-[0.3em]
            text-[var(--color-antique-gold)]
          "
        >
          {eyebrow}
        </p>
      ) : null}

      <h2
        className={`
          font-[family-name:var(--font-serif)]
          text-4xl
          font-medium
          sm:text-5xl
          ${titleColor}
        `}
      >
        {title}
      </h2>

      {description ? (
        <p className={`mt-4 leading-7 ${descriptionColor}`}>
          {description}
        </p>
      ) : null}
    </header>
  );
}
