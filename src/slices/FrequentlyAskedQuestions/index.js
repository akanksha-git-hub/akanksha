import Faq from "@/components/Faq";
import ImageSwiper from "@/components/ImageSwiper";
import SliceIdentifier from "@/components/SliceIdentifier";

/**
 * @typedef {import("@prismicio/client").Content.FrequentlyAskedQuestionsSlice} FrequentlyAskedQuestionsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FrequentlyAskedQuestionsSlice>} FrequentlyAskedQuestionsProps
 * @param {FrequentlyAskedQuestionsProps}
 */
const FrequentlyAskedQuestions = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding"
    >
      <SliceIdentifier 
        text={slice.primary.slice_identifier}
      />
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mt-12 xl:mt-36">
        {/* FAQ Content */}
        <div className="w-full xl:w-[45%]">
          <Faq 
            title={slice.primary.title}
            index={1}
            className="w-full"
            dataItems={slice.primary.faq}
            titleClassName="text-deep-green text-left md:w-[28.3rem] text-7xl"
          />
        </div>
        {/* Image Content [Interaction] */}
        <div className="w-full mt-16 xl:mt-0 xl:w-[45%]">
          <ImageSwiper 
            data={slice.primary.images}
          />
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestions;
