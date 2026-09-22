"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WeddingLogo } from "@/components/shared/wedding-logo";
import { envelopeMotion } from "@/features/invitation/config/envelope-motion";

interface WaxSealProps {
  isOpened: boolean;
}

export function WaxSeal({ isOpened }: WaxSealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[61%] z-40 -translate-x-1/2 -translate-y-1/2">
      <motion.span
        className="flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-soft-gold)]/70 bg-[var(--color-antique-gold)] sm:h-16 sm:w-16"
        style={{
          backgroundImage: "linear-gradient(135deg, rgb(255 255 255 / 0.28), transparent 45%, rgb(0 0 0 / 0.2))",
          boxShadow: "0 5px 9px rgb(0 0 0 / 0.26), inset 0 0 0 3px rgb(184 154 87 / 0.8), inset 0 0 0 4px rgb(255 255 255 / 0.24)",
        }}
        initial={false}
        animate={
          reduceMotion
            ? { opacity: isOpened ? 0 : 1 }
            : {
                scale: isOpened ? [1, 0.94, 1.07, 0.98] : 1,
                y: isOpened ? [0, 1, -8, -12] : 0,
                opacity: isOpened ? [1, 1, 0.8, 0] : 1,
                rotate: isOpened ? [0, -2, -5, -7] : 0,
              }
        }
        transition={{ duration: reduceMotion ? 0 : envelopeMotion.sealDuration, times: [0, 0.22, 0.6, 1], ease: envelopeMotion.ease }}
      >
        <WeddingLogo className="h-10 w-10 sm:h-12 sm:w-12" sizes="48px" />
      </motion.span>
    </span>
  );
}
