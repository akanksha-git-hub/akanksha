"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import RichText from "./Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";

export default function SliceIdentifier({ text, className, hasSpider, isVisible }) {
  const containerRef = useRef(null);
  const textRefs = useRef([]); // Array to hold refs for each letter
  const lineRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });

      // Animate the border-bottom (expanding from left to right)
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: "left" },
        { scaleX: 1, duration: 2, ease: "power2.out" }
      );

      // Animate each letter with rotateX effect
      gsap.fromTo(
        textRefs.current,
        { opacity: 0, rotateX: 90, },
        {
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.05, 
        }
      );
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP animations when unmounting
  }, []);

 
  // const animatedText = text.split("").map((letter, index) => (
  //   <span
  //     key={index}
  //     ref={(el) => (textRefs.current[index] = el)}
  //     className="inline-block"
  //     style={{ display: "inline-block" }} 
  //   >
  //     {letter}
  //   </span>
  // ));

  return (
    <div className="relative" ref={containerRef}>
      <div ref={lineRef} className={`border-b pb-3 border-black ${className}`}>
        {/* Animated Text (Each letter inside a span) */}
        <div className="text-black flex gap-1 font-inter font-bold items-center uppercase text-2xl">
          <span  ref={textRefs} className="h-[12px] w-[12px] rounded-full bg-black"></span>
          {text}
        </div>
      </div>
      {isVisible && (
        <PrismicNextImage
          field={hasSpider}
          width={150}
          height={150}
          className="hidden xl:block absolute right-4 top-11 z-[-1]"
        />
      )}
    </div>
  );
}
