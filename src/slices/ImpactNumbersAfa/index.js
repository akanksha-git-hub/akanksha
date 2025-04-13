"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import useMediaQuery from "@/hooks/useMediaQuery";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.ImpactNumbersAfaSlice} ImpactNumbersAfaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImpactNumbersAfaSlice>} ImpactNumbersAfaProps
 * @param {ImpactNumbersAfaProps}
 */
const ImpactNumbersAfa = ({ slice }) => {
  const sectionRef = useRef();

  // Get background color from Prismic (or fallback)
  const cardBgColor = slice.primary.border_color || "#FBDA1D";

  // Determine if view is mobile/tablet (screens 1024px wide or less)
  const isMobileOrTablet = useMediaQuery("(max-width:820px)");

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scroll-based animation for each card
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

  // Define each card as a JSX fragment so we can re-use them in different layouts.
  const Card1 = (
    <div className="impact-card flex justify-center relative md:min-w-[400px] md:max-w-[500px] md:max-h-[300px] md:-rotate-3">
      <div
        className="absolute top-2 right-2 w-full h-full rounded-xl border-2 border-black z-0"
        style={{ backgroundColor: cardBgColor }}
      />
      <div className="relative bg-white p-10 border-2 border-black rounded-xl w-full h-full shadow-xl font-ambit-regular text-lg z-10">
        <PrismicRichText field={slice.primary.card_1_text} />
      </div>
    </div>
  );

  const Card2 = (
    <div className="impact-card flex justify-center relative md:min-w-[400px] md:max-w-[500px] md:max-h-[300px] -rotate-3 -mt-8 lg:mt-16 z-20 lg:z-0 md:rotate-3">
      <div
        className="absolute top-2 right-2 w-full h-full rounded-xl border-2 border-black z-0"
        style={{ backgroundColor: cardBgColor }}
      />
      <div className="relative bg-white p-10 border-2 border-black rounded-xl w-full h-full shadow-xl font-ambit-regular text-lg z-10">
        <div className="flex flex-col relative md:mt-0 mt-20">
          <h1 className="font-ambit-regular text-3xl">{slice.primary.card_2_title}</h1>
          <p className="font-ambit-regular text-lg mt-4">{slice.primary.card_2_description}</p>
          <PrismicNextImage
            field={slice.primary.card_2_image}
            className="absolute right-0 md:-right-2 -top-24 md:-top-6 w-20"
          />
        </div>
      </div>
    </div>
  );

  const Card3 = (  
    <div className="impact-card flex justify-center relative md:min-w-[400px] md:max-w-[500px] md:max-h-[300px] -mt-8  rotate-3  z-20 md:z-0  ">
      <div
        className="absolute top-2 right-2 w-full h-full rounded-xl border-2 border-black z-0 "
        style={{ backgroundColor: cardBgColor }}
      />
      <div className="relative bg-white p-10 border-2 border-black rounded-xl w-full h-full shadow-xl font-ambit-regular text-lg z-10 ">
        <div className="flex flex-row relative mt-12 md:mt-0">
          <div className="flex flex-col">
            <h1 className="font-ambit-regular text-3xl md:w-[80%]">{slice.primary.card_3_title}</h1>
            <p className="font-ambit-regular text-lg mt-4 md:w-[60%]">{slice.primary.card_3_description}</p>
          </div>
          <PrismicNextImage
            field={slice.primary.card_3_image}
            className="absolute right-0 -top-20 md:top-3 w-16 md:w-36"
          />
        </div>
      </div>
    </div>
  );

  const Card4 = (
    <div className="impact-card flex justify-center relative md:min-w-[400px] md:max-w-[500px] md:max-h-[300px] -mt-2 lg:-mt-24  -rotate-3">
      <div
        className="absolute top-2 right-2 w-full h-full rounded-xl border-2 border-black z-0"
        style={{ backgroundColor: cardBgColor }}
      />
      <div className="relative bg-white p-10 border-2 border-black rounded-xl w-full h-full shadow-xl font-ambit-regular text-lg z-10">
        <div className="flex  flex-col md:flex-row ">
          <div className="flex flex-col">
            <h1 className="font-ambit-regular text-3xl">{slice.primary.card_4_title}</h1>
            <p className="font-ambit-regular text-lg w-[80%] mt-4">{slice.primary.card_4_description}</p>
          </div>
          <PrismicNextImage
            field={slice.primary.card_4_image}
            className="w-28"
          />
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full py-32 px-6 bg-white text-black relative"
    >
      {slice.primary.asset_right?.url && (
        <div className="absolute transform right-8 md:right-48 md:top-12 md:h-[140px] md:w-[140px]">
          <PrismicNextImage
            field={slice.primary.asset_right}
            className="h-full w-full object-contain"
            alt=""
          />
        </div>
      )}

      {/* 🔠 Title */}
      <div className="max-w-4xl mx-auto text-left md:text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-ambit-regular">
          {slice.primary.title}
        </h1>
      </div>

      {/* Cards Layout */}
      {isMobileOrTablet ? (
        // Render all cards in one column
        <div className="flex flex-col mx-auto justify-center items-center gap-8 universal-padding">
          {Card1}
          {Card2}
          {Card3}
          {Card4}
        </div>
      ) : (
        // Desktop layout: two rows
        <>
          <div className="flex flex-row mx-auto justify-center items-center gap-8">
            {Card1}
            {Card2}
          </div>
          <div className="flex flex-row mx-auto justify-center items-center mt-12 gap-8">
            {Card3}
            {Card4}
          </div>
        </>
      )}
    </section>
  );
};

export default ImpactNumbersAfa;
