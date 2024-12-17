import RichText from "@/components/Texts/RichText";
import SliceIdentifier from "@/components/SliceIdentifier";
import PrimaryCTA from "@/components/UI/Button/PrimaryCTA";
import MixedText from "@/components/Texts/MixedText";
import VideoModal from "@/components/VideoModal";
import { spanPosition } from "@/utils/helperClasses";
import Button from "@/components/v2-components/buttons/button";
import { PrismicImage } from "@prismicio/react";
import Image from "next/image";
import VideoModalv2 from "@/components/video-modal-v2";
import TextCTA from "@/components/UI/Button/TextCTA";
/**
 * @typedef {import("@prismicio/client").Content.MissionVisionSlice} MissionVisionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MissionVisionSlice>} MissionVisionProps
 * @param {MissionVisionProps}
 */
const MissionVision = ({ slice }) => {
  if (slice.variation === "optionF") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="my-24"
      >
        <SliceIdentifier text={slice.primary.slice_identifier} />
        <RichText
          text={slice.primary.title}
          className="flex items-center justify-center text-deep-green text-5xl md:text-center mt-12"
        />
        <VideoModal
          slice={slice}
          className="w-full xl:w-[90%] lg:h-[800px] xl:h-[700px] mx-auto mt-12"
          imageClassName="h-full"
        />
      </section>
    );
  }

  if (slice.variation === "optionD") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="universal-padding mt-0"
      >
        <div className={`flex flex-col items-start gap-12 mt-12`}>
          <div className="w-full flex flex-col items-center justify-center lg:items-start lg:justify-normal">
            <RichText
              className="font-ambit-regular text-deep-green uppercase"
              text={slice.primary.slice_identifier}
            />
            <RichText
              text={slice.primary.title}
              className="
              text-deep-green font-ambit-regular text-center text-5xl w-full
                sm:w-3/4 justify-center
                lg:text-left lg:items-start lg:justify-normal
                md:w-full lg:w-3/4
                xl:text-[58px]
                2xl:text-[60px]
                3xl:text-8xl mt-6"
            />
            <VideoModal
              descriptionText={slice.primary.description}
              className="flex w-full mt-8 lg:h-[600px] 3xl:h-[800px]"
              slice={slice}
            />
            <RichText
              className="font-inter text-deep-green text-center lg:text-left text-sm sm:text-lg w-[90%] mt-6"
              text={slice.primary.description}
            />
            <div className="flex items-center justify-center lg:justify-normal w-full mt-6">
              <Button prismiclink={slice.primary.cta_link}>
                {slice.primary.cta_text}
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (slice.variation === "v2") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="universal-padding mt-0"
      >
        <SliceIdentifier text={slice.primary.slice_identifier} />
        <div className="lg:grid lg:grid-cols-[auto,1fr,auto]  items-center mt-24">
          <div className="hidden lg:block h-full">
            <Image
              src="/arrowsectionvertical.png"
              alt="Left Decorative Arrow"
              width={100}
              height={100}
              className=" object-cover  sm:h-[380px] lg:h-[600px] 3xl:h-[800px] "
            />
          </div>

          {/* Video Modal */}
          <div className="flex flex-col items-center relative  ">
            <VideoModalv2
              className="flex  lg:h-[600px] 3xl:h-[800px]"
              slice={slice}
            />
          </div>
          <div className="hidden lg:block h-full">
            <Image
              src="/arrowsectionvertical.png"
              alt="Right Decorative Arrow"
              width={100}
              height={100}
              className="rotate-180  object-cover sm:h-[380px] lg:h-[600px] 3xl:h-[800px]  "
            />
          </div>
        </div>
      </section>
    );
  }
  if (slice.variation === "projectRise") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="universal-padding mt-0"
      >
        <SliceIdentifier text={slice.primary.slice_identifier} />

        <div className="relative w-full h-full p-6 md:p-14 mt-12 md:mt-24">
          {/* Background Image */}
          <PrismicImage
            field={slice.primary.bg_image}
            className="absolute inset-0 w-full h-full object-cover -z-10"
          />

          {/* Content Container */}
          <div className="flex flex-col xl:flex-row h-full">
            {/* Left Image (Hidden below 1300px) */}
            <div className="flex-1 relative transform transition-transform duration-500 sm:rotate-0 rotate-12 xl:block hidden">
              <PrismicImage
                field={slice.primary.left_image}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Center Images */}
            <div className="flex flex-col flex-1">
              <div className="flex-1">
                <PrismicImage
                  field={slice.primary.center_image_1}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 bg-black text-white flex flex-col items-center justify-center p-4">
                <h2 className=" font-ambit-regular text-4xl md:text-7xl font-semibold mb-4">
                  {slice.primary.title}
                </h2>

                <p className="text-center text-sm md:text-lg mb-6 md:mb-12 w-full md:w-[30ch] font-ambit-regular">
                  {slice.primary.description}
                </p>

                <div className="flex flex-col md:flex-row w-full justify-center items-center gap-6">
                  <Button className="w-full md:w-auto">Learn More</Button>
                  <TextCTA
                    hasUnderLine
                    className="font-inter text-sm md:text-base w-full md:w-auto"
                    bgColor="bg-white"
                    text="Donate"
                    textColor="text-white"
                  />
                </div>
              </div>
            </div>

            {/* Right Image (Hidden below 1300px) */}
            <div className="flex-1 relative transform transition-transform duration-500 sm:rotate-0 -rotate-12 xl:block hidden">
              <PrismicImage
                field={slice.primary.right_image}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`universal-padding mt-0 ${slice.variation === "doubleCtaComponent" && "mb-36"}`}
    >
      {!slice.variation === "doubleCtaComponent" && (
        <SliceIdentifier text={slice.primary.slice_identifier} />
      )}
      <div
        className={`flex flex-col items-end gap-12 mt-12 lg:mt-8 ${slice.variation === "reverseVideoComponet" ? "lg:flex-row-reverse" : "lg:flex-row"}`}
      >
        <VideoModal className="hidden lg:flex" slice={slice} />
        <div className="w-full flex flex-col items-center justify-center lg:items-start lg:justify-normal lg:w-2/4">
          <RichText
            className="font-ambit-regular text-deep-green uppercase"
            text={slice.primary.slice_identifier}
          />
          <RichText
            text={slice.primary.title}
            className="
            text-deep-green font-ambit-regular text-center text-5xl w-full 
              sm:w-3/4 justify-center
              lg:text-left lg:items-start lg:justify-normal
              md:w-full lg:w-3/4
              xl:text-[58px] 
              2xl:text-[60px]
              3xl:text-8xl 3xl:mt-2"
          />
          <VideoModal className="flex w-full mt-8 lg:hidden" slice={slice} />
          <RichText
            className="font-inter text-deep-green text-center lg:text-left text-sm 3xl:text-lg w-[90%] mt-8"
            text={slice.primary.description}
          />
          <div className="flex flex-wrap gap-4 w-full mt-6 xl:mt-10 3xl:mt-14">
            <PrimaryCTA
              link={slice.primary.cta_link}
              text={slice.primary.cta_text}
            />
            {slice.variation === "doubleCtaComponent" && (
              <PrimaryCTA
                link={slice.primary.cta_b_link}
                text={slice.primary.cta_b_text}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
