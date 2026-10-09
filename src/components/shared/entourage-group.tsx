interface EntourageGroupProps {
  category: string;
  members: readonly string[];
  nameAlignment?: "left" | "center" | "right";
}

export function EntourageGroup({ category, members, nameAlignment = "center" }: EntourageGroupProps) {
  const isSponsors = category === "Principal Sponsors";
  const isParents = category === "Parents of the Groom" || category === "Parents of the Bride";
  const headingSizeClass = isSponsors ? "text-lg sm:text-xl" : "text-base sm:text-lg";
  const nameAlignmentClass = { left: "text-left", center: "text-center", right: "text-right" }[nameAlignment];

  return (
    <article className={nameAlignmentClass}>
      <h3
        className={`mb-2 font-[family-name:var(--font-serif)] font-medium ${headingSizeClass} uppercase leading-tight text-[var(--color-dark-olive)]`}
      >
        {isParents ? (
          <span className="block text-center">
            Parents of the
            <br />
            {category === "Parents of the Groom" ? "Groom" : "Bride"}
          </span>
        ) : category}
      </h3>

      <ul
        className={
          isSponsors
            ? "mx-auto grid max-w-lg grid-cols-2 gap-x-2 font-[family-name:var(--font-sans)] text-sm leading-7 text-[var(--color-charcoal)]/70 sm:gap-x-4 sm:text-base"
            : "font-[family-name:var(--font-sans)] text-sm leading-7 text-[var(--color-charcoal)]/70 sm:text-base"
        }
      >
        {members.map((member) => (
          <li
            key={member}
            className={nameAlignmentClass}
          >
            {member}
          </li>
        ))}
      </ul>
    </article>
  );
}
