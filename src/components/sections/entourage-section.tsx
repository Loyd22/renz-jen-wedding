import { EntourageGroup } from "@/components/shared/entourage-group";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { entourageConfig } from "@/config/entourage.config";

export function EntourageSection() {
  return (
    <section
      id="entourage"
      className="
        scroll-mt-16
        bg-[#F4F0E7]
        py-24
        sm:py-32
      "
    >
      <SectionContainer>
        <SectionHeading
          eyebrow="With Love and Gratitude"
          title="Wedding Entourage"
          description="The special people who will stand beside us as we begin this new chapter."
        />

        <div
          className="
            mt-14
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {entourageConfig.map((group) => (
            <EntourageGroup
              key={group.category}
              category={group.category}
              members={group.members}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}