"use client";
import RichText from "@/components/Texts/RichText";
import RichTextRenderer from "@/components/v2-components/RichTextRenderer";
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
        className="relative  "
      >
        <div className="flex flex-col items-start md:items-center justify-center space-y-12 mt-4 md:mt-14 xl:mt-4">
          <RichTextRenderer
  field={slice.primary.main_title_new}
  className="font-ambit-regular text-black text-left md:text-center text-3xl md:text-6xl max-w-[15ch]"
/>

         <RichTextRenderer
  field={slice.primary.description1_new}
  className="font-ambit-regular text-black sm:text-center w-full max-w-[60ch] text-[1.35rem] md:pt-14 xl:pt-0"
/>

         <RichTextRenderer
  field={slice.primary.description2_new}
  className="font-ambit-regular text-black sm:text-center w-full max-w-[60ch] text-[1.35rem]"
/>

        </div>

        <div
          className="hidden lg:block absolute -top-[10%] -left-[15px] md:-top-[8%] xl:top-[10%] md:-left-[100px] 
          h-[100px] w-[80px] sm:h-[150px] sm:w-[100px] md:h-[230px] md:w-[140px] xl:h-[350px] xl:w-[300px]  -z-10"
        >
          <PrismicNextImage
            field={slice.primary.image_a}
            className="h-full w-full object-contain"
            height={1800}
            width={1800}
          />
        </div>

        <div
          className="block absolute -bottom-[50px] -right-[24px] md:-bottom-[115px] xl:-bottom-[80px] md:-right-[190px]
          h-[160px] w-[120px] sm:h-[180px] sm:w-[140px] md:h-[260px] md:w-[300px] xl:h-[400px] xl:w-[500px] -z-10"
        >
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
        className="relative universal-padding "
      >
        <div className="flex flex-col items-center justify-center space-y-12 mt-4 lg:mt-4">
        <RichTextRenderer
  field={slice.primary.main_title_new}
  className="font-ambit-regular text-black sm:text-center text-3xl md:text-6xl max-w-[20ch]"
/>
<RichTextRenderer
  field={slice.primary.description1_new}
  className="font-ambit-regular text-black sm:text-center text-xl w-full max-w-[60ch]"
/>

          {slice.primary.description2?.length > 0 && (
            <RichText
              text={slice.primary.description2}
              className="font-ambit-regular text-black sm:text-center text-xl w-full max-w-[60ch]"
            />
          )}
        </div>

        {/* Top left image */}
        <div className=" md:block hidden absolute top-[20%] md:-left-[6%] xl:left-[2%]  md:h-[280px] md:w-[120px] lg:h-[350px] w-[200px]  lg:w-[200px] xl:w-[340px] -z-10">
          <PrismicNextImage
            field={slice.primary.image_a}
            className="h-full w-full object-contain"
            height={1800}
            width={1800}
          />
        </div>

        {/* Bottom right image */}
        <div className="absolute -bottom-18 md:bottom-32 -right-4  xl:-bottom-[10px] xl:right-20  md:h-[260px] xl:h-[400px] w-[100px]  xl:w-[200px] -z-10">
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
