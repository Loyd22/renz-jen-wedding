import Image from "next/image";
import { Shirt, Sparkles } from "lucide-react";

import { ColorSwatch } from "@/components/shared/color-swatch";
import { DecorativeDivider } from "@/components/shared/decorative-divider";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { weddingConfig } from "@/config/wedding.config";

export function DressCodeSection() {
  return (
    <section
      id="dress-code"
      className="
        scroll-mt-16
        bg-[var(--color-warm-white)]
        py-24
        sm:py-32
      "
    >
      <SectionContainer>
        <SectionHeading
          eyebrow="What to Wear"
          title={weddingConfig.dressCode.title}
          description={
            <>
              {weddingConfig.dressCode.description}
              <br />
              <strong>{weddingConfig.dressCode.attire}</strong>
            </>
          }
        />

        {/* Attire instructions for gentlemen and ladies */}
        <div
          className="
            mt-14
            grid
            gap-6
            lg:grid-cols-2
          "
        >
          <article
            className="
              border
              border-[var(--color-antique-gold)]/30
              bg-white
              p-8
              text-center
              sm:p-10
            "
          >
            <Shirt
              aria-hidden="true"
              className="mx-auto text-[var(--color-antique-gold)]"
              size={30}
            />

            <h3
              className="
                mt-5
                font-[family-name:var(--font-serif)]
                text-3xl
                text-[var(--color-dark-olive)]
              "
            >
              Gentlemen
            </h3>

            <p
              className="
                mt-4
                leading-7
                text-[var(--color-charcoal)]/70
              "
            >
              {weddingConfig.dressCode.men}
            </p>
          </article>

          <article
            className="
              border
              border-[var(--color-antique-gold)]/30
              bg-white
              p-8
              text-center
              sm:p-10
            "
          >
            <Sparkles
              aria-hidden="true"
              className="mx-auto text-[var(--color-antique-gold)]"
              size={30}
            />

            <h3
              className="
                mt-5
                font-[family-name:var(--font-serif)]
                text-3xl
                text-[var(--color-dark-olive)]
              "
            >
              Ladies
            </h3>

            <p
              className="
                mt-4
                leading-7
                text-[var(--color-charcoal)]/70
              "
            >
              {weddingConfig.dressCode.women}
            </p>
          </article>
        </div>

        {/* Responsive illustration showing suggested guest attire */}
            <div
            className="
                mx-auto
                mt-12
                max-w-4xl
                overflow-hidden
                bg-transparent
                px-2
                py-4
                sm:px-6
                sm:py-8
            "
            >
            <Image
                src={weddingConfig.dressCode.image}
                alt="Formal wedding guest attire examples in olive green, beige, champagne, cream, and black"
                width={1800}
                height={980}
                sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 90vw,
                1200px
                "
                unoptimized
                className="
                h-auto
                w-full
                object-contain
                mix-blend-multiply
        "
    />
    </div>

        <div className="my-14">
          <DecorativeDivider />
        </div>

        {/* Suggested wedding color palette */}
        <div className="text-center">
          <h3
            className="
              font-[family-name:var(--font-serif)]
              text-3xl
              text-[var(--color-dark-olive)]
            "
          >
            Suggested Palette
          </h3>

          <ul
            className="
              mx-auto
              mt-9
              grid
              max-w-3xl
              grid-cols-3
              gap-x-4
              gap-y-8
              sm:grid-cols-5
            "
          >
            {weddingConfig.dressCode.colors.map((color) => (
              <ColorSwatch
                key={color.name}
                name={color.name}
                value={color.value}
              />
            ))}
          </ul>

          <p
            className="
              mx-auto
              mt-12
              max-w-2xl
              border-l-2
              border-[var(--color-antique-gold)]
              bg-[#F4F0E7]
              px-6
              py-5
              text-left
              leading-7
              text-[var(--color-charcoal)]/75
            "
          >
            {weddingConfig.dressCode.reminder}
          </p>
        </div>
      </SectionContainer>
    </section>
  );
}
