"use client";

import { useCallback, useState } from "react";

interface UseInvitationOpeningReturn {
  isOpened: boolean;
  isOpening: boolean;
  isComplete: boolean;
  openInvitation: () => void;
  completeOpening: () => void;
}

// This hook owns the invitation opening state.
// The visual components only receive the result.
export function useInvitationOpening(): UseInvitationOpeningReturn {
  const [status, setStatus] = useState<"closed" | "opening" | "open">("closed");

  const openInvitation = useCallback(() => {
    setStatus((current) => current === "closed" ? "opening" : current);
  }, []);

  const completeOpening = useCallback(() => {
    setStatus((current) => current === "opening" ? "open" : current);
  }, []);

  return {
    isOpened: status !== "closed",
    isOpening: status === "opening",
    isComplete: status === "open",
    openInvitation,
    completeOpening,
  };
}
