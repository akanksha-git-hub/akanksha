"use client";
import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import Lottie from "lottie-react";

/**
 * @typedef {import("@prismicio/client").Content.FlagshipHeroSlice} FlagshipHeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FlagshipHeroSlice>} FlagshipHeroProps
 * @param {FlagshipHeroProps}
 */
const FlagshipHero = ({ slice }) => {
  let LottieDataA = null;
  let LottieDataB = null;

  if (slice.primary.animated_icon_a_json_format)
    LottieDataA = JSON.parse(slice.primary.animated_icon_a_json_format);
  if (slice.primary.animated_icon_b_json_format)
    LottieDataB = JSON.parse(slice.primary.animated_icon_b_json_format);

  if (slice.variation === "sectionHero") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative mb-24"
      >
        <div className="flex flex-col items-center justify-center space-y-12 mt-32">
          <RichText
            text={slice.primary.main_title}
            className="font-ambit-regular text-black sm:text-center text-4xl md:text-7xl max-w-[15ch]"
          />
          <RichText
            text={slice.primary.description1}
            className="font-ambit-regular text-black sm:text-center text-lg w-full max-w-[60ch]"
          />
          <RichText
            text={slice.primary.description2}
            className="font-ambit-regular text-black sm:text-center text-lg w-full max-w-[60ch]"
          />
        </div>

        {/* Top left image */}
        <div className="hidden lg:block absolute top-[110px] -left-[100px]  md:h-[280px] md:w-[120px] lg:h-[350px] w-[200px]  lg:w-[200px] xl:w-[300px] -z-10">
          <PrismicNextImage
            field={slice.primary.image_a}
            className="h-full w-full object-contain"
            height={1800}
            width={1800}
          />
        </div>

        {/* Bottom right image */}
        <div className="hidden md:block absolute -bottom-[100px] -right-[190px]  md:h-[260px] md:w-[350px] lg:h-[400px] w-[300px]  lg:w-[500px] -z-10">
          <PrismicNextImage
            field={slice.primary.image_b}
            className="h-full w-full object-contain"
            height={1800}
            width={1800}
          />
        </div>
      </section>
    );
  }
  if (slice.variation === "smallDescription") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="relative mb-24"
      >
        <div className="flex flex-col items-center justify-center space-y-12 mt-32">
          <RichText
            text={slice.primary.main_title}
            className="font-ambit-regular text-black sm:text-center text-7xl max-w-[20ch]"
          />
          <RichText
            text={slice.primary.description1}
            className="font-ambit-regular text-black sm:text-center text-lg w-full max-w-[60ch]"
          />
          <RichText
            text={slice.primary.description2}
            className="font-ambit-regular text-black sm:text-center text-lg w-full max-w-[60ch]"
          />
        </div>

        {/* Top left image */}
        <div className="hidden xl:block absolute -top-[50%] left-[10%]  md:h-[280px] md:w-[120px] lg:h-[350px] w-[200px]  lg:w-[200px] xl:w-[200px] -z-10">
          <PrismicNextImage
            field={slice.primary.image_a}
            className="h-full w-full object-contain"
            height={1800}
            width={1800}
          />
        </div>

        {/* Bottom right image */}
        <div className="hidden xl:block absolute -bottom-[10px] -right-[20px]  md:h-[260px] md:w-[350px] lg:h-[400px] w-[300px]  lg:w-[200px] -z-10">
          <PrismicNextImage
            field={slice.primary.image_b}
            className="h-full w-full object-contain"
            height={1800}
            width={1800}
          />
        </div>
      </section>
    );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative mb-24"
    >
      <div className="orange-gradient absolute -top-36 left-0 h-96 w-full -z-10" />
      <div className="flex flex-col items-center justify-center space-y-12 mt-40">
        <RichText
          text={slice.primary.main_title}
          className="font-playfair-display text-deep-green sm:text-center text-7xl max-w-[40ch]"
        />
        <div className="flex flex-col sm:items-center sm:justify-center space-y-2">
          <RichText
            text={slice.primary.sub_title}
            className="font-ambit-regular text-deep-green w-[90%] max-w-[60ch] sm:text-center text-4xl"
          />
          <RichText
            text={slice.primary.description}
            className="font-ambit-regular text-deep-green sm:text-center text-lg w-full  max-w-[60ch]"
          />
        </div>
      </div>
      <div className="border border-[#E0DDD3] w-full md:w-[90%] mx-auto mt-14 relative py-24 overflow-hidden">
        <div className="absolute -top-[180px] -left-[190px] h-[530px] w-[530px] rotate-[140deg] -z-10">
          {!slice.primary.isanimatedicon ? (
            <PrismicNextImage
              field={slice.primary.image_a}
              className="h-full w-full object-contain"
              height={1800}
              width={1800}
            />
          ) : slice.primary.animated_icon_a_json_format ? (
            <Lottie animationData={LottieDataA} />
          ) : null}
        </div>
        <div className="flex flex-col items-center justify-center space-y-6 py-44 sm:py-0">
          <RichText
            text={slice.primary.card_title}
            className="text-deep-green font-ambit-regular text-center text-3xl w-[92%] max-w-[20ch]"
          />
          <RichText
            text={slice.primary.card_description}
            className="text-deep-green font-ambit-regular text-center text-xl w-[84%] max-w-[36ch]"
          />
        </div>
        <div className="absolute -bottom-[180px] -right-[190px] h-[530px] w-[530px] -rotate-45 -z-10">
          {!slice.primary.isanimatedicon ? (
            <PrismicNextImage
              field={slice.primary.image_b}
              className="h-full w-full object-contain"
              height={1800}
              width={1800}
            />
          ) : slice.primary.animated_icon_b_json_format ? (
            <Lottie animationData={LottieDataB} />
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default FlagshipHero;
