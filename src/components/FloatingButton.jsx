"use client";

import { useState } from "react";
import Image from "next/image";

export default function FloatingButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleButton = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`fixed top-1/2 right-4 transform -translate-y-1/2 transition-all z-50 ${
        isExpanded
          ? "w-80 h-20 bg-white flex-row gap-x-4"
          : "w-20 h-20 bg-[#E6E6E6] rounded-full"
      } text-black shadow-lg flex items-center ${
        isExpanded ? "justify-start px-4" : "justify-center"
      }`}
      onClick={toggleButton}
    >
      {isExpanded ? (
        <>
          <Image src="/file.png" alt="Expand button" width={24} height={24} />
          {/* Text and Link */}
          <div className="flex flex-col  gap-2">
            <span className="text-sm">Explorers of knowledge unites</span>

            <a
              href="/path-to-your-pdf-file.pdf"
              download
              className="flex items-center gap-1 text-sm underline"
              onClick={(e) => e.stopPropagation()}
            >
              <span>Download</span>
              <Image
                src="/download_arrow.png"
                alt="Download arrow"
                width={12}
                height={12}
              />
            </a>
          </div>
        </>
      ) : (
        <Image src="/file.png" alt="Expand button" width={24} height={24} />
      )}
    </div>
  );
}
