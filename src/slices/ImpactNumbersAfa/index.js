"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.ImpactNumbersAfaSlice} ImpactNumbersAfaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImpactNumbersAfaSlice>} ImpactNumbersAfaProps
 * @param {ImpactNumbersAfaProps}
 */
const ImpactNumbersAfa = ({ slice }) => {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scroll-based animation for cards
      gsap.utils.toArray(".impact-card").forEach((card, i) => {
        gsap.to(card, {
          y: -40,
          scale: 1.05,
          rotate: i % 2 === 0 ? "+=2" : "-=2",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
          ease: "power1.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full py-32 px-6 bg-white text-black relative"
      
    >

{slice.primary.asset_right?.url && (
  <div className="absolute  transform right-48 top-12 h-[140px] w-[140px] ">
    <PrismicNextImage
      field={slice.primary.asset_right}
      className="h-full w-full object-contain"
      alt=""
    />

    
  </div>)}
      {/* 🔠 Title */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-ambit-regular">{slice.primary.title}</h1>
      </div>

      {/* 1st Row */}
      <div className="flex flex-row mx-auto justify-center items-center gap-8">
        {/* Card 1 */}
        <div className="impact-card flex justify-center relative min-w-[400px] max-w-[500px] max-h-[300px] -rotate-3">
          <div className="absolute top-2 right-2 bg-[#FBDA1D] w-full h-full rounded-xl border-2 border-black z-0" />
          <div className="relative bg-white p-10 border-2 border-black rounded-xl w-full h-full shadow-xl font-ambit-regular text-lg z-10">
            <PrismicRichText field={slice.primary.card_1_text} />
          </div>
        </div>

        {/* Card 2 */}
        <div className="impact-card flex justify-center relative min-w-[400px] max-w-[500px] max-h-[300px] rotate-3">
          <div className="absolute top-2 right-2 bg-[#FBDA1D] w-full h-full rounded-xl border-2 border-black z-0" />
          <div className="relative bg-white p-10 border-2 border-black rounded-xl w-full h-full shadow-xl font-ambit-regular text-lg z-10">
            <div className="flex flex-col relative">
              <h1 className="font-ambit-regular text-3xl">{slice.primary.card_2_title}</h1>
              <p className="font-ambit-regular text-lg mt-4">{slice.primary.card_2_description}</p>
              <PrismicNextImage field={slice.primary.card_2_image} className="absolute -right-2 -top-6 w-20" />
            </div>
          </div>
        </div>
      </div>

      {/* 2nd Row */}
      <div className="flex flex-row mx-auto justify-center items-center mt-12 gap-8">
        {/* Card 3 */}
        <div className="impact-card flex justify-center relative min-w-[400px] max-w-[500px] max-h-[300px] rotate-3">
          <div className="absolute top-2 right-2 bg-[#FBDA1D] w-full h-full rounded-xl border-2 border-black z-0" />
          <div className="relative bg-white p-10 border-2 border-black rounded-xl w-full h-full shadow-xl font-ambit-regular text-lg z-10">
            <div className="flex flex-row relative">
              <div className="flex flex-col">
                <h1 className="font-ambit-regular text-3xl w-[80%]">{slice.primary.card_3_title}</h1>
                <p className="font-ambit-regular text-lg mt-4 w-[60%]">{slice.primary.card_3_description}</p>
              </div>
              <PrismicNextImage field={slice.primary.card_3_image} className="absolute right-0 top-3 w-36" />
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="impact-card flex justify-center relative min-w-[400px] max-w-[500px] max-h-[300px] -mt-24 -rotate-3">
          <div className="absolute top-2 right-2 bg-[#FBDA1D] w-full h-full rounded-xl border-2 border-black z-0" />
          <div className="relative bg-white p-10 border-2 border-black rounded-xl w-full h-full shadow-xl font-ambit-regular text-lg z-10">
            <div className="flex flex-row">
              <div className="flex flex-col">
                <h1 className="font-ambit-regular text-3xl">{slice.primary.card_4_title}</h1>
                <p className="font-ambit-regular text-lg w-[80%] mt-4">{slice.primary.card_4_description}</p>
              </div>
              <PrismicNextImage field={slice.primary.card_4_image} className="w-28" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactNumbersAfa;
