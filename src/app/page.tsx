import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ClosingSection } from "@/components/sections/closing-section";
import { CountdownSection } from "@/components/sections/countdown-section";
import { DressCodeSection } from "@/components/sections/dress-code-section";
import { EntourageSection } from "@/components/sections/entourage-section";
import { FaqSection } from "@/components/sections/faq-section";
import { FormalInvitationSection } from "@/components/sections/formal-invitation-section";
import { GiftsSection } from "@/components/sections/gifts-section";
import { SaveTheDateSection } from "@/components/sections/save-the-date-section";
import { WeddingDetailsSection } from "@/components/sections/wedding-details-section";
import { WeddingScheduleSection } from "@/components/sections/wedding-schedule-section";
import { InvitationHero } from "@/features/invitation/components/invitation-hero";
import { RsvpSection } from "@/components/sections/rsvp-section";
import { WeddingMapSection } from "@/components/sections/wedding-map-section";

export default function HomePage() {
  return (
    <>
      <SiteHeader />

      <main>
        <InvitationHero />
        <SaveTheDateSection />
        <FormalInvitationSection />
        <CountdownSection />
        <WeddingMapSection />
        <WeddingScheduleSection />
        <DressCodeSection />
        <EntourageSection />
        <FaqSection />
        <GiftsSection />
        <ClosingSection />
        <RsvpSection />
      </main>

      <SiteFooter />
    </>
  );
}
