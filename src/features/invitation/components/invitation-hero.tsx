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
