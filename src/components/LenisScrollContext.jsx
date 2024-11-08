'use client'

import { useEffect, useState, createContext, useContext } from "react"
import Lenis from "lenis";

const SmoothScrollerContext = createContext();

export const useSmoothScroller = () => useContext(SmoothScrollerContext);

export default function LenisScrollContext({ children }) {

    const [lenisRef, setLenisRef] = useState(null);
    const [rafState, setRafState] = useState(null);

    useEffect(() => {

        const scroller = new Lenis({ syncTouch: true });
        let rf;

        function raf(time) {
            scroller.raf(time);
            requestAnimationFrame(raf);
        }

        rf = requestAnimationFrame(raf);
        setRafState(rf);
        setLenisRef(scroller);


        return () => {
            if (lenisRef) {
                cancelAnimationFrame(rafState);
                lenisRef.destroy();
            }
        }

    }, []);

    const stopScroll = () => lenisRef.stop();
    const startScroll = () => lenisRef.start();

    const scrollToOptions = { offset: -50, duration: 1.86 };

    const lenisScrollTo = (id) => lenisRef.scrollTo(`#${id}`, scrollToOptions);

    const ctxValues = {
        lenisRef,
        stopScroll,
        startScroll,
        lenisScrollTo
    }

  return (
    <SmoothScrollerContext.Provider value={ctxValues}>
        {children}
    </SmoothScrollerContext.Provider>
  )
}
