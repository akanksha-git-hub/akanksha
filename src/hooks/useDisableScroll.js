"use client";

import { useEffect } from "react";

export function useDisableScroll(isModalOpen) {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    if (isModalOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    return () => {
      if (typeof window === "undefined" || typeof document === "undefined") return;
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);
}
