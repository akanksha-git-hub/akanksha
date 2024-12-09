import RichText from "@/components/Texts/RichText";
import SliceIdentifier from "@/components/SliceIdentifier";
import PrimaryCTA from "@/components/UI/Button/PrimaryCTA";
import MixedText from "@/components/Texts/MixedText";
import VideoModal from "@/components/VideoModal";
import { spanPosition } from "@/utils/helperClasses";
import Button from "@/components/v2-components/buttons/button";
import { PrismicImage } from "@prismicio/react";
import Image from "next/image";
import VideoModalv2 from "@/components/v2-components/buttons/VideoMoadalv2";
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
        <div className="flex flex-row  items-center justify-center mt-12">
          <div className="hidden lg:block">
            <Image
              src="/arrowsectionvertical.png"
              alt="Left Decorative Arrow"
              className="mt-8"
              width={114}
              height={800}
            />
          </div>

          <div className="flex flex-col items-start gap-12  relative">
            <VideoModalv2
              className=" flex w-full mt-8 lg:h-[600px] 3xl:h-[800px] !rounded-none"
              slice={slice}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#FBDA1D3D] via-transparent to-[#12121287] z-20 mt-8 lg:h-[600px] 3xl:h-[800px]">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-30">
                <RichText
                  text={slice.primary.title}
                  className="text-white text-5xl font-ambit-regular mb-4 xl:text-[58px]
                2xl:text-[60px]
                3xl:text-8xl"
                />
                <div className="lg:w-[900px]">
                  <RichText
                    text={slice.primary.description}
                    className="text-white !text-3xl !sm:text-sm  mb-6 break-words"
                  />
                </div>
                <Button
                  prismiclink={slice.primary.cta_link}
                  className="px-8 py-4 
                !text-lg"
                >
                  {slice.primary.cta_text}
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <Image
              src="/arrowsectionvertical.png"
              alt="Left Decorative Arrow"
              className="rotate-180 mt-8"
              width={114}
              height={800}
            />
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
