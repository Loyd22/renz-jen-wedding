import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { weddingConfig } from "@/config/wedding.config";
import { WeddingCountdown } from "@/features/countdown/components/wedding-countdown";

export function CountdownSection() {
  return (
    <section
      id="countdown"
      className="
        bg-[var(--color-deep-green)]
        py-24
        text-[var(--color-warm-white)]
        sm:py-32
      "
    >
      <SectionContainer>
        <SectionHeading
          eyebrow="Counting down"
          title="Until We Say I Do"
          description={`${weddingConfig.event.dateLabel} at ${weddingConfig.event.timeLabel}`}
          light
        />

        <div className="mt-14">
          <WeddingCountdown
            targetDate={weddingConfig.event.dateTime}
          />
        </div>

        <p
          className="
            mt-8
            text-center
            text-xs
            uppercase
            tracking-[0.25em]
            text-white/55
          "
        >
          {weddingConfig.event.timezoneLabel}
        </p>
      </SectionContainer>
    </section>
  );
}