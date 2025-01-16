'use client';
import { PrismicNextImage } from "@prismicio/next";

export default function MarqueeItemNew({ index, item }) {
  return (
    <div
      className={`relative rounded-sm overflow-hidden marquee-item`}
      key={index}
    >
      <PrismicNextImage
        className={`h-full w-full object-cover`}
        field={item.card_2_image}
        alt=""
      />
    </div>
  );
}
