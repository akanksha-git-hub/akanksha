'use client';

import { useEffect, useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import RichText from "../Texts/RichText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IconScrollShowcaseDefaultV2({ data }) {
    const listRef = useRef(null);

    useEffect(() => {
        const items = listRef.current.querySelectorAll("li");

        gsap.fromTo(
            items,
            { opacity: 0.1 }, // Start with low opacity
            {
                opacity: 1, // Fully visible
                duration: 0.8, // Duration for each item
                ease: "power3.out", // Smooth easing
                stagger: 0.6, // Delay between animations
                scrollTrigger: {
                    trigger: listRef.current,
                    start: "top 80%", // Trigger when the list is visible
                    toggleActions: "play reset play reset", // Replay on scroll back
                },
            }
        );
    }, []);

    return (
        <ul ref={listRef} className="flex flex-col items-center my-16 relative">
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
