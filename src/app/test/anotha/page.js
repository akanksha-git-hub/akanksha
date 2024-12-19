"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Page() {

    const PAGES = [0, 1, 2, 3];

    const scroller = useRef(null);

    useEffect(() => {

        let panel = gsap.utils.toArray('.panel');

        let to = gsap.to(panel, {
            xPercent: () => -100 * (panel.length - 1),
            ease: 'none',
            scrollTrigger: {
              trigger: scroller.current,
              markers: false,
              pin: true,
              pinSpacing: true,
              scrub: 2,
              invalidateOnRefresh: true,
              anticipatePin: 1,
      
              end: () => '+=' + window.outerWidth,
            },
        });

        return () => {
            to.kill(); // clean up func
        }

    }, []);

    return(
        <>
        <main className="h-screen grid place-content-center">
            HI THIS IS VERTICAL SCROLL SECTION
        </main>
        <div className="overflow-hidden border border-white" ref={scroller}>
            <div className="w-[500vw] flex border border-green-500">
                {PAGES.map((item, i) => (
                    <div className="panel w-[100vw] p-12 border border-red-500" key={item}>
                        This is div {i + 1}
                    </div>
                ))}
            </div>
        </div>
        </>
    )

}