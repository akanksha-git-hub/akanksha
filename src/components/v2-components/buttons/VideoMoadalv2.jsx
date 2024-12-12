import React from "react";
import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import Button from "@/components/v2-components/buttons/button";

export default function VideoModalv2({
  slice,
  className,
  descriptionText,
  imageClassName,
}) {
  return (
    <div className={`w-2/4 relative ${className}`}>
      <PrismicNextImage
        height={800}
        width={800}
        field={slice.primary.video_thumbnail_image}
        className={`w-full h-auto object-cover z-0 rounded-md overflow-hidden ${imageClassName}`}
        alt=""
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#FBDA1D3D] via-transparent to-[#12121287] z-20">
        <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
          <div className="flex flex-col items-center justify-center text-center max-w-[70%] sm:max-w-[900px]">
            {/* Title */}
            <RichText
              className="text-white text-[2.2em] sm:text-[4em] md:text-[6.25em] lg:text-[6.5em] font-ambit-regular "
              text={slice.primary.title}
            />
            {/* Description */}
            <RichText
              text={slice.primary.description}
              className="text-white text-[0.8em] lg:-mt-4 sm:text-[1em] md:text-[1.25em] lg:text-[1.5em] mb-6 md:mb-8  break-words "
            />
            <div className="w-full flex justify-center">
              <Button
                prismiclink={slice.primary.cta_link}
                className="px-3 py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 !text-xs md:!text-sm lg:!text-base"
              >
                {slice.primary.cta_text}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
