import { FaqItem } from "@/components/shared/faq-item";
import { SectionContainer } from "@/components/shared/section-container";
import { SectionHeading } from "@/components/shared/section-heading";
import { faqConfig } from "@/config/faq.config";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="
        scroll-mt-16
        bg-[var(--color-warm-white)]
        py-24
        sm:py-32
      "
    >
      <SectionContainer>
        <SectionHeading
          eyebrow="Helpful Information"
          title="Frequently Asked Questions"
          description="Here are a few helpful details before the celebration."
        />

        <div
          className="
            mx-auto
            mt-14
            max-w-4xl
            border-t
            border-[var(--color-antique-gold)]/30
          "
        >
          {faqConfig.map((item) => (
            <FaqItem
              key={item.question}
              question={item.question}
              answer={item.answer}
            />
          ))}
        </div>
      </SectionContainer>
    </section>
  );
}