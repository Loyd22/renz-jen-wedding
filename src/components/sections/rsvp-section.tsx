import { RsvpForm } from "@/features/rsvp/components/rsvp-form";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";

export function RsvpSection() {
  return (
    <section
      id="rsvp"
      className="
        scroll-mt-16
        bg-[var(--color-warm-white)]
        py-24
        sm:py-32
      "
    >
      <SectionContainer>
        <SectionHeading
          eyebrow="Kindly Respond"
          title="RSVP"
          description="Please confirm your attendance on or before the RSVP deadline."
        />

        <div className="mx-auto mt-14 max-w-3xl">
          <RsvpForm />
        </div>
      </SectionContainer>
    </section>
  );
}