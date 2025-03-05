'use client';
import Image from "next/image";
import Arrow from "@/assets/button-arrow.svg";
import PencilShading from "@/assets/pencil-shading.svg";
import { useState, useRef, useEffect } from "react";

export default function SwiperArrow({
  onClick,
  className,
  isDisabled = false,
  ...props
}) {
  const isRotated = className?.includes("rotate-180");
  const [isTouched, setIsTouched] = useState(false);
  const arrowRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0
      );

      const arrow = arrowRef.current;
      if (arrow) {
        const handleTouchStart = () => setIsTouched(true);
        const handleTouchEnd = () => setIsTouched(false);
        const handleTouchCancel = () => setIsTouched(false);

        arrow.addEventListener("touchstart", handleTouchStart);
        arrow.addEventListener("touchend", handleTouchEnd);
        arrow.addEventListener("touchcancel", handleTouchCancel);

        return () => {
          arrow.removeEventListener("touchstart", handleTouchStart);
          arrow.removeEventListener("touchend", handleTouchEnd);
          arrow.removeEventListener("touchcancel", handleTouchCancel);
        };
      }
    }
  }, []);

  return (
    <div
      ref={arrowRef}
      className={`relative group flex items-center justify-center active:scale-95 cursor-pointer ${className} select-none`}
      onClick={onClick}
      {...props}
    >
      {/* Arrow Button */}
      <div
        className={`
          ${isDisabled ? "bg-white" : "bg-v2-orange"}
          border border-black text-black
          rounded-full h-[4.1rem] w-[4.8rem] flex items-center
          justify-center relative z-[2] ${
            !isTouchDevice
              ? "group-hover:opacity-95 group-hover:right-[2px]"
              : ""
          }
          transition-all ${isTouched ? "opacity-80 scale-95" : ""}
        `}
      >
        <div className="relative h-4 w-6">
          <Image alt="arrow" src={Arrow} fill />
        </div>
      </div>

      {/* Pencil Shading Background */}
      <div
        className={`w-full h-full absolute top-0 left-0 rounded-full overflow-hidden 
          ${
            !isTouchDevice
              ? `opacity-0 group-hover:opacity-100 ${
                  isRotated
                    ? "group-hover:top-[-7px]"
                    : "group-hover:top-[7px]"
                }`
              : "opacity-0"
          }
          z-[1] custom-bezier pointer-events-none`}
      >
        <div className="h-full w-full relative">
          <Image
            alt="pencil-shading"
            className="object-cover"
            src={PencilShading}
            fill
          />
        </div>
      </div>
    </div>
  );
}