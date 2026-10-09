import Image from "next/image";

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
          title={weddingConfig.dressCode.title}
          description={
            <>
              {weddingConfig.dressCode.description}
              <br />
              <span className="font-[family-name:var(--font-serif)] text-xl font-normal">
                {weddingConfig.dressCode.attire}
              </span>
            </>
          }
        />

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
              grid-cols-5
              gap-x-2
              sm:gap-x-4
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
