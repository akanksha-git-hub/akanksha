'use client';
import { PrismicNextImage } from "@prismicio/next";

export default function MarqueeNew({ data }) {

    const marqueeData = [...data, ...data];
  return (
    <div className="marquee-text ">
      {/* Marquee container */}
      <div className=" items-center animate-marquee  ">
        {marqueeData.map((item, index) => (
          <div
            className="relative rounded-sm overflow-hidden mx-4"
            key={`${index}-${item?.id || "item"}`}
          >
            <PrismicNextImage
              className="w-[240px] h-[100px] object-fill"
              field={item.image}
              alt={item?.image?.alt || "Marquee Image"}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
