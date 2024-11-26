'use client'
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import Lottie from "lottie-react";

/**
 * @typedef {import("@prismicio/client").Content.CardShowcaseSlice} CardShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CardShowcaseSlice>} CardShowcaseProps
 * @param {CardShowcaseProps}
 */
const CardShowcase = ({ slice }) => {

  let LottieData = null;

  if(slice.primary.isanimatedicon && slice.primary.animated_icon_json_format) {
    LottieData = JSON.parse(slice.primary.animated_icon_json_format);
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="my-12"
    >
      <SliceIdentifier 
        text={slice.primary.slice_identifier}
      />
      <div className="flex flex-col 1000pixel:flex-row items-end justify-between bg-white w-full shadow-lg 1000pixel:h-[600px] mt-12 sm:mt-24 pt-8 pr-8 pl-8">
        <div className="w-full 1000pixel:h-[90%] 1000pixel:w-[40%] flex flex-col justify-between pb-8 space-y-6 1000pixel:space-y-0">
          <RichText 
            text={slice.primary.title}
            className='font-ambit-regular text-deep-green text-5xl w-full'
          />
          <RichText 
            text={slice.primary.description}
            className='font-ambit-regular text-deep-green text-xl w-full'
          />
        </div>
        <div className="h-[320px] md:h-[500px] w-full 1000pixel:h-[90%] 1000pixel:w-[50%] flex items-end">
          {slice.primary.isanimatedicon && (
            <Lottie 
              className="h-full lg:h-auto 2xl:h-full w-full"
              animationData={LottieData}
            />
          )}
          {!slice.primary.isanimatedicon && (
            <PrismicNextImage 
              className="h-full w-full object-cover"
              field={slice.primary.image}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default CardShowcase;
