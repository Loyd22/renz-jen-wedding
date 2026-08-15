interface StoryMilestoneProps {
  year: string;
  title: string;
  description: string;
  isLast: boolean;
}

export function StoryMilestone({
  year,
  title,
  description,
  isLast,
}: StoryMilestoneProps) {
  return (
    <article
      className="
        relative
        grid
        grid-cols-[2.5rem_1fr]
        gap-5
        pb-10
        last:pb-0
      "
    >
      {!isLast ? (
        <span
          aria-hidden="true"
          className="
            absolute
            bottom-0
            left-[1.2rem]
            top-10
            w-px
            bg-[var(--color-antique-gold)]/40
          "
        />
      ) : null}

      <span
        aria-hidden="true"
        className="
          relative
          z-10
          mt-1
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-[var(--color-antique-gold)]
          bg-[var(--color-warm-white)]
        "
      >
        <span
          className="
            h-2.5
            w-2.5
            rounded-full
            bg-[var(--color-dark-olive)]
          "
        />
      </span>

      <div>
        <p
          className="
            text-xs
            uppercase
            tracking-[0.28em]
            text-[var(--color-antique-gold)]
          "
        >
          {year}
        </p>

        <h3
          className="
            mt-2
            font-[family-name:var(--font-serif)]
            text-3xl
            text-[var(--color-dark-olive)]
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-3
            max-w-xl
            leading-7
            text-[var(--color-charcoal)]/70
          "
        >
          {description}
        </p>
      </div>
    </article>
  );
}