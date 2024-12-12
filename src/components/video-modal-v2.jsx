import React from "react";
import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import Button from "@/components/v2-components/buttons/button";

export default function VideoModalv2({
  slice,
  className,

  imageClassName,
}) {
  return (
    <div className={` w-full relative  ${className}`}>
      <PrismicNextImage
        height={800}
        width={800}
        field={slice.primary.video_thumbnail_image}
        className={`absolute w-full h-full object-cover z-0  rounded-md lg:rounded-none overflow-hidden ${imageClassName}`}
        alt=""
      />
      <div className="  bg-gradient-to-b from-[#FBDA1D3D] via-transparent to-[#12121287] z-20 flex items-center justify-center w-full ">
        <div className="flex flex-col space-y-2 items-center justify-center text-center w-full p-4  py-9 sm:p-8">
          {/* Title */}
          <RichText
            className="text-white text-3xl sm:text-4xl md:text-6xl lg:text-[104px] font-ambit-regular flex items-center justify-center"
            text={slice.primary.title}
          />
          {/* Description */}
          <RichText
            text={slice.primary.description}
            className="text-white text-base sm:text-lg md:text-xl lg:text-2xl    max-w-[40ch] "
          />
          {/* Button */}
          <div className="w-full flex justify-center">
            <Button
              prismiclink={slice.primary.cta_link}
              className="px-2 py-1   sm:px-3 sm:py-2 md:px-4 md:py-3 lg:px-6 lg:py-4 !text-xs sm:!text-sm md:!text-base"
            >
              {slice.primary.cta_text}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
