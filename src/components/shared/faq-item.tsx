"use client";

import { ChevronDown } from "lucide-react";
import { useId, useState } from "react";

interface FaqItemProps {
  question: string;
  answer: string;
}

export function FaqItem({
  question,
  answer,
}: FaqItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const contentId = useId();

  return (
    <article
      className="
        border-b
        border-[var(--color-antique-gold)]/30
      "
    >
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="
          flex
          w-full
          items-center
          justify-between
          gap-6
          py-6
          text-left
        "
      >
        <span
          className="
            font-[family-name:var(--font-serif)]
            text-xl
            text-[var(--color-dark-olive)]
            sm:text-2xl
          "
        >
          {question}
        </span>

        <ChevronDown
          aria-hidden="true"
          className={`
            shrink-0
            text-[var(--color-antique-gold)]
            transition-transform
            duration-300
            ${isOpen ? "rotate-180" : "rotate-0"}
          `}
          size={22}
        />
      </button>

      <div
        id={contentId}
        hidden={!isOpen}
        className="pb-6"
      >
        <p
          className="
            max-w-3xl
            leading-7
            text-[var(--color-charcoal)]/70
          "
        >
          {answer}
        </p>
      </div>
    </article>
  );
}