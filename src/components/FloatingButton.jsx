"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function FloatingButton({ pdfUrl,text }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const buttonRef = useRef(null);
  const [isClient, setIsClient] = useState(false); // ✅ Ensures client-side rendering

  // ✅ Run only once when the component mounts
  useEffect(() => {
    setIsClient(true); // ✅ Ensures consistent rendering
  }, []);

  const toggleButton = () => {
    setIsExpanded((prev) => !prev);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  // ✅ Render a placeholder div to prevent hooks mismatch
  if (!isClient) return <div className="fixed top-1/2 right-4 w-20 h-20 bg-transparent"></div>;

  return (
    <div ref={buttonRef} className="fixed top-1/2 right-4 transform -translate-y-1/2 z-50">
      <div
        className={`transition-all flex items-center ${
          isExpanded
            ? "w-80 h-20 bg-white shadow-lg rounded-md flex-row gap-x-4 justify-start px-4"
            : "w-20 h-24 bg-bright-yellow rounded-2xl justify-center"
        } text-black`}
        onClick={toggleButton}
      >
        {isExpanded ? (
          <>
            <Image src="/file.png" alt="Expand button" width={38} height={38} />
            <div className="flex flex-col gap-2">
              <span className="text-base">{text}</span>

              {/* ✅ Button triggers direct download */}
              {pdfUrl ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(pdfUrl, "_blank"); 
                  }}
                  className="flex items-center gap-1 text-sm underline"
                >
                  <span>Download</span>
                  <Image src="/download_arrow.png" alt="Download arrow" width={10} height={10} />
                </button>
              ) : (
                <span className="text-gray-500 text-sm">No file available</span>
              )}
            </div>
          </>
        ) : (
          <div className="relative">
            <Image src="/file.png" alt="Expand button" width={44} height={44} />
    
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
          </div>
        )}
      </div>
    </div>
  );
}
