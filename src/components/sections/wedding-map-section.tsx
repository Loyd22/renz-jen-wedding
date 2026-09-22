import Image from "next/image";
import weddingMap from "../../../public/images/map/wedding-map.png";

import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";

export function WeddingMapSection() {
  return (
    <section
      id="wedding-map"
      className="
        bg-[var(--color-warm-white)]
        py-24
        sm:py-32
      "
    >
      <SectionContainer>
        <SectionHeading
          eyebrow="Getting There"
          title="Wedding Map"
          description="A simple guide to help you find your way to our ceremony and reception venue."
        />

        <div
          className="
            mx-auto
            mt-12
            max-w-4xl
          "
        >
          <Image
            src={weddingMap}
            alt="Wedding map to El Roi Events Place and Resort at Casa Concepcion in Silang, Cavite"
            className="
              h-auto
              w-full
              object-contain
            "
            priority={false}
          />
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://www.google.com/maps/place/El+Roi+Events+Place+and+Resort+at+Casa+Concepcion/@14.1801138,121.0027868,19.5z/data=!4m6!3m5!1s0x33bd7b058a8430af:0x9e082390eee9817f!8m2!3d14.1802569!4d121.0031072!16s%2Fg%2F11vf0j9qj1?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center justify-center border border-[var(--color-dark-olive)] px-6 py-3 text-sm font-medium text-[var(--color-dark-olive)] transition-colors hover:bg-[var(--color-dark-olive)] hover:text-white"
          >
            Open in Google Maps
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </SectionContainer>
    </section>
  );
}
