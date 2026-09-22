import { Gift } from "lucide-react";

import { CoupleMonogram } from "@/components/shared/couple-monogram";
import { DecorativeDivider } from "@/components/shared/decorative-divider";
import { SectionContainer } from "@/components/shared/section-container";
import { weddingConfig } from "@/config/wedding.config";

export function GiftsSection() {
  const hasBankDetails =
    weddingConfig.gifts.bankName &&
    weddingConfig.gifts.accountName &&
    weddingConfig.gifts.accountNumber;

  return (
    <section
      id="gifts"
      className="
        scroll-mt-16
        bg-[var(--color-deep-green)]
        py-24
        text-white
        sm:py-32
      "
    >
      <SectionContainer>
        <div
          className="
            mx-auto
            max-w-3xl
            border
            border-[var(--color-antique-gold)]/35
            px-6
            py-14
            text-center
            sm:px-12
            sm:py-20
          "
        >
          <CoupleMonogram />

          <Gift
            aria-hidden="true"
            className="
              mx-auto
              mt-9
              text-[var(--color-soft-gold)]
            "
            size={30}
          />

          <p
            className="
              mt-5
              text-xs
              uppercase
              tracking-[0.35em]
              text-[var(--color-soft-gold)]
            "
          >
            Gifts
          </p>

          <h2
            className="
              mt-4
              font-[family-name:var(--font-serif)]
              text-4xl
              font-medium
              sm:text-5xl
            "
          >
            {weddingConfig.gifts.title}
          </h2>

          <div className="my-8">
            <DecorativeDivider />
          </div>

          <p
            className="
              mx-auto
              max-w-2xl
              leading-8
              text-white/75
            "
          >
            {weddingConfig.gifts.message}
          </p>

          <p
            className="
              mx-auto
              mt-5
              max-w-xl
              text-sm
              leading-7
              text-white/55
            "
          >
            {weddingConfig.gifts.secondaryMessage}
          </p>

          {weddingConfig.gifts.registryUrl ? (
            <a
              href={weddingConfig.gifts.registryUrl}
              target="_blank"
              rel="noreferrer"
              className="
                mt-9
                inline-flex
                min-h-12
                items-center
                justify-center
                border
                border-[var(--color-soft-gold)]
                px-7
                text-xs
                font-semibold
                uppercase
                tracking-[0.22em]
                text-[var(--color-soft-gold)]
                transition-colors
                hover:bg-[var(--color-soft-gold)]
                hover:text-[var(--color-deep-green)]
              "
            >
              View Gift Registry
            </a>
          ) : null}

          {hasBankDetails ? (
            <div
              className="
                mx-auto
                mt-10
                max-w-md
                border-t
                border-white/15
                pt-8
              "
            >
              <p
                className="
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  text-[var(--color-soft-gold)]
                "
              >
                Gift Details
              </p>

              <dl className="mt-5 space-y-3 text-sm text-white/70">
                <div>
                  <dt className="sr-only">Bank</dt>
                  <dd>{weddingConfig.gifts.bankName}</dd>
                </div>

                <div>
                  <dt className="sr-only">Account name</dt>
                  <dd>{weddingConfig.gifts.accountName}</dd>
                </div>

                <div>
                  <dt className="sr-only">Account number</dt>
                  <dd>{weddingConfig.gifts.accountNumber}</dd>
                </div>
              </dl>
            </div>
          ) : null}
        </div>
      </SectionContainer>
    </section>
  );
}
