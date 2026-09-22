# Envelope animation upgrade

The envelope uses shaded olive paper layers, a recessed lining, two flap faces on a top-edge hinge, and an ivory invitation card. The gold seal presses and lifts before fading. The card rises behind the front folds and stays partially inside the pocket. The original gold logo and wedding fonts are preserved.

Click the envelope or use the Tap to open button. Keyboard activation works too. Opening completes before Explore invitation becomes available; the composition remains visible until the visitor chooses to continue. Reduced-motion visitors see the open state immediately. Music starts from the user gesture and does not delay the animation.

## Adjusting the motion

Edit `src/features/invitation/config/envelope-motion.ts`:

| Value | Default | Effect |
| --- | --- | --- |
| perspective | 1200px | Smaller values exaggerate depth. |
| sealDuration | 0.38s | Length of the seal press, lift, and fade. |
| flapDelay / flapDuration | 0.22s / 1s | When the hinge begins and how slowly it opens. |
| flapAngle | -174 degrees | Nearly flat open, retaining a slight paper angle. |
| flapLayerDelay | 0.56s | Moves the flap behind the card after it passes upright. |
| cardDelay / cardDuration | 0.9s / 1.2s | Delayed, gentle card rise. |
| cardTravel | -52% | Travel relative to card height. More negative exposes more card. |
| ease | [0.22, 1, 0.36, 1] | Smooth deceleration without bounce. |

Keep the card delay after the flap has cleared its path. If changing the flap easing or duration, revisit the layer delay. Card height, pocket folds, and clipping are in the CSS module; keep the bottom of the opened card behind the pocket. Normal opening takes about 2.1 seconds.

## Exact updated code

The following is a snapshot of the implementation delivered with this upgrade. The source files are authoritative for future edits. Existing shared logo, music hook, wedding configuration, and global theme styles are reused.

### src/features/invitation/config/envelope-motion.ts

```ts
// Durations and delays are in seconds. Card travel is relative to its own height.
export const envelopeMotion = {
  ease: [0.22, 1, 0.36, 1] as const,
  perspective: 1200,
  sealDuration: 0.38,
  flapDelay: 0.22,
  flapDuration: 1,
  flapLayerDelay: 0.56,
  flapAngle: -174,
  cardDelay: 0.9,
  cardDuration: 1.2,
  cardTravel: "-52%",
};
```

### src/features/invitation/components/invitation-envelope.tsx

```tsx
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
```

### src/features/invitation/components/invitation-envelope.module.css

```css
/* Paper geometry lives here; choreography lives in envelope-motion.ts. */
.stage {
  position: absolute;
  inset: 40% 0 4%;
}

.envelope {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  border-radius: 4px;
  background: transparent;
  -webkit-tap-highlight-color: transparent;
}

.envelope[aria-disabled="true"] { cursor: default; }
.envelope:focus-visible { outline-offset: 10px; }

.groundShadow {
  position: absolute;
  inset: auto 9% 0;
  height: 8%;
  border-radius: 50%;
  background: #252914;
  filter: blur(12px);
  pointer-events: none;
}

.backPanel,
.lining,
.pocket {
  position: absolute;
  inset: 0;
  border-radius: 4px;
  pointer-events: none;
}

.backPanel {
  z-index: 0;
  background: linear-gradient(155deg, rgb(255 255 255 / 0.08), rgb(0 0 0 / 0.22)), var(--color-dark-olive);
  box-shadow: 0 18px 35px rgb(0 0 0 / 0.16), 0 2px 3px rgb(0 0 0 / 0.16), inset 0 1px rgb(255 255 255 / 0.23);
}

.lining {
  z-index: 1;
  inset: 2px 2px 0;
  background: linear-gradient(180deg, rgb(0 0 0 / 0.3), transparent 65%), var(--color-dark-olive);
}

.cardSlot {
  position: absolute;
  inset: 0;
  z-index: 10;
  /* Keep the tall card inside the bottom seam, while allowing it to rise. */
  clip-path: inset(-100% -50% 0);
  pointer-events: none;
}

.card {
  position: absolute;
  top: 5%;
  left: 8%;
  z-index: 10;
  width: 84%;
  height: 120%;
  border: 1px solid var(--color-soft-gold);
  border-radius: 3px;
  background: linear-gradient(120deg, #fff, var(--color-warm-white) 65%, #f1ecdf);
  pointer-events: none;
}

.card::after {
  content: "";
  position: absolute;
  inset: 7px;
  border: 1px solid rgb(184 154 87 / 0.28);
  pointer-events: none;
}

.cardContent {
  position: absolute;
  inset: 7% 5% auto;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.pocket {
  z-index: 20;
  overflow: hidden;
  filter: drop-shadow(0 -1px 1px rgb(0 0 0 / 0.16));
}

.leftFold,
.rightFold,
.bottomFold {
  position: absolute;
  inset: 0;
  background-color: var(--color-dark-olive);
}

.leftFold {
  clip-path: polygon(0 0, 54% 55%, 0 100%);
  background-image: linear-gradient(125deg, rgb(255 255 255 / 0.12), transparent 50%, rgb(0 0 0 / 0.16));
}

.rightFold {
  clip-path: polygon(100% 0, 46% 55%, 100% 100%);
  background-image: linear-gradient(235deg, rgb(255 255 255 / 0.07), transparent 45%, rgb(0 0 0 / 0.2));
}

.bottomFold {
  clip-path: polygon(0 100%, 0 98%, 50% 43%, 100% 98%, 100% 100%);
  background-image: linear-gradient(180deg, rgb(255 255 255 / 0.17), transparent 65%, rgb(0 0 0 / 0.12));
  box-shadow: inset 0 -2px 2px rgb(0 0 0 / 0.12);
}

.flap {
  position: absolute;
  inset: 0 0 auto;
  height: 64%;
  transform-origin: 50% 0%;
  transform-style: preserve-3d;
  pointer-events: none;
}

.flapFront,
.flapBack {
  position: absolute;
  inset: 0;
  clip-path: polygon(0 0, 100% 0, 51% 99%, 50% 100%, 49% 99%);
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  background-color: var(--color-dark-olive);
}

.flapFront {
  background-image: linear-gradient(160deg, rgb(255 255 255 / 0.18), transparent 50%, rgb(0 0 0 / 0.18));
  box-shadow: inset 0 1px rgb(255 255 255 / 0.3);
}

.flapBack {
  transform: rotateY(180deg);
  background-image: linear-gradient(180deg, rgb(0 0 0 / 0.14), rgb(255 255 255 / 0.08));
  box-shadow: inset 0 2px 3px rgb(0 0 0 / 0.16);
}
```

### src/features/invitation/components/wax-seal.tsx

```tsx
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
```

### src/features/invitation/hooks/use-invitation-opening.ts

```ts
"use client";

import { useCallback, useState } from "react";

interface UseInvitationOpeningReturn {
  isOpened: boolean;
  isOpening: boolean;
  isComplete: boolean;
  openInvitation: () => void;
  completeOpening: () => void;
}

// This hook owns the invitation opening state.
// The visual components only receive the result.
export function useInvitationOpening(): UseInvitationOpeningReturn {
  const [status, setStatus] = useState<"closed" | "opening" | "open">("closed");

  const openInvitation = useCallback(() => {
    setStatus((current) => current === "closed" ? "opening" : current);
  }, []);

  const completeOpening = useCallback(() => {
    setStatus((current) => current === "opening" ? "open" : current);
  }, []);

  return {
    isOpened: status !== "closed",
    isOpening: status === "opening",
    isComplete: status === "open",
    openInvitation,
    completeOpening,
  };
}
```

### src/features/invitation/components/invitation-hero.tsx

```tsx
"use client";

import { useReducedMotion } from "framer-motion";
import { InvitationEnvelope } from "@/features/invitation/components/invitation-envelope";
import { MusicControl } from "@/features/invitation/components/music-control";
import { useBackgroundMusic } from "@/features/invitation/hooks/use-background-music";
import { useInvitationOpening } from "@/features/invitation/hooks/use-invitation-opening";
import { weddingConfig } from "@/config/wedding.config";

export function InvitationHero() {
  const { isOpened, isOpening, isComplete, openInvitation, completeOpening } = useInvitationOpening();
  const reduceMotion = useReducedMotion();

  const {
    isPlaying,
    startMusic,
    toggleMusic,
  } = useBackgroundMusic({
    source: weddingConfig.music.source,
  });

  function handleOpenInvitation() {
    if (isOpened) return;
    openInvitation();
    if (weddingConfig.music.enabled) void startMusic();
  }

  function exploreInvitation() {
    document
      .querySelector("#save-the-date")
      ?.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth" });
  }

  return (
    <>
      <section
        id="home"
        className="
          relative
          flex
          min-h-screen
          items-center
          overflow-hidden
          bg-[var(--color-warm-white)]
          px-4
          pb-16
          pt-28
        "
      >
        {/* Decorative soft light shapes. */}
        <div
          aria-hidden="true"
          className="
            absolute
            -left-20
            top-28
            h-72
            w-72
            rounded-full
            bg-[var(--color-soft-gold)]/10
            blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute
            -right-20
            bottom-10
            h-80
            w-80
            rounded-full
            bg-[var(--color-dark-olive)]/10
            blur-3xl
          "
        />

        <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
          

          <p
            className="
              mt-3
              text-xs
              uppercase
              tracking-[0.4em]
              text-[var(--color-antique-gold)]
              sm:text-sm
            "
          >
           
          </p>

          <div className="mt-4">
            <InvitationEnvelope
              isOpened={isOpened}
              onOpen={handleOpenInvitation}
              onOpenComplete={completeOpening}
            />
          </div>

          <button
            type="button"
            onClick={isComplete ? exploreInvitation : handleOpenInvitation}
            disabled={isOpening}
            className="
              mt-10
              min-h-12
              border-b
              border-[var(--color-antique-gold)]
              px-4
              py-3
              text-xs
              font-semibold
              uppercase
              tracking-[0.35em]
              text-[var(--color-dark-olive)]
              transition
              hover:text-[var(--color-antique-gold)]
              disabled:cursor-default
              disabled:opacity-50
            "
          >
            {isComplete ? "Explore invitation" : isOpening ? "Opening your invitation…" : "Tap to open"}
          </button>
          <p className="sr-only" role="status">
            {isComplete ? `You are invited to ${weddingConfig.couple.groomFirstName} and ${weddingConfig.couple.brideFirstName}’s wedding on ${weddingConfig.event.dateLabel}.` : ""}
          </p>
        </div>
      </section>

      <MusicControl
        isPlaying={isPlaying}
        onToggle={toggleMusic}
      />
    </>
  );
}
```
