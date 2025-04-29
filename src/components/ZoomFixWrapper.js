"use client";
import { useEffect } from "react";

export default function ZoomFixWrapper({ children }) {
  useEffect(() => {
    const ratio = window.devicePixelRatio;
    const screenWidth = window.innerWidth;

    // ✅ Only apply zoom fix on large screens + high DPI (like Windows laptops)
    if (ratio >= 1.5 && screenWidth > 1024) {
      document.documentElement.style.zoom = "0.85";
    } else {
      document.documentElement.style.zoom = "1";
    }
  }, []);

  return <>{children}</>;
}
