'use client'
import { useEffect, useState, createContext, useContext } from "react"
import Lenis from "lenis";

const SmoothScrollerContext = createContext();

export const useSmoothScroller = () => useContext(SmoothScrollerContext);

export default function LenisScrollContext({ children }) {

    const [lenisRef, setLenisRef] = useState(null);
    const [rafState, setRafState] = useState(null);
    const [storeTarget, setStoreTarget] = useState('recent');

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

    const scrollToOptions = { offset: -50, duration: 1.86 };

    const lenisScrollTo = (id) => {
        setStoreTarget(() => id);
        setTimeout(() => {
            lenisRef.scrollTo(`#${id}`, scrollToOptions);
        }, 200);
    }
    
    const viewAllScroll = () => {
        const elem = document.querySelector(`#${storeTarget}`);
        const targetElemRange = (elem.getBoundingClientRect().bottom / 100) * 95;
        lenisRef.scrollTo(`#${storeTarget}`, { offset: targetElemRange });
    }

    const paginationScrollTo = () => lenisRef.scrollTo(`#${storeTarget}`, { offset: -50 });

    const ctxValues = {
        lenisRef,
        stopScroll,
        startScroll,
        lenisScrollTo,
        paginationScrollTo,
        viewAllScroll
    }

  return (
    <SmoothScrollerContext.Provider 
        value={ctxValues}
    >
        {children}
    </SmoothScrollerContext.Provider>
  )
}
