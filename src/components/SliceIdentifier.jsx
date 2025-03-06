'use client';
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import useDebouncedResize from "@/hooks/useDebouncedResize";
import { PrismicNextImage } from "@prismicio/next";

gsap.registerPlugin(ScrollTrigger);

export default function SliceIdentifier({ text = "", className, hasSpider, isVisible }) {
  const containerRef = useRef(null);
  const textRefs = useRef([]);
  const lineRef = useRef(null);
  const { width } = useDebouncedResize(); // ✅ Fix: Ensure width is available

  useEffect(() => {
    console.log("Screen width:", width);
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current) {
      console.error("containerRef is NULL. The animation cannot attach.");
      return;
    }

    let ctx = gsap.context(() => {
      // Restore **original timing & styling**
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        {
          scaleX: 1,
          duration: 2, // ✅ Restore original duration
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: width > 1200 ? "top 80%" : "top 90%", // ✅ Adjust trigger for large screens
            end: "bottom 85%",
            toggleActions: "play none none none",
            markers: false, // ✅ Remove markers for production
            invalidateOnRefresh: true, // ✅ Ensures recalculation on resize
            onEnter: () => console.log("Animation triggered!"),
          },
        }
      );

      // Restore **letter-by-letter animation**
      if (textRefs.current.length > 0) {
        gsap.fromTo(
          textRefs.current.filter((el) => el),
          { opacity: 0, x: -10 }, // ✅ Restore original styling
          {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.05, // ✅ Restore stagger effect
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

  return (
    <div className="relative" ref={containerRef}>
      <div className={`pb-3 ${className} flex flex-wrap gap-[4px] font-inter font-bold items-center uppercase text-2xl text-black tracking-[-0.5px]`}>
        <span className="h-[12px] w-[12px] rounded-full bg-black"></span>
        {text.split(" ").map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split("").map((letter, index) => (
              <span key={index} ref={(el) => (textRefs.current[wordIndex * 10 + index] = el)} className="inline-block">
                {letter}
              </span>
            ))}
            {wordIndex !== text.split(" ").length - 1 && <span>&nbsp;</span>}
          </span>
        ))}
      </div>
      <div ref={lineRef} className="border-b border-black w-full"></div>
      {isVisible && (
        <PrismicNextImage field={hasSpider} width={150} height={150} className="hidden xl:block absolute right-4 top-10 z-[-1]" />
      )}
    </div>
  );
}
