'use client'

import { PrismicNextImage } from "@prismicio/next";
import RichText from "../Texts/RichText";

export default function IconScrollShowcaseDefaultV2({ data }) {
    return (
        <ul className="flex flex-col items-center my-16 relative">
            {data.map((item, i) => (
                <li key={item.text} className="flex flex-col items-center mb-28 relative">
                    {/* Vertical Line */}
                    {i !== data.length - 1 && (
                        <div className="absolute top-full left-2/4 transform -translate-x-1/2 w-[2px] h-24 bg-black"></div>
                    )}

                    {/* Image and Text */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="h-[8rem] w-[8rem] md:h-[12rem] md:w-[12rem]">
                            <PrismicNextImage 
                                field={item.image}
                                className="h-full w-full object-contain"
                                alt={item.text || ""}
                                height={64}
                                width={64}
                            />
                        </div>

                        {/* Text */}
                        <RichText 
                            text={item.text} 
                            className="text-black text-xl font-ambit-regular mt-4"
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
}
