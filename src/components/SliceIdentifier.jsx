"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicNextImage } from "@prismicio/next";

export default function SliceIdentifier({
  text = "", // Ensure text is always a string
  className,
  hasSpider,
  isVisible,
}) {
  const containerRef = useRef(null);
  const textRefs = useRef([]); // Array to hold refs for each letter
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // Animate border-bottom (Expanding from left to right)
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );

      // Animate each letter appearing from left to right
      if (textRefs.current.length > 0) {
        gsap.fromTo(
          textRefs.current,
          { opacity: 0, x: -10 }, // Start slightly hidden
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.05, // Stagger effect for letter reveal
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP animations when unmounting
  }, [text]); // Depend on text to ensure updates when text changes

  // Ensure text is always a string to prevent split() errors
  const safeText = text ?? ""; // Defaults to an empty string if text is null/undefined

  return (
    <div className="relative" ref={containerRef}>
      {/* Text Content (With Letter-by-Letter Reveal) */}
      <div className={`pb-3 ${className} flex flex-wrap gap-[4px] font-inter font-bold items-center uppercase text-2xl text-black tracking-[-0.5px]`}>
        {/* Static Rounded Dot (No Animation) */}
        <span className="h-[12px] w-[12px] rounded-full bg-black"></span>

        {/* Split text into words, preserving spaces */}
        {safeText.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split("").map((letter, index) => (
              <span
                key={index}
                ref={(el) => (textRefs.current[wordIndex * 10 + index] = el)}
                className="inline-block"
              >
                {letter}
              </span>
            ))}
            {/* Add space after each word except the last one */}
            {wordIndex !== safeText.split(" ").length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </div>

      {/* Animated Bottom Border */}
      <div ref={lineRef} className="border-b border-black w-full"></div>

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
