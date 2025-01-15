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
            rounded-[10px] px-8 pt-8 pb-16 space-y-2 w-[420px]  flex items-center justify-center transition-all
         relative `}
          key={i}
        >
          <div className="space-y-6">
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
            
              <p
                
                className="font-ambit-regular text-black text-4xl text-center flex items-center justify-center"
              >{item.title}</p>
            

            {/* Description */}
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
              
            )
            }
             <div className={`absolute  -bottom-[15px] ${i === 0 ? 'rotate-[0deg]' : 'rotate-[0deg]'} left-0`}>
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
