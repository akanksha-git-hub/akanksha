"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicNextImage } from "@prismicio/next";
import useDebouncedResize from "@/hooks/useDebouncedResize";

gsap.registerPlugin(ScrollTrigger);

export default function SliceIdentifier({ text = "", className, hasSpider, isVisible }) {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const lineRef = useRef(null);
  const { width } = useDebouncedResize(); // ✅ Fix: Ensure width is available

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // ✅ Restores original GSAP animation styling & timing
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 2, // ✅ Restores original animation speed
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: width > 1200 ? "top 80%" : "top 90%", // ✅ Adjust trigger for large screens
            end: "bottom 85%",
            toggleActions: "play none none none",
            invalidateOnRefresh: true, // ✅ Ensures recalculation on resize
          },
        }
      );

      // ✅ Restores letter-by-letter animation
      if (textRefs.current.length > 0) {
        gsap.fromTo(
          textRefs.current.filter((el) => el),
          { opacity: 0, x: -10 }, // ✅ Restore original letter animation styling
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.05, // ✅ Restores stagger effect
            scrollTrigger: {
              trigger: containerRef.current,
              start: width > 1200 ? "top 85%" : "top 90%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [text, width]); // ✅ Fix: Ensure recalibration on resize

  // ✅ Force recalibration when window resizes
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [width]);

  // ✅ Fix: Ensure `text` is never null or undefined
  const safeText = text ?? "";

  return (
    <div className="relative" ref={containerRef}>
      {/* ✅ Animated Text Identifier */}
      <div className={`pb-3 ${className} flex flex-wrap gap-[4px] font-inter font-bold items-center uppercase text-2xl text-black tracking-[-0.5px]`}>
        {/* ✅ Static Dot */}
        <span className="h-[12px] w-[12px] rounded-full bg-black"></span>

        {/* ✅ Letter-by-letter animation */}
        {safeText.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split("").map((letter, index) => (
              <span key={index} ref={(el) => (textRefs.current[wordIndex * 10 + index] = el)} className="inline-block">
                {letter}
              </span>
            ))}
            {/* ✅ Adds space between words */}
            {wordIndex !== safeText.split(" ").length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </div>

      {/* ✅ Animated Bottom Border */}
      <div ref={lineRef} className="border-b border-black w-full"></div>

      {/* ✅ Optional Image Rendering */}
      {isVisible && (
        <PrismicNextImage field={hasSpider} width={150} height={150} className="hidden xl:block absolute right-4 top-10 z-[-1]" />
      )}
    </div>
  );
}
