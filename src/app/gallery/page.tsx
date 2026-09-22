"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import InfiniteGallery from "@/features/gallery/components/infinite-gallery";

const weddingGalleryImages = [
  {
    src: "/images/gallery/photo-1.jpg",
    alt: "Renz and Jen wedding gallery photo 1",
  },
  {
    src: "/images/gallery/photo-2.jpg",
    alt: "Renz and Jen wedding gallery photo 2",
  },
  {
    src: "/images/gallery/photo-3.jpg",
    alt: "Renz and Jen wedding gallery photo 3",
  },
  {
    src: "/images/gallery/photo-4.jpg",
    alt: "Renz and Jen wedding gallery photo 4",
  },
  {
    src: "/images/gallery/photo-5.jpg",
    alt: "Renz and Jen wedding gallery photo 5",
  },
  {
    src: "/images/gallery/photo-6.jpg",
    alt: "Renz and Jen wedding gallery photo 6",
  },
];

export default function GalleryPage() {
  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[var(--color-warm-white)]
      "
    >
      {/* Back button */}
      <div
        className="
          absolute
          left-4
          top-4
          z-50
          sm:left-8
          sm:top-8
        "
      >
        <Link
          href="/"
          className="
            flex
            items-center
            gap-2
            border
            border-[var(--color-antique-gold)]/40
            bg-[var(--color-warm-white)]/90
            px-4
            py-3
            text-sm
            text-[var(--color-dark-olive)]
            backdrop-blur
            transition
            hover:bg-[var(--color-dark-olive)]
            hover:text-white
          "
        >
          <ArrowLeft size={16} />

          Back to Wedding
        </Link>
      </div>

      {/* Gallery title */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-8
          z-40
          -translate-x-1/2
          text-center
        "
      >
        <p
          className="
            text-xs
            uppercase
            tracking-[0.25em]
            text-[var(--color-antique-gold)]
          "
        >
          Renz & Jen
        </p>

        <h1
          className="
            mt-2
            font-[family-name:var(--font-serif)]
            text-3xl
            text-[var(--color-dark-olive)]
            sm:text-4xl
          "
        >
          Gallery
        </h1>
      </div>

      {/* Infinite canvas */}
      <div className="h-screen w-full">
        <InfiniteGallery
          images={weddingGalleryImages}
          density={5}
          imageWidth={220}
          imageHeight={280}
          rounded={2}
          dragSpeed={20}
          driftAmount={12}
          friction={10}
          backgroundColor="#F8F5EE"
        />
      </div>

      {/* Instructions */}
      <div
        className="
          pointer-events-none
          absolute
          bottom-6
          left-1/2
          z-40
          -translate-x-1/2
          whitespace-nowrap
          bg-[var(--color-warm-white)]/80
          px-4
          py-2
          text-xs
          tracking-wide
          text-[var(--color-charcoal)]/60
          backdrop-blur
        "
      >
        Drag to explore · Scroll to zoom
      </div>
    </main>
  );
}