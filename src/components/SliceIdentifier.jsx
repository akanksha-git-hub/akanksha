"use client";

import { useRef, useEffect } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SliceIdentifier({
  text = "",
  className,
  hasSpider,
  isVisible,
}) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  // Safely handle text (avoid undefined/null)
  const safeText = text ?? "";

  return (
    <div ref={containerRef} className="relative">
      {/* Text & Dot */}
      <div
        className={`pb-3 ${className} flex flex-wrap gap-[4px] font-inter font-bold items-center uppercase text-2xl text-black tracking-[-0.5px]`}
      >
        <span className="h-[12px] w-[12px] rounded-full bg-black" />
        {safeText.split(" ").map((word, wIndex) => (
          <span key={wIndex} className="inline-block">
            {word.split("").map((letter, lIndex) => (
              <span key={lIndex} className="inline-block">
                {letter}
              </span>
            ))}
            {wIndex !== safeText.split(" ").length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </div>

      {/* Bottom Border (animated) */}
      <div ref={lineRef} className="border-b border-black w-full scale-x-0" />

      {/* Optional Spider Image */}
      {isVisible && (
        <PrismicNextImage
          field={hasSpider}
          width={150}
          height={150}
          className="hidden xl:block absolute right-4 top-10 z-[-1]"
        />
      )}
    </div>
  );
}
