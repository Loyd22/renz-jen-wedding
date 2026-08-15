import { weddingConfig } from "@/config/wedding.config";

interface CoupleMonogramProps {
  light?: boolean;
}

export function CoupleMonogram({
  light = false,
}: CoupleMonogramProps) {
  return (
    <div
      className={`
        mx-auto
        flex
        h-24
        w-24
        items-center
        justify-center
        rounded-full
        border
        ${
          light
            ? "border-[var(--color-soft-gold)] text-[var(--color-soft-gold)]"
            : "border-[var(--color-antique-gold)] text-[var(--color-dark-olive)]"
        }
      `}
    >
      <span
        className="
          font-[family-name:var(--font-serif)]
          text-2xl
          italic
        "
      >
        {weddingConfig.couple.initials}
      </span>
    </div>
  );
}