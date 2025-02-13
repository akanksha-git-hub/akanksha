"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RichText from "./Texts/RichText";
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

  return (
    <div className="relative" ref={containerRef}>
      {/* Text Content (With Letter-by-Letter Reveal) */}
      <div className={`pb-3 ${className} flex gap-1 font-inter font-bold items-center uppercase text-2xl text-black`}>
        {/* Static Rounded Dot (No Animation) */}
        <span className="h-[12px] w-[12px] rounded-full bg-black"></span>

        {/* Text Letters with Animation */}
        {text.split("").map((letter, index) => (
          <span
            key={index}
            ref={(el) => (textRefs.current[index] = el)}
            className="inline-block"
          >
            {letter}
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
