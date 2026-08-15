import { weddingConfig } from "@/config/wedding.config";

interface WaxSealProps {
  isOpened: boolean;
}

export function WaxSeal({ isOpened }: WaxSealProps) {
  return (
    <div
      className={`
        absolute
        left-1/2
        top-[48%]
        z-30
        flex
        h-16
        w-16
        -translate-x-1/2
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        border-4
        border-[#a8894f]
        bg-[var(--color-antique-gold)]
        shadow-xl
        transition-all
        duration-700
        ${isOpened ? "scale-75 opacity-0" : "scale-100 opacity-100"}
      `}
    >
      <span
        className="
          font-[family-name:var(--font-serif)]
          text-lg
          font-semibold
          text-[var(--color-deep-green)]
        "
      >
        {weddingConfig.couple.compactInitials}
      </span>
    </div>
  );
}