import type { ReactNode } from "react";

interface WeddingDetailCardProps {
  icon: ReactNode;
  eyebrow: string;
  title: string;
  time: string;
  address: string;
  mapUrl?: string;
}

export function WeddingDetailCard({
  icon,
  eyebrow,
  title,
  time,
  address,
  mapUrl,
}: WeddingDetailCardProps) {
  return (
    <article
      className="
        border
        border-[var(--color-antique-gold)]/35
        bg-white
        p-8
        text-center
        shadow-[0_20px_50px_rgba(24,60,43,0.06)]
        sm:p-10
      "
    >
      <div
        className="
          mx-auto
          flex
          h-14
          w-14
          items-center
          justify-center
          rounded-full
          border
          border-[var(--color-antique-gold)]
          text-[var(--color-antique-gold)]
        "
      >
        {icon}
      </div>

      <p
        className="
          mt-6
          text-xs
          uppercase
          tracking-[0.3em]
          text-[var(--color-antique-gold)]
        "
      >
        {eyebrow}
      </p>

      <h3
        className="
          mt-3
          font-[family-name:var(--font-serif)]
          text-3xl
          font-medium
          text-[var(--color-dark-olive)]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-4
          text-sm
          font-semibold
          uppercase
          tracking-[0.2em]
          text-[var(--color-charcoal)]/70
        "
      >
        {time}
      </p>

      <p
        className="
          mx-auto
          mt-4
          max-w-sm
          leading-7
          text-[var(--color-charcoal)]/65
        "
      >
        {address}
      </p>

      {mapUrl ? (
        <a
          href={mapUrl}
          target="_blank"
          rel="noreferrer"
          className="
            mt-7
            inline-flex
            min-h-11
            items-center
            justify-center
            border
            border-[var(--color-dark-olive)]
            px-6
            text-xs
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[var(--color-dark-olive)]
            transition-colors
            hover:bg-[var(--color-dark-olive)]
            hover:text-white
          "
        >
          Open in Google Maps
        </a>
      ) : (
        <p
          className="
            mt-7
            text-xs
            uppercase
            tracking-[0.18em]
            text-[var(--color-charcoal)]/45
          "
        >
          Map location will be added soon
        </p>
      )}
    </article>
  );
}