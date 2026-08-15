import { ScheduleItem } from "@/components/shared/schedule-item";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { weddingConfig } from "@/config/wedding.config";

export function WeddingScheduleSection() {
  return (
    <section
      id="schedule"
      className="
        scroll-mt-16
        bg-[var(--color-deep-green)]
        py-24
        sm:py-32
      "
    >
      <SectionContainer>
        <SectionHeading
          eyebrow="Order of Events"
          title="Wedding Schedule"
          description="A guide to the celebrations planned for our wedding day."
          light
        />

        <ol
          className="
            mx-auto
            mt-16
            max-w-2xl
            md:grid
            md:max-w-none
            md:grid-cols-3
            md:gap-y-14
            lg:grid-cols-6
          "
        >
          {weddingConfig.schedule.map((item, index) => (
            <ScheduleItem
              key={`${item.time}-${item.title}`}
              time={item.time}
              title={item.title}
              description={item.description}
              isLast={index === weddingConfig.schedule.length - 1}
            />
          ))}
        </ol>
      </SectionContainer>
    </section>
  );
}