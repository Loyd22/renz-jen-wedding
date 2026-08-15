interface EntourageGroupProps {
  category: string;
  members: readonly string[];
}

export function EntourageGroup({
  category,
  members,
}: EntourageGroupProps) {
  return (
    <article
      className="
        border
        border-[var(--color-antique-gold)]/30
        bg-white
        px-6
        py-8
        text-center
        shadow-[0_14px_40px_rgba(24,60,43,0.05)]
      "
    >
      <h3
        className="
          font-[family-name:var(--font-serif)]
          text-2xl
          font-medium
          text-[var(--color-dark-olive)]
        "
      >
        {category}
      </h3>

      <div
        aria-hidden="true"
        className="
          mx-auto
          my-5
          h-px
          w-16
          bg-[var(--color-antique-gold)]
        "
      />

      <ul className="space-y-3">
        {members.map((member) => (
          <li
            key={member}
            className="
              leading-7
              text-[var(--color-charcoal)]/70
            "
          >
            {member}
          </li>
        ))}
      </ul>
    </article>
  );
}