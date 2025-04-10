"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.ImpactNumbers2AfaSlice} ImpactNumbers2AfaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImpactNumbers2AfaSlice>} ImpactNumbers2AfaProps
 * @param {ImpactNumbers2AfaProps}
 */
const ImpactNumbers2Afa = ({ slice }) => {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".impact-card").forEach((card, i) => {
        gsap.to(card, {
          y: -40,
          scale: 1.05,
          rotate: i % 2 === 0 ? "+=2" : "-=2",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
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
      className="w-full px-6 bg-white text-black relative " 
    >

{slice.primary.bottom_left_asset?.url && (
  <div className="absolute  transform bottom-12 left-32 h-[160px] w-[160px]">
    <PrismicNextImage
      field={slice.primary.bottom_left_asset}
      className="h-full w-full object-contain"
      alt=""
    />

    
  </div>)}
  {slice.primary.top_asset?.url && (
  <div className="absolute  transform right-[400px] -top-64 h-[280px] w-[280px] -z-9">
    <PrismicNextImage
      field={slice.primary.top_asset}
      className="h-full w-full object-contain"
      alt=""
    />

    
  </div>)}
      {/* 🔠 Title */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <h1 className="text-5xl md:text-7xl font-ambit-regular">{slice.primary.title}</h1>
      </div>

      {/* Row 1 */}
      <div className="flex flex-row mx-auto justify-center items-center gap-8">
        <div className="impact-card flex justify-center relative min-w-[400px] max-w-[500px] max-h-[300px] -rotate-3">
          <div className="absolute top-2 right-2 bg-[#F4456E] w-full h-full rounded-xl border-2 border-black z-0" />
          <div className="relative bg-white p-10 border-2 border-black rounded-xl w-full h-full shadow-xl font-ambit-regular text-lg z-10">
            <div className="flex flex-row justify-between">
              <div className="w-[60%]">
                <p>{slice.primary.card_1_description}</p>
              </div>
              <div>
                <PrismicNextImage field={slice.primary.card_1_image} className="w-28" />
              </div>
            </div>
          </div>
        </div>

        <div className="impact-card flex justify-center relative min-w-[400px] max-w-[500px] max-h-[300px] rotate-3">
          <div className="absolute top-2 right-2 bg-[#F4456E] w-full h-full rounded-xl border-2 border-black z-0" />
          <div className="relative bg-white p-10 border-2 border-black rounded-xl w-full h-full shadow-xl font-ambit-regular text-lg z-10">
            <div className="flex flex-row">
              <div className="flex w-[70%] flex-col relative">
                <h1 className="font-ambit-regular text-3xl">{slice.primary.card_2_title}</h1>
                <p className="font-ambit-regular text-lg mt-4">{slice.primary.card_2_description}</p>
              </div>
              <div className="w-[30%]">
                <PrismicNextImage field={slice.primary.card_2_image} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="flex flex-row mx-auto justify-center items-center mt-12 gap-8">
        <div className="impact-card flex justify-center relative min-w-[400px] max-w-[500px] max-h-[300px] rotate-3">
          <div className="absolute top-2 right-2 bg-[#F4456E] w-full h-full rounded-xl border-2 border-black z-0" />
          <div className="relative bg-white p-10 border-2 border-black rounded-xl w-full h-full shadow-xl font-ambit-regular text-lg z-10">
            <div className="flex flex-col">
              <h1 className="font-ambit-regular text-3xl">{slice.primary.card_3_title}</h1>
              <p className="font-ambit-regular text-lg mt-4">{slice.primary.card_3_description}</p>
            </div>
          </div>
        </div>

        <div className="impact-card flex justify-center relative min-w-[400px] max-w-[500px] max-h-[300px] -mt-24 -rotate-3">
          <div className="absolute top-2 right-2 bg-[#F4456E] w-full h-full rounded-xl border-2 border-black z-0" />
          <div className="relative bg-white p-10 border-2 border-black rounded-xl w-full h-full shadow-xl font-ambit-regular text-lg z-10">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col w-[50%]">
                <h1 className="font-ambit-regular text-3xl">{slice.primary.card_4_title}</h1>
                <p className="font-ambit-regular text-lg mt-4">{slice.primary.card_4_description}</p>
              </div>
              <PrismicNextImage field={slice.primary.card_4_image} className="w-36" />
            </div>
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div className="flex flex-row mx-auto justify-center items-center mt-20">
        <div className="impact-card flex justify-center relative min-w-[400px] max-w-[500px] max-h-[300px] -mt-24">
          <div className="absolute top-2 right-2 bg-[#F4456E] w-full h-full rounded-xl border-2 border-black z-0" />
          <div className="relative bg-white p-10 border-2 border-black rounded-xl w-full h-full shadow-xl font-ambit-regular text-lg z-10">
            <PrismicRichText field={slice.primary.card_5_description} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactNumbers2Afa;
