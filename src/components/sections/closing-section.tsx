import { Heart } from "lucide-react";

import { CoupleMonogram } from "@/components/shared/couple-monogram";
import { SectionContainer } from "@/components/shared/section-container";

export function ClosingSection() {
  return (
    <section
      id="closing"
      className="bg-[var(--color-warm-white)] py-24 text-center sm:py-32"
    >
      <SectionContainer>
        <CoupleMonogram />

        <p className="mt-9 font-[family-name:var(--font-serif)] text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-antique-gold)]">
          With Grateful Hearts
        </p>
        <div
          aria-hidden="true"
          className="mx-auto mt-6 h-px w-10 bg-[var(--color-antique-gold)]/40"
        />

        <p className="mx-auto mt-7 max-w-xl leading-8 text-[var(--color-charcoal)]/70">
          We invite you to join us as we receive the blessing of God on our
          marriage and share the joy of this beautiful beginning of our life
          together.
        </p>

        <Heart
          aria-hidden="true"
          size={24}
          className="mx-auto my-14 fill-current text-[var(--color-soft-gold)] sm:my-20"
        />

        <div>
          <p className="font-[family-name:var(--font-script)] text-xl text-[var(--color-dark-olive)] sm:text-2xl">
            And the two shall become one
          </p>
          <p className="mt-3 text-sm text-[var(--color-antique-gold)]">
            Ephesians 5:31
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}
