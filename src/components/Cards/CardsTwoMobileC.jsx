import React from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export default function CardsTwoMobileC({ cards }) {
  return (
    <ul className="flex flex-wrap sm:items-center sm:justify-center gap-12 my-12 sm:my-24">
      {cards.map((item, i) => (
        <li
          className={`
            border bg-bright-yellow border-transparent
            rounded-[10px] px-8 pt-8 pb-16 space-y-2 w-[420px] h-[420px] flex items-center justify-center transition-all
          `}
          key={i}
        >
          <div className="space-y-6">
            {/* Card Image */}
            {item.card_image && (
              <div className="flex items-center justify-center">
                <PrismicNextImage field={item.card_image} />
              </div>
            )}

            {/* Title */}
            
              <p
                
                className="font-ambit-regular text-black text-4xl text-center flex items-center justify-center"
              >{item.title}</p>
            

            {/* Description */}
            {/* {Array.isArray(item.desc) && ( */}
              <div className="flex flex-col items-center justify-center space-y-3">
                <PrismicRichText
                  field={item.desc}
                  className=" font-ambit-regular text-xl text-center"
                />
              </div>
            {/* )} */}
          </div>
        </li>
      ))}
    </ul>
  );
}
