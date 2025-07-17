"use client";

import { useEffect, useState, createContext, useContext } from "react";
import Lenis from "lenis";

const SmoothScrollerContext = createContext();

export const useSmoothScroller = () => useContext(SmoothScrollerContext);

export default function LenisScrollContext({ children }) {
  const [lenisRef, setLenisRef] = useState(null);
  const [rafState, setRafState] = useState(null);
  const [storeTarget, setStoreTarget] = useState("recent");

  useEffect(() => {
    if (typeof window === "undefined") return;

    // ✅ THE ONLY FIX NEEDED: Use Lenis in "native" mode.
    // This uses the browser's real scroll, making `position: sticky` and
    // all your window scroll event listeners work perfectly without any other changes.
    const scroller = new Lenis({
      native: true, // <--- This is the key change
      syncTouch: true,
      direction: "vertical",
    });

    let rf;
    function raf(time) {
      scroller.raf(time);
      requestAnimationFrame(raf);
    }
    rf = requestAnimationFrame(raf);
    setRafState(rf);
    setLenisRef(scroller);

    return () => {
      if (scroller) {
        cancelAnimationFrame(rf);
        scroller.destroy();
      }
    };
  }, []);

  // --- All your original functions are restored and will work correctly ---
  const stopScroll = () => lenisRef?.stop?.();
  const startScroll = () => lenisRef?.start?.();

  const scrollToOptions = { offset: -50, duration: 1.86 };

  const lenisScrollTo = (id) => {
    setStoreTarget(() => id);
    if (typeof window !== "undefined") {
      setTimeout(() => {
        lenisRef?.scrollTo(`#${id}`, scrollToOptions);
      }, 200);
    }
  };

  const viewAllScroll = () => {
    if (typeof window !== "undefined") {
      const elem = document.querySelector(`#${storeTarget}`);
      if (elem) {
        const targetElemRange = (elem.getBoundingClientRect().bottom / 100) * 95;
        lenisRef?.scrollTo(`#${storeTarget}`, { offset: targetElemRange });
      }
    }
  };

  const paginationScrollTo = () =>
    typeof window !== "undefined" &&
    lenisRef?.scrollTo(`#${storeTarget}`, { offset: -50 });

  const ctxValues = {
    lenisRef,
    stopScroll,
    startScroll,
    lenisScrollTo,
    paginationScrollTo,
    viewAllScroll,
  };

  return (
    <SmoothScrollerContext.Provider value={ctxValues}>
      {children}
    </SmoothScrollerContext.Provider>
  );
}