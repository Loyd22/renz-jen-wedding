"use client";

import { useState } from "react";

interface UseInvitationOpeningReturn {
  isOpened: boolean;
  openInvitation: () => void;
}

// This hook owns the invitation opening state.
// The visual components only receive the result.
export function useInvitationOpening(): UseInvitationOpeningReturn {
  const [isOpened, setIsOpened] = useState(false);

  function openInvitation() {
    setIsOpened(true);
  }

  return {
    isOpened,
    openInvitation,
  };
}