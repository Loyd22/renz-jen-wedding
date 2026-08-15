"use client";

import { useEffect, useRef, useState } from "react";

interface UseBackgroundMusicOptions {
  source: string;
}

interface UseBackgroundMusicReturn {
  isPlaying: boolean;
  toggleMusic: () => Promise<void>;
  startMusic: () => Promise<void>;
}

// This hook contains all audio logic.
// The button component only renders the current state.
export function useBackgroundMusic({
  source,
}: UseBackgroundMusicOptions): UseBackgroundMusicReturn {
  const audioReference = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(source);

    audio.loop = true;
    audio.volume = 0.35;

    audioReference.current = audio;

    return () => {
      audio.pause();
      audioReference.current = null;
    };
  }, [source]);

  async function startMusic() {
    const audio = audioReference.current;

    if (!audio) {
      return;
    }

    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      // Browsers may block audio when the file is missing
      // or when playback is not triggered by user interaction.
      setIsPlaying(false);
    }
  }

  async function toggleMusic() {
    const audio = audioReference.current;

    if (!audio) {
      return;
    }

    if (audio.paused) {
      await startMusic();
      return;
    }

    audio.pause();
    setIsPlaying(false);
  }

  return {
    isPlaying,
    toggleMusic,
    startMusic,
  };
}