import Faq from "@/components/Faq";
import SliceIdentifier from "@/components/SliceIdentifier";
import Image from "next/image";
import Drawing from "@/assets/drawing-A.png";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.FrequentlyAskedQuestionsSlice} FrequentlyAskedQuestionsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FrequentlyAskedQuestionsSlice>} FrequentlyAskedQuestionsProps
 * @param {FrequentlyAskedQuestionsProps}
 */
const FrequentlyAskedQuestions = ({ slice }) => {
  const { show_identifier, slice_identifier } = slice.primary;

  const RenderIdentifier = () =>
    show_identifier && <SliceIdentifier text={slice_identifier} />;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding"
    >
      <RenderIdentifier />
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between mt-12 xl:mt-20">
        <div className="w-full xl:w-[45%]">
          <Faq
            title={slice.primary.title}
            index={1}
            className="w-full"
            dataItems={slice.primary.faq}
            titleClassName="text-black font-ambit-regular text-left md:w-[28.3rem] text-5xl  md:text-7xl"
          />
        </div>
        <div className="w-full mt-12 xl:mt-0 xl:w-[45%] relative h-[22rem] md:h-[40rem] xl:h-[36rem]">
          <PrismicNextImage
            field={slice.primary.image}
            alt="drawing"
            className="object-cover xl:object-contain"
            fill
          />
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAskedQuestions;
