import { CoupleMonogram } from "@/components/shared/couple-monogram";
import { DecorativeDivider } from "@/components/shared/decorative-divider";
import { SectionContainer } from "@/components/shared/section-container";
import { weddingConfig } from "@/config/wedding.config";

export function FormalInvitationSection() {
  return (
    <section
      id="invitation"
      className="
        bg-[var(--color-warm-white)]
        py-24
        sm:py-32
      "
    >
      <SectionContainer>
        <div
          className="
            mx-auto
            max-w-3xl
            border
            border-[var(--color-antique-gold)]/40
            bg-white
            px-5
            py-14
            text-center
            shadow-[0_20px_70px_rgba(24,60,43,0.08)]
            sm:px-12
            sm:py-20
          "
        >
          <CoupleMonogram />

          <p
            className="
              mt-10
              text-xs
              uppercase
              tracking-[0.3em]
              text-[var(--color-charcoal)]/65
            "
          >
            Together with their families
          </p>

          <p
            className="
              mx-auto
              mt-6
              max-w-md
              leading-7
              text-[var(--color-charcoal)]/75
            "
          >
            We invite you to join us as we celebrate our marriage
            and begin the next chapter of our lives together.
          </p>

          <div className="my-10">
            <DecorativeDivider />
          </div>

          <h2
            className="
              font-[family-name:var(--font-serif)]
              text-5xl
              font-medium
              uppercase
              leading-tight
              text-[var(--color-dark-olive)]
              sm:text-7xl
            "
          >
            {weddingConfig.couple.groomFullName}
          </h2>

          <p
            className="
              my-4
              font-[family-name:var(--font-script)]
              text-4xl
              text-[var(--color-antique-gold)]
            "
          >
            and
          </p>

          <h2
            className="
              font-[family-name:var(--font-serif)]
              text-5xl
              font-medium
              uppercase
              leading-tight
              text-[var(--color-dark-olive)]
              sm:text-7xl
            "
          >
            {weddingConfig.couple.brideFullName}
          </h2>

          <div className="my-10">
            <DecorativeDivider />
          </div>

          <p
            className="
              font-[family-name:var(--font-serif)]
              text-2xl
              text-[var(--color-dark-olive)]
            "
          >
            {weddingConfig.event.dateLabel}
          </p>

          <p
            className="
              mt-2
              text-sm
              uppercase
              tracking-[0.25em]
              text-[var(--color-antique-gold)]
            "
          >
            {weddingConfig.event.timeLabel}
          </p>

          <div
            className="
              mt-10
              grid
              gap-8
              border-t
              border-[var(--color-antique-gold)]/30
              pt-10
              sm:grid-cols-2
            "
          >
            <div>
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-[var(--color-antique-gold)]
                "
              >
                Ceremony
              </p>

              <p
                className="
                  mt-3
                  font-[family-name:var(--font-serif)]
                  text-xl
                  text-[var(--color-dark-olive)]
                "
              >
                {weddingConfig.ceremony.venue}
              </p>

              <p className="mt-2 text-sm text-[var(--color-charcoal)]/65">
                {weddingConfig.ceremony.address}
              </p>
            </div>

            <div>
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-[var(--color-antique-gold)]
                "
              >
                Reception
              </p>

              <p
                className="
                  mt-3
                  font-[family-name:var(--font-serif)]
                  text-xl
                  text-[var(--color-dark-olive)]
                "
              >
                {weddingConfig.reception.venue}
              </p>

              <p className="mt-2 text-sm text-[var(--color-charcoal)]/65">
                {weddingConfig.reception.address}
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}