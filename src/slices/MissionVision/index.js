import RichText from "@/components/Texts/RichText";
import SliceIdentifier from "@/components/SliceIdentifier";
import PrimaryCTA from "@/components/UI/Button/PrimaryCTA";
import MixedText from "@/components/Texts/MixedText";
import VideoModal from "@/components/VideoModal";
import { spanPosition } from "@/utils/helperClasses";
/**
 * @typedef {import("@prismicio/client").Content.MissionVisionSlice} MissionVisionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MissionVisionSlice>} MissionVisionProps
 * @param {MissionVisionProps}
 */
const MissionVision = ({ slice }) => {

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`universal-padding mt-6 ${slice.variation === 'doubleCtaComponent' && 'mb-36'}`}
    >
      {!slice.variation === 'doubleCtaComponent' && (
        <SliceIdentifier 
          text={slice.primary.slice_identifier}
        />
      )}
      <div className={`flex flex-col items-end gap-12 mt-12 lg:mt-16 ${slice.variation === "reverseVideoComponet" ? 'lg:flex-row-reverse':'lg:flex-row'}`}>
        <VideoModal className="hidden lg:flex" slice={slice} />
        <div className="w-full flex flex-col items-center justify-center lg:items-start lg:justify-normal lg:w-2/4">
          <RichText 
            className="font-ambit-regular text-deep-green uppercase"
            text={slice.primary.slice_identifier}
          />
          {/* <MixedText 
            className="
            text-deep-green font-ambit-regular text-center leading-[1] text-5xl w-full 
              sm:w-3/4 justify-center
              lg:text-left lg:items-start lg:justify-normal
              md:w-full lg:w-3/4
              xl:text-[58px] 
              2xl:text-[60px]
              3xl:text-8xl 3xl:mt-2"
            spanPosition={spanPosition}
            texts={slice.primary.title}
            index={1}
          /> */}
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
            {slice.variation === 'doubleCtaComponent' && (
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
