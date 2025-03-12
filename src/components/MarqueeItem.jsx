"use client";
import Image from "next/image";
import { PrismicNextImage } from "@prismicio/next";
import PencilShadingB from "@/assets/pencil-shading-b.svg";

export default function MarqueeItem({
  mouseEnter,
  mouseLeave,
  trackIndex,
  trackIndexValue,
  index,
  item,
  noHoverEffect,
}) {
  let textBoxClassName =
    "absolute opacity-0 top-0 left-0 h-full w-full bg-v2-blue transition-all flex flex-col items-center justify-center ";

  return (
    <>
      {noHoverEffect ? (
        <div
          className={`relative  flex flex-col justify-center items-center overflow-hidden marquee-item border`}
          key={index}
        >
         <PrismicNextImage
  className="  object-contain h-40 w-40 "
  key={index}
  
  field={item.image || item.partner_logo}
  
  alt={item.image?.alt || item.partner_logo?.alt}
/>

        </div>
      ) : (
        <div
          onMouseEnter={() => mouseEnter(`${trackIndexValue}`, index)}
          onMouseLeave={mouseLeave}
          className={`relative group rounded-sm overflow-hidden marquee-item ${trackIndex === index && "marquee-item-expand "} z-50`}
          key={index}
        >
          <div className="absolute top-[0] left-0 w-full h-[20px] opacity-0 group-hover:opacity-100 z-20">
            <div className="relative h-full w-full">
              <Image src={PencilShadingB} alt="" fill />
            </div>
          </div>
          <PrismicNextImage
            className={`h-full w-full object-cover z-50`}
            key={item.team_member_name}
            field={item.team_member_image}
            alt=""
          />
          <div
            className={`${textBoxClassName} ${trackIndex === index && "!opacity-100"}  flex flex-col items-center justify-center`}
          >
            <p className="text-deep-green font-inter text-2xl">
              {item.team_member_name}
            </p>
            <p className="text-deep-green flex items-center justify-center text-center whitespace-normal flex-wrap font-inter text-lg w-[80%]">
              {item.team_member_role}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
