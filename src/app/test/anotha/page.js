'use client'

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalScroll() {
  const PAGES = [0, 1, 2, 3];
  const scroller = useRef(null);

  useEffect(() => {
    const panel = gsap.utils.toArray('.panel');

    const to = gsap.to(panel, {
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
        end: () => `+=${window.innerWidth * panel.length}`,
      },
    });

    return () => {
      to.kill();
    };
  }, []);

  return (
    <>
      <main className="h-screen grid place-content-center bg-black text-white">
        HI THIS IS VERTICAL SCROLL SECTION
      </main>

      <div className="overflow-hidden" ref={scroller}>
        <div className="w-[500vw] flex">
          {PAGES.map((item, i) => (
            <div
              className="panel w-[100vw] h-screen p-12 flex items-center justify-center border border-white"
              key={i}
            >
              <p className="text-4xl font-bold">This is div {i + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
