import React from "react";
import RichText from "@/components/Texts/RichText";
import Image from "next/image";
import { PrismicNextImage } from "@prismicio/next";

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
      <div className="absolute p-4 sm:p-8 flex items-end image-bg top-0 left-0 h-full w-full z-20 rounded-lg overflow-hidden cursor-pointer hover:opacity-85 transition-all">
        <div className="flex items-center w-full justify-between">
          <div className="w-[70%]">
            <RichText
              className="text-white text-3xl 2xl:text-6xl w-[100%] font-ambit-regular"
              text={slice.primary.video_thumbnail_title}
            />
            {descriptionText && (
              <RichText
                className="text-white text-xl w-[80%] font-ambit-regular"
                text={descriptionText}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}