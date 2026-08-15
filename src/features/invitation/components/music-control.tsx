import { Music, VolumeX } from "lucide-react";

interface MusicControlProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export function MusicControl({
  isPlaying,
  onToggle,
}: MusicControlProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isPlaying ? "Pause background music" : "Play background music"}
      className="
        fixed
        bottom-5
        right-5
        z-50
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        border
        border-[var(--color-antique-gold)]
        bg-[var(--color-deep-green)]
        text-[var(--color-soft-gold)]
        shadow-xl
        transition
        hover:scale-105
      "
    >
      {isPlaying ? <Music size={20} /> : <VolumeX size={20} />}
    </button>
  );
}