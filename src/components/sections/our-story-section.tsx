import { CoupleMonogram } from "@/components/shared/couple-monogram";
import { DecorativeDivider } from "@/components/shared/decorative-divider";
import { SectionContainer } from "@/components/shared/section-container";
import { StoryMilestone } from "@/components/shared/story-milestone";
import { weddingConfig } from "@/config/wedding.config";

export function OurStorySection() {
  return (
    <section
      id="story"
      className="
        relative
        scroll-mt-16
        overflow-hidden
        bg-[var(--color-warm-white)]
        py-24
        sm:py-32
      "
    >
      {/* Decorative background shapes. */}
      <div
        aria-hidden="true"
        className="
          absolute
          -left-24
          top-20
          h-72
          w-72
          rounded-full
          border
          border-[var(--color-antique-gold)]/15
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          -right-24
          bottom-20
          h-80
          w-80
          rounded-full
          border
          border-[var(--color-dark-olive)]/10
        "
      />

      <SectionContainer className="relative z-10">
        <div
          className="
            grid
            items-start
            gap-14
            lg:grid-cols-[0.9fr_1.1fr]
            lg:gap-20
          "
        >
          {/* Decorative editorial panel. */}
          <div
            className="
              flex
              min-h-[520px]
              flex-col
              items-center
              justify-center
              border
              border-[var(--color-antique-gold)]/35
              bg-[var(--color-deep-green)]
              px-8
              py-14
              text-center
              text-white
              shadow-[0_24px_70px_rgba(99,107,47,0.14)]
            "
          >
            <CoupleMonogram />

            <p
              className="
                mt-10
                text-xs
                uppercase
                tracking-[0.35em]
                text-[var(--color-soft-gold)]
              "
            >
              {weddingConfig.story.subtitle}
            </p>

            <h2
              className="
                mt-5
                font-[family-name:var(--font-serif)]
                text-5xl
                font-medium
                sm:text-6xl
              "
            >
              {weddingConfig.story.title}
            </h2>

            <div className="my-8 w-full">
              <DecorativeDivider />
            </div>

            <div
              className="
                space-y-5
                leading-8
                text-white/75
              "
            >
              {weddingConfig.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <p
              className="
                mt-10
                font-[family-name:var(--font-script)]
                text-5xl
                text-[var(--color-soft-gold)]
              "
            >
              Renz & Jen
            </p>

            <p
              className="
                mt-3
                text-xs
                uppercase
                tracking-[0.3em]
                text-white/55
              "
            >
              December 10, 2026
            </p>
          </div>

          {/* Text-based story timeline. */}
          <div className="pt-2">
            <p
              className="
                text-xs
                uppercase
                tracking-[0.35em]
                text-[var(--color-antique-gold)]
              "
            >
              Our Journey
            </p>

            <h2
              className="
                mt-4
                font-[family-name:var(--font-serif)]
                text-5xl
                font-medium
                text-[var(--color-dark-olive)]
                sm:text-6xl
              "
            >
              From the Beginning to Forever
            </h2>

            <div className="my-8 max-w-xs">
              <DecorativeDivider />
            </div>

            <div className="mt-10">
              {weddingConfig.story.milestones.map((milestone, index) => (
                <StoryMilestone
                  key={milestone.title}
                  year={milestone.year}
                  title={milestone.title}
                  description={milestone.description}
                  isLast={
                    index === weddingConfig.story.milestones.length - 1
                  }
                />
              ))}
            </div>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}