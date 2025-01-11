'use client';

import { useEffect, useRef } from "react";
import { PrismicNextImage } from "@prismicio/next";
import RichText from "../Texts/RichText";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function IconScrollShowcaseModernV2({ data }) {
    const listRef = useRef(null);

    useEffect(() => {
        const items = listRef.current.querySelectorAll("li");

        gsap.fromTo(
            items,
            { opacity: 0.1 }, 
            {
                opacity: 1, 
                duration: 0.8, 
                ease: "power3.out", 
                stagger: 0.6, 
                scrollTrigger: {
                    trigger: listRef.current,
                    start: "top 80%", 
                    toggleActions: "play reset play reset", 
                },
            }
        );
    }, []);

    return (
        <ul ref={listRef} className="flex items-center justify-between my-16">
            {data.map((item, i) => (
                <li key={item.text} className="flex items-center space-x-10">
                    {i !== 0 && <div className="w-16 h-[2px] bg-black" />}

                    {/* Image */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="h-[12rem] w-[12rem]">
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
                            className="text-black text-xl font-ambit-regular"
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
}
