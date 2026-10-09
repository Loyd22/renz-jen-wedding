import { CoupleMonogram } from "@/components/shared/couple-monogram";
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
            shadow-[0_20px_70px_rgba(82,82,0,0.08)]
            sm:px-12
            sm:py-20
          "
        >
          <CoupleMonogram />

          <p
            className="
              mt-10
              mx-auto
              max-w-md
              font-[family-name:var(--font-serif)]
              text-lg
              leading-6
              text-[var(--color-charcoal)]/65
            "
          >
            By the Grace of God, and with the love and blessing of our parents
          </p>

          <p
            className="
              mx-auto
              mt-8
              max-w-md
              font-[family-name:var(--font-serif)]
              text-lg
              leading-7
              text-[var(--color-charcoal)]/75
            "
          >
            We,
          </p>

          <h2
            className="
              mt-6
              font-[family-name:var(--font-serif)]
              text-4xl
              font-medium
              uppercase
              leading-tight
              text-[var(--color-dark-olive)]
              sm:text-5xl
            "
          >
            {weddingConfig.couple.groomFullName}
          </h2>

          <p
            className="
              my-4
              font-[family-name:var(--font-script)]
              text-5xl
              text-[var(--color-dark-olive)]
            "
          >
            &amp;
          </p>

          <h2
            className="
              font-[family-name:var(--font-serif)]
              text-4xl
              font-medium
              uppercase
              leading-tight
              text-[var(--color-dark-olive)]
              sm:text-5xl
            "
          >
            {weddingConfig.couple.brideFullName}
          </h2>

          <p className="mx-auto mt-12 max-w-md font-[family-name:var(--font-serif)] text-lg leading-6 text-[var(--color-charcoal)]/75">
            Invite you to celebrate a love that has grown through time and chosen forever.
          </p>

          <p
            className="
              mt-12
              font-[family-name:var(--font-serif)]
              text-base
              text-[var(--color-dark-olive)]
            "
          >
            <span className="uppercase">{weddingConfig.event.dateLabel}</span>
            {" | "}
            {weddingConfig.ceremony.timeLabel}
          </p>

          <div
            className="
              mt-12
              mx-auto
              max-w-xl
            "
          >
            <div>
              <p
                className="
                  font-[family-name:var(--font-serif)]
                  text-base
                  uppercase
                  text-[var(--color-antique-gold)]
                "
              >
                Ceremony & Reception
              </p>

              <p
                className="
                  font-[family-name:var(--font-serif)]
                  text-base
                  uppercase
                  text-[var(--color-dark-olive)]
                "
              >
                {weddingConfig.ceremony.venue}
              </p>
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
