import { ArrowUp } from "lucide-react";

import { CoupleMonogram } from "@/components/shared/couple-monogram";
import { SectionContainer } from "@/components/shared/section-container";
import { weddingConfig } from "@/config/wedding.config";

export function ClosingSection() {
  return (
    <section
      id="closing"
      className="
        bg-[var(--color-warm-white)]
        py-24
        text-center
        sm:py-32
      "
    >
      <SectionContainer>
        <CoupleMonogram />

        <p
          className="
            mt-9
            font-[family-name:var(--font-script)]
            text-5xl
            text-[var(--color-antique-gold)]
            sm:text-6xl
          "
        >
          Thank you
        </p>

        <h2
          className="
            mt-4
            font-[family-name:var(--font-serif)]
            text-5xl
            font-medium
            text-[var(--color-dark-olive)]
            sm:text-7xl
          "
        >
          {weddingConfig.couple.groomFirstName}
          <span className="mx-3 text-[var(--color-antique-gold)]">
            &
          </span>
          {weddingConfig.couple.brideFirstName}
        </h2>

        <p
          className="
            mt-6
            text-sm
            uppercase
            tracking-[0.3em]
            text-[var(--color-charcoal)]/60
          "
        >
          {weddingConfig.event.dateLabel}
        </p>

        <p
          className="
            mx-auto
            mt-8
            max-w-xl
            leading-8
            text-[var(--color-charcoal)]/70
          "
        >
          We are grateful to celebrate this special day with the people
          who have supported and loved us throughout our journey.
        </p>

        <p
          className="
            mt-7
            text-sm
            font-semibold
            tracking-[0.18em]
            text-[var(--color-antique-gold)]
          "
        >
          {weddingConfig.couple.hashtag}
        </p>

        <a
          href="#home"
          aria-label="Return to the top of the page"
          className="
            mx-auto
            mt-12
            inline-flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-[var(--color-dark-olive)]
            text-[var(--color-dark-olive)]
            transition-colors
            hover:bg-[var(--color-dark-olive)]
            hover:text-white
          "
        >
          <ArrowUp aria-hidden="true" size={20} />
        </a>
      </SectionContainer>
    </section>
  );
}