import { weddingConfig } from "@/config/wedding.config";

export function SaveTheDateSection() {
  return (
    <section
      id="save-the-date"
      className="
        relative
        flex
        min-h-screen
        items-center
        overflow-hidden
        bg-[var(--color-dark-olive)]
        py-20
        text-[var(--color-warm-white)]
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-6xl
          px-4
          text-center
          sm:px-6
          lg:px-8
        "
      >
        <p
          className="
            mb-8
            text-sm
            uppercase
            tracking-[0.35em]
            text-[var(--color-soft-gold)]
          "
        >
          {weddingConfig.couple.groomFirstName} +{" "}
          {weddingConfig.couple.brideFirstName}
        </p>

        <div
          aria-label="December 10, 2026"
          className="
            font-[family-name:var(--font-serif)]
            font-medium
            leading-[0.72]
            tracking-[-0.08em]
          "
        >
          <div className="text-[clamp(7rem,35vw,25rem)]">
            12
          </div>

          <div
            className="
              text-[clamp(7rem,35vw,25rem)]
              text-[var(--color-antique-gold)]
            "
          >
            10
          </div>

          <div className="text-[clamp(7rem,35vw,25rem)]">
            26
          </div>
        </div>

        <p
          className="
            mt-10
            text-sm
            uppercase
            tracking-[0.45em]
          "
        >
          Save the Date
        </p>
      </div>
    </section>
  );
}