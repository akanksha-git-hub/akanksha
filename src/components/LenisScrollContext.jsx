'use client'

import { useEffect, useState, createContext, useContext } from "react"
import Lenis from "lenis";

const SmoothScrollerContext = createContext();

export const useSmoothScroller = () => useContext(SmoothScrollerContext);

export default function LenisScrollContext({ children }) {

    const [lenisRef, setLenisRef] = useState(null);
    const [rafState, setRafState] = useState(null);

    useEffect(() => {

        const scroller = new Lenis();
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

  return (
    <SmoothScrollerContext.Provider value={{lenisRef, stopScroll, startScroll}}>
        {children}
    </SmoothScrollerContext.Provider>
  )
}
