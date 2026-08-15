import { WaxSeal } from "@/features/invitation/components/wax-seal";

interface InvitationEnvelopeProps {
  isOpened: boolean;
}

export function InvitationEnvelope({
  isOpened,
}: InvitationEnvelopeProps) {
  return (
    <div
      className="
        relative
        mx-auto
        h-64
        w-full
        max-w-sm
        [perspective:1000px]
        sm:h-72
        sm:max-w-md
      "
    >
      {/* Invitation card that rises from inside the envelope. */}
      <div
        className={`
          absolute
          bottom-6
          left-1/2
          z-20
          flex
          h-48
          w-[82%]
          -translate-x-1/2
          flex-col
          items-center
          justify-center
          border
          border-[var(--color-soft-gold)]
          bg-[var(--color-warm-white)]
          px-6
          text-center
          shadow-xl
          transition-all
          duration-1000
          ease-out
          ${
            isOpened
              ? "-translate-y-28 opacity-100"
              : "translate-y-4 opacity-0"
          }
        `}
      >
        <p
          className="
            font-[family-name:var(--font-script)]
            text-4xl
            text-[var(--color-dark-olive)]
          "
        >
          You are invited
        </p>

        <p
          className="
            mt-2
            text-xs
            uppercase
            tracking-[0.3em]
            text-[var(--color-antique-gold)]
          "
        >
          December 10, 2026
        </p>
      </div>

      {/* Back panel of the envelope. */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-10
          h-44
          bg-[var(--color-deep-green)]
          shadow-2xl
          sm:h-48
        "
      />

      {/* Envelope top flap. */}
      <div
        className={`
          absolute
          bottom-24
          left-0
          right-0
          z-30
          mx-auto
          h-36
          w-full
          origin-bottom
          bg-[var(--color-deep-green)]
          transition-transform
          duration-1000
          ease-in-out
          [backface-visibility:hidden]
          [clip-path:polygon(0_0,100%_0,50%_100%)]
          ${
            isOpened
              ? "[transform:rotateX(180deg)] z-0"
              : "[transform:rotateX(0deg)]"
          }
        `}
      />

      {/* Front envelope folds. */}
      <div
        className="
          absolute
          bottom-0
          left-0
          right-0
          z-40
          h-44
          overflow-hidden
          sm:h-48
        "
      >
        {/* Left fold */}
        <div
          className="
            absolute
            inset-y-0
            left-0
            w-1/2
            bg-[#123524]
            [clip-path:polygon(0_0,100%_50%,0_100%)]
          "
        />

        {/* Right fold */}
        <div
          className="
            absolute
            inset-y-0
            right-0
            w-1/2
            bg-[#143a28]
            [clip-path:polygon(100%_0,0_50%,100%_100%)]
          "
        />

        {/* Bottom fold */}
        <div
          className="
            absolute
            bottom-0
            left-0
            right-0
            h-full
            bg-[#1a4631]
            [clip-path:polygon(0_100%,50%_42%,100%_100%)]
          "
        />
      </div>

      <WaxSeal isOpened={isOpened} />
    </div>
  );
}