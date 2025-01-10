import React, { useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

export default function CardsTwoDesktopC({ cards }) {
   
  const [active, setActive] = useState(0);

  const handleMouseHover = (i) => setActive(i);

  return (
    
    
    <ul className="flex items-center justify-center gap-4 xl:gap-4 my-24 relative">
      {cards.map((item, i) => (
        <li
          onMouseEnter={() => handleMouseHover(i)}
          className={`${
            i === 0 ? "" : "relative top-12"
          } border ${
            i === 0 ? "rotate-[-6deg]" : "rotate-[6deg]"
          } ${
            active === i
              ? "bg-bright-yellow border-transparent opacity-100 z-10"
              : "border-deep-green opacity-70"
          } rounded-t-[10px] px-8 pt-8 pb-16 space-y-2 w-[380px] flex items-center justify-center transition-all relative`}
          key={i}
        >
          {/* Sparkles */}
          {i === 0 && item.sparkles_left && (
            <div className="absolute -left-[20%] -top-[10%] scale-50 xl:scale-100">
              <PrismicNextImage field={item.sparkles_left} />
            </div>
          )}
          {i === 1 && item.sparkles_right && (
            <div className="absolute -right-[30%] -top-[20%] scale-50 xl:scale-100">
              <PrismicNextImage field={item.sparkles_right} />
            </div>
          )}

          <div className="space-y-6">
            {/* Shading */}
            <div
              className={`absolute w-full -top-[15px] ${
                i === 0 ? "rotate-[4deg]" : "rotate-[4deg]"
              } left-0 h-[18px]`}
            >
              {i === 0 && item.left_shading && (
                <PrismicNextImage field={item.left_shading} />
              )}
              {i === 1 && item.right_shading && (
                <PrismicNextImage field={item.right_shading} />
              )}
            </div>

            {/* Card Image */}
            {item.card_image && (
              <div className="flex items-center justify-center">
                <PrismicNextImage field={item.card_image} />
              </div>
            )}

            {/* Title */}
            {item.title && (
              <p
                
                className="font-ambit-regular text-black text-4xl text-center flex items-center justify-center">
{item.title}
                </p>
              
            )}

            {/* Description (RichText) */}
            {Array.isArray(item.desc) && (
              <div className="space-y-3">
                {/* <PrismicRichText
                  field={item.desc}
                  className="text-black font-ambit-regular text-lg text-center"
                /> */}
                 {item.desc && (
                                item.desc.map((text, index) => {

                                    return(
                                        <p
                                            className="text-black font-ambit-regular text-lg text-center" 
                                            key={index}
                                        >
                                            {text.text}
                                        </p>
                                    )

                                })
                            )}
              </div>
            )}

      
            <div className={`absolute  -bottom-[15px] ${i === 0 ? 'rotate-[4deg]' : 'rotate-[4deg]'} left-0`}>
                {i === 0 && item.left_shading && (
                    


                  <PrismicNextImage field={item.left_asset} />
                  
                )}
                {i === 1 && item.right_shading && (
                  <PrismicNextImage field={item.right_asset} />
                )}
              </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
