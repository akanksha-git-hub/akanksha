'use client'
import { PrismicNextImage } from "@prismicio/next";

export default function MarqueeItem({ mouseEnter, mouseLeave, trackIndex, trackIndexValue, index, item, noHoverEffect }) {

    let textBoxClassName = "absolute opacity-0 top-0 left-0 h-full w-full bg-bright-yellow transition-all flex flex-col items-center justify-center";

  return (
    <>
      {noHoverEffect ? (
        <div
          className={`relative rounded-sm overflow-hidden marquee-item`}
          key={index}
        >
          <PrismicNextImage
            className={`h-full w-full object-cover`}
            key={index}
            field={item.image}
            alt=""
          />
        </div>
      ) : (
        <div
          onMouseEnter={() => mouseEnter(`${trackIndexValue}`, index)}
          onMouseLeave={mouseLeave}
          className={`relative rounded-sm overflow-hidden marquee-item ${trackIndex === index && "marquee-item-expand"}`}
          key={index}
        >
          <PrismicNextImage
            className={`h-full w-full object-cover`}
            key={item.team_member_name}
            field={item.team_member_image}
            alt=""
          />
          <div
            className={`${textBoxClassName} ${trackIndex === index && "!opacity-100"} flex flex-col items-center justify-center`}
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
