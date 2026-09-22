interface EntourageGroupProps {
  category: string;
  members: readonly string[];
}

export function EntourageGroup({ category, members }: EntourageGroupProps) {
  const isSponsors = category === "Principal Sponsors";

  return (
    <article className="text-center">
      <h3
        className={
          isSponsors
            ? "mb-4 font-[family-name:var(--font-serif)] text-3xl font-medium text-[var(--color-dark-olive)]"
            : "mb-2 font-[family-name:var(--font-serif)] text-xl font-medium leading-tight text-[var(--color-dark-olive)] sm:text-2xl"
        }
      >
        {category}
      </h3>

      <ul
        className={
          isSponsors
            ? "mx-auto grid max-w-lg grid-cols-2 gap-x-4 font-[family-name:var(--font-sans)] text-sm leading-7 text-[var(--color-charcoal)]/70 sm:gap-x-10 sm:text-base"
            : "font-[family-name:var(--font-sans)] text-sm leading-7 text-[var(--color-charcoal)]/70 sm:text-base"
        }
      >
        {members.map((member) => (
          <li key={member}>{member}</li>
        ))}
      </ul>
    </article>
  );
}
