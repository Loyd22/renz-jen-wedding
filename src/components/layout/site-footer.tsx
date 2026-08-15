import { weddingConfig } from "@/config/wedding.config";

export function SiteFooter() {
  return (
    <footer
      className="
        bg-[var(--color-deep-green)]
        px-4
        py-7
        text-center
        text-white/55
      "
    >
      <p className="text-xs uppercase tracking-[0.2em]">
        {weddingConfig.couple.groomFirstName} &{" "}
        {weddingConfig.couple.brideFirstName}
        <span className="mx-2">•</span>
        {weddingConfig.event.dateLabel}
      </p>
    </footer>
  );
}