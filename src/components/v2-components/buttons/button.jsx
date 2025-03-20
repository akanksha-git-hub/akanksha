'use client';
import { forwardRef, useState, useRef, useEffect } from "react";
import Arrow from "@/assets/button-arrow.svg";
import PlayVector from "@/assets/play-vector.svg";
import PencilShading from "@/assets/pencil-shading.svg";
import Image from "next/image";
import Link from "next/link";
import { PrismicLink } from "@prismicio/react";

const Button = forwardRef(function Button(
  { children, isVideo, prismicLink, href,rev = false, className, ...props },
  ref
) {
  const [isTouched, setIsTouched] = useState(false);
  const buttonRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Client-side only code
    if (typeof window !== "undefined") {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.msMaxTouchPoints > 0
      );

      const button = buttonRef.current;
      if (button) {
        const handleTouchStart = () => setIsTouched(true);
        const handleTouchEnd = () => setIsTouched(false);
        const handleTouchCancel = () => setIsTouched(false);

        button.addEventListener("touchstart", handleTouchStart);
        button.addEventListener("touchend", handleTouchEnd);
        button.addEventListener("touchcancel", handleTouchCancel);

        return () => {
          button.removeEventListener("touchstart", handleTouchStart);
          button.removeEventListener("touchend", handleTouchEnd);
          button.removeEventListener("touchcancel", handleTouchCancel);
        };
      }
    }
  }, []);

  let baseClass = `bg-v2-orange text-black border border-black transition-all right-0 
                    flex items-center gap-1 font-inter font-bold 
                    w-fit text-sm rounded-full py-2 px-4 relative 
                    z-[1] ${
                      !isTouchDevice
                        ? "group-hover:opacity-95 group-hover:right-[2px]"
                        : ""
                    } ${isTouched ? "opacity-80 scale-95" : ""} ${className}`;

  const hoverEffectClasses = `w-full h-full absolute top-0 left-0 rounded-full
                                overflow-hidden ${
                                  !isTouchDevice
                                    ? "opacity-0 group-hover:opacity-100 group-hover:top-[7px]"
                                    : "opacity-0"
                                } z-[0]
                                custom-bezier pointer-events-none`;

  const BaseButton = () => (
    <div className="relative group active:scale-95 w-fit">
    <button ref={buttonRef} className={`${baseClass}`} {...props}>
        {/* Conditionally render arrow + text */}
        {rev ? (
          <>
            <span className="relative top-[1px] h-4 w-6 mr-1">
              <Image
                alt="arrow"
                src={isVideo ? PlayVector : Arrow}
                className="scale-x-[-1]"
                fill
              />
            </span>
            <span>{children}</span>
          </>
        ) : (
          <>
            <span>{children}</span>
            <span className="relative top-[1px] h-4 w-6 ml-1">
              <Image alt="arrow" src={isVideo ? PlayVector : Arrow} fill />
            </span>
          </>
        )}
      </button>

      <div className={hoverEffectClasses}>
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

  if (prismicLink) {
    return (
      <PrismicLink field={prismicLink}>
        <BaseButton />
      </PrismicLink>
    );
  }

  if (href?.startsWith("/")) {
    return (
      <Link href={href} passHref>
        {<BaseButton />}
      </Link>
    );
  }

  if (href?.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <BaseButton />
      </a>
    );
  }

  return <BaseButton />;
});

export default Button;