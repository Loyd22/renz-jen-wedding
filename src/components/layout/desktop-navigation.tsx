import { navigationItems } from "@/config/navigation.config";

export function DesktopNavigation() {
  return (
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-6 lg:flex xl:gap-8"
    >
      {navigationItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="
            text-sm
            font-medium
            uppercase
            tracking-[0.18em]
            text-white/85
            transition-colors
            hover:text-[var(--color-soft-gold)]
          "
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
