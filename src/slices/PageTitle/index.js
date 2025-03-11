import SliceIdentifier from "@/components/SliceIdentifier";
import MixedText from "@/components/Texts/MixedText";
import RichText from "@/components/Texts/RichText";
import { spanPosition } from "@/utils/helperClasses";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";
import PinkHeart from "@/assets/pink-heart.svg";
import SparkleMedium from "@/components/Sparkles/sparkle-medium";

/**
 * @typedef {import("@prismicio/client").Content.PageTitleSlice} PageTitleSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PageTitleSlice>} PageTitleProps
 * @param {PageTitleProps}
 */
const PageTitle = ({ slice }) => {
  if (slice.variation === "optionC") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="my-12 space-y-16"
      >
        <SliceIdentifier text={slice.primary.slice_identifier} />
        <div className="space-y-6">
          <MixedText
            index={5}
            texts={slice.primary.title}
            className="font-ambit-regular text-black text-5xl text-left sm:text-6xl xl:text-7xl 3xl:text-8xl md:text-center max-w-[40ch] mx-auto md:justify-center"
            spanPosition="top-2 sm:top-[6px]"
          />
          <RichText
            text={slice.primary.description}
            className="font-ambit-regular text-black 3xl:text-2xl sm:text-xl text-lg md:text-center max-w-[80ch] mx-auto"
          />
        </div>
      </section>
    );
  }
  if (slice.variation === "optionD") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="my-12 space-y-16"
      >
        <SliceIdentifier text={slice.primary.slice_identifier} />
        <div className="space-y-6">
          <MixedText
            texts={slice.primary.title}
            className="font-ambit-regular text-black text-5xl md:text-7xl text-left md:text-center max-w-[15ch]  md:justify-start"
          />
          <RichText
            text={slice.primary.description}
            className="font-ambit-regular text-black text-lg     "
          />
        </div>
      </section>
    );
  }
  return (
    <>
      <div className="universal-padding">
        <SliceIdentifier text={slice.primary.slice_identifier} />
      </div>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={`flex flex-col items-center ${slice.variation === "default" && "universal-padding mt-14"} pt-8 md:pt-10`}
      >
        {/* {slice.variation === 'sparkle' && (
        <div 
          className="flex items-center justify-center w-full md:w-[50vw] max-w-[650px] relative left-0 md:left-16"
        >
          <PrismicNextImage 
            field={slice.primary.image}
            height={100}
            width={100}
            className="h-full w-full"
          />
        </div>
      )} */}
        <div
          className={`flex flex-col items-center ${slice.variation === "sparkle" && "universal-padding"} !pt-0 space-y-8`}
        >
          <div className="space-y-2 w-full flex flex-col md:items-center relative">
          <Image src={PinkHeart} height={100} width={100} alt="heart" />
            <RichText
              text={slice.primary.title}
              className={`text-black xl:text-7xl sm:text-6xl font-ambit-regular text-5xl ${slice.variation === "sparkle" ? "text-left" : "text-center"} md:text-center w-full sm:w-[70%]`}
            />
            {/* <SparkleMedium 
            className="absolute -z-10 -top-[70%] md:-top-32 -left-1/4 w-full h-full scale-[0.2] md:scale-[0.4]"
          />
          <SparkleMedium 
            className="absolute -z-10 -top-32 -right-44 w-full h-full scale-[0.2]"
          />
          <SparkleMedium 
            className="absolute -z-10 top-0 -right-[20%] w-full h-full scale-[0.2]"
          /> */}
            {/* TODO Change Heart Image to prismic later */}
           
          </div>
          <div
            className={`relative text-black sm:text-xl 3xl:text-2xl font-ambit-regular text-lg text-left md:text-center ${slice.variation === "default" ? "w-full lg:w-[70%] xl:w-[70ch]" : "w-full lg:w-[80%] 3xl:w-[110ch]"}`}
          >
            {/* <div className="orange-gradient absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 -z-20 h-full w-full"></div> */}
            <PrismicRichText field={slice.primary.description} />
          </div>
        </div>
      </section>
    </>
  );
};

export default PageTitle;
