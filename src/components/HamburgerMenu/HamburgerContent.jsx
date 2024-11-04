'use client'

import { useEffect } from "react";
import { useSmoothScroller } from "../LenisScrollContext";
import { useHamburgerContext } from "./Hamburger"

export default function HamburgerContent() {

    const { isOpen } = useHamburgerContext();
    const { stopScroll, startScroll, lenisRef } = useSmoothScroller();

    useEffect(() => {

        if(isOpen) {
            stopScroll();
            document.body.style.overflow = 'hidden'
        } else {

            if(lenisRef) startScroll();
            document.body.style.overflow = 'none'

        }

    }, [isOpen]);


  return (
    <div data-lenis-prevent className={`${isOpen ? 'h-screen' : 'h-0'} transition-all bg-green-500 overflow-hidden`}>
        {isOpen && (
            <div className={`transition-all`} data-lenis-prevent>
                <p>Prevent LENIS SCROLL on HB DropDown</p>
            </div>
        )}
    </div>
  )
}
