"use client";

import { motion, useReducedMotion } from "framer-motion";

import { WeddingLogo } from "@/components/shared/wedding-logo";
import { weddingConfig } from "@/config/wedding.config";
import { WaxSeal } from "@/features/invitation/components/wax-seal";
import { envelopeMotion } from "@/features/invitation/config/envelope-motion";
import styles from "./invitation-envelope.module.css";

interface InvitationEnvelopeProps {
  isOpened: boolean;
  onOpen: () => void;
  onOpenComplete: () => void;
}

export function InvitationEnvelope({
  isOpened,
  onOpen,
  onOpenComplete,
}: InvitationEnvelopeProps) {
  const reduceMotion = useReducedMotion();
  const duration = (seconds: number) => reduceMotion ? 0 : seconds;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <motion.div
        aria-hidden="true"
        className={styles.groundShadow}
        initial={false}
        animate={{ scaleX: isOpened ? 1.04 : 0.94, opacity: isOpened ? 0.22 : 0.3 }}
        transition={{ duration: duration(1.2), ease: envelopeMotion.ease }}
      />

      <div className={styles.stage} style={{ perspective: envelopeMotion.perspective }}>
        <motion.button
          type="button"
          aria-label={isOpened ? "Wedding invitation opened" : "Open our wedding invitation"}
          aria-expanded={isOpened}
          aria-disabled={isOpened}
          onClick={() => { if (!isOpened) onOpen(); }}
          className={styles.envelope}
          style={{ perspective: envelopeMotion.perspective }}
          initial={false}
          animate={{ rotateX: isOpened || reduceMotion ? 0 : 6 }}
          whileHover={!isOpened && !reduceMotion ? { y: -3 } : undefined}
          whileTap={!isOpened && !reduceMotion ? { scale: 0.995 } : undefined}
          transition={{ duration: duration(0.65), ease: envelopeMotion.ease }}
        >
          {/* These visual layers share one accessible button label. */}
          <span aria-hidden="true" className={styles.backPanel} />
          <span aria-hidden="true" className={styles.lining} />

          {/* The pocket physically masks this card until it rises. */}
          <span className={styles.cardSlot}>
            <motion.span
              aria-hidden="true"
              className={styles.card}
              initial={false}
              animate={{
                y: isOpened ? envelopeMotion.cardTravel : "0%",
                boxShadow: isOpened
                  ? "0 16px 32px rgb(0 0 0 / 0.17), 0 2px 5px rgb(0 0 0 / 0.08)"
                  : "0 2px 4px rgb(0 0 0 / 0.06)",
              }}
              transition={{
                duration: duration(envelopeMotion.cardDuration),
                delay: duration(isOpened ? envelopeMotion.cardDelay : 0),
                ease: envelopeMotion.ease,
              }}
              onAnimationComplete={() => { if (isOpened) onOpenComplete(); }}
            >
              <span className={styles.cardContent}>
                <WeddingLogo className="h-9 w-11 sm:h-12 sm:w-14" sizes="56px" />
                <span className="mt-1 font-[family-name:var(--font-script)] text-3xl leading-none text-[var(--color-dark-olive)] sm:text-4xl">
                  You are invited
                </span>
                <span className="mt-2 font-[family-name:var(--font-serif)] text-base leading-tight text-[var(--color-dark-olive)] sm:text-xl">
                  {weddingConfig.couple.groomFirstName} &amp; {weddingConfig.couple.brideFirstName}
                </span>
                <span className="mt-2 text-[9px] uppercase tracking-[0.16em] text-[var(--color-antique-gold)] sm:text-[11px]">
                  {weddingConfig.event.dateLabel}
                </span>
              </span>
            </motion.span>
          </span>

          <span aria-hidden="true" className={styles.pocket}>
            <span className={styles.leftFold} />
            <span className={styles.rightFold} />
            <span className={styles.bottomFold} />
          </span>

          {/* Rotate both paper faces around the same top edge. Switch stacking
              only after the flap passes upright, before the card starts rising. */}
          <motion.span
            aria-hidden="true"
            className={styles.flap}
            initial={false}
            animate={{ rotateX: isOpened ? envelopeMotion.flapAngle : 0, zIndex: isOpened ? 5 : 30 }}
            transition={{
              rotateX: {
                duration: duration(envelopeMotion.flapDuration),
                delay: duration(isOpened ? envelopeMotion.flapDelay : 0),
                ease: envelopeMotion.ease,
              },
              zIndex: { duration: 0, delay: duration(isOpened ? envelopeMotion.flapLayerDelay : 0) },
            }}
          >
            <span className={styles.flapFront} />
            <span className={styles.flapBack} />
          </motion.span>

          <WaxSeal isOpened={isOpened} />
        </motion.button>
      </div>
    </div>
  );
}
