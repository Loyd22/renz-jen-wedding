interface ScheduleItemProps {
  time: string;
  title: string;
  description: string;
  isLast: boolean;
}

export function ScheduleItem({
  time,
  title,
  description,
  isLast,
}: ScheduleItemProps) {
  return (
    <li
      className="
        relative
        grid
        grid-cols-[2.25rem_1fr]
        gap-5
        pb-10
        last:pb-0
        md:block
        md:pb-0
        md:text-center
      "
    >
      {!isLast ? (
        <>
          <span
            aria-hidden="true"
            className="
              absolute
              bottom-0
              left-[1.05rem]
              top-9
              w-px
              bg-[var(--color-antique-gold)]/45
              md:hidden
            "
          />

          <span
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-[1.05rem]
              hidden
              h-px
              w-full
              bg-[var(--color-antique-gold)]/40
              md:block
            "
          />
        </>
      ) : null}

      <span
        aria-hidden="true"
        className="
          relative
          z-10
          mt-1
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          border
          border-[var(--color-antique-gold)]
          bg-[var(--color-deep-green)]
          md:mx-auto
        "
      >
        <span
          className="
            h-2
            w-2
            rounded-full
            bg-[var(--color-soft-gold)]
          "
        />
      </span>

      <div className="md:mt-7">
        <p
          className="
            text-xs
            font-semibold
            uppercase
            tracking-[0.25em]
            text-[var(--color-soft-gold)]
          "
        >
          {time}
        </p>

        <h3
          className="
            mt-2
            font-[family-name:var(--font-serif)]
            text-2xl
            text-white
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-3
            max-w-xs
            leading-7
            text-white/65
            md:mx-auto
          "
        >
          {description}
        </p>
      </div>
    </li>
  );
}