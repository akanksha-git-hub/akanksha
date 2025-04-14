"use client";

import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useRef, useState } from "react";

export default function SliceIdentifier({
  text = "",
  className,
  hasSpider,
  isVisible,
}) {
  const safeText = text ?? "";
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5, rootMargin: "0px 0px -30% 0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Text & Dot */}
      <div
        className={`pb-3 ${className} flex flex-wrap gap-[4px] font-inter font-bold items-center uppercase text-lg md:text-2xl text-black tracking-[-0.5px]`}
      >
        <span className="h-[12px] w-[12px] rounded-full bg-black" />
        {safeText.split("").map((letter, index) => (
          <span
            key={index}
            className={`inline-block transition-all duration-500 ease-out ${
              inView
                ? `animate-slideIn opacity-100 delay-[${index * 40}ms]`
                : "opacity-0 -translate-x-5"
            } ${letter === " " ? "w-2 inline-block" : ""}`}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>

      {/* Bottom Border (underline) */}
      <div
        className={`border-b border-black w-full transform transition-transform duration-700 ease-out origin-left ${
          inView ? "scale-x-100" : "scale-x-0"
        }`}
      />

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
