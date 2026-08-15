import { DesktopNavigation } from "@/components/layout/desktop-navigation";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { weddingConfig } from "@/config/wedding.config";

export function SiteHeader() {
  return (
    <header
      className="
        fixed
        left-0
        right-0
        top-0
        z-50
        border-b
        border-white/10
        bg-[var(--color-deep-green)]/90
        backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto
          flex
          h-16
          w-full
          max-w-7xl
          items-center
          justify-between
          px-4
          sm:px-6
          lg:px-8
        "
      >
        <a
          href="#home"
          aria-label="Return to the top of the wedding website"
          className="
            font-[family-name:var(--font-serif)]
            text-xl
            font-semibold
            tracking-[0.12em]
            text-[var(--color-soft-gold)]
          "
        >
          {weddingConfig.couple.compactInitials}
        </a>

        <DesktopNavigation />
        <MobileNavigation />
      </div>
    </header>
  );
}