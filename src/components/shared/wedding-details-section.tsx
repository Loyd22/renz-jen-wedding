import { Building2, Church } from "lucide-react";

import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { WeddingDetailCard } from "@/components/shared/wedding-detail-card";
import { weddingConfig } from "@/config/wedding.config";

export function WeddingDetailsSection() {
  return (
    <section
      id="details"
      className="
        scroll-mt-16
        bg-[#F4F0E7]
        py-24
        sm:py-32
      "
    >
      <SectionContainer>
        <SectionHeading
          eyebrow="Wedding Details"
          title="The Celebration"
          description={`Join us on ${weddingConfig.event.dateLabel} as we celebrate this special day together.`}
        />

        <div
          className="
            mt-14
            grid
            gap-7
            lg:grid-cols-2
          "
        >
          <WeddingDetailCard
            icon={<Church size={25} aria-hidden="true" />}
            eyebrow="Ceremony"
            title={weddingConfig.ceremony.venue}
            time={weddingConfig.ceremony.timeLabel}
            address={weddingConfig.ceremony.address}
            mapUrl={weddingConfig.ceremony.mapUrl}
          />

          <WeddingDetailCard
            icon={<Building2 size={25} aria-hidden="true" />}
            eyebrow="Reception"
            title={weddingConfig.reception.venue}
            time={weddingConfig.reception.timeLabel}
            address={weddingConfig.reception.address}
            mapUrl={weddingConfig.reception.mapUrl}
          />
        </div>
      </SectionContainer>
    </section>
  );
}