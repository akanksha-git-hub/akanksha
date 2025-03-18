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
  const lettersRef = useRef([]);

  useEffect(() => {
    if (containerRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      // Animate underline
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 1,
          ease: "power2.out",
        }
      );

      // Animate letters (sliding in from left)
      tl.fromTo(
        lettersRef.current,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.05,
          ease: "power2.out",
          duration: 0.6,
        },
        "<" // start at the same time as underline
      );
    }
  }, []);

  const safeText = text ?? "";

  return (
    <div ref={containerRef} className="relative">
      {/* Text & Dot */}
      <div
        className={`pb-3 ${className} flex flex-wrap gap-[4px] font-inter font-bold items-center uppercase text-2xl text-black tracking-[-0.5px]`}
      >
        <span className="h-[12px] w-[12px] rounded-full bg-black" />
        {safeText.split("").map((letter, index) => (
          <span
            key={index}
            ref={(el) => (lettersRef.current[index] = el)}
            className={`inline-block ${
              letter === " " ? "w-1 inline-block" : ""
            }`}
          >
            {letter === " " ? "\u00A0" : letter}
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
