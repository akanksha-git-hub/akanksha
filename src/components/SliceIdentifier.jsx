"use client";

import { useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";

export default function SliceIdentifier({
  text = "",
  className,
  hasSpider,
  isVisible,
}) {
  const containerRef = useRef(null);

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

      {/* Bottom Border (no animation) */}
      <div className="border-b border-black w-full" />

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
