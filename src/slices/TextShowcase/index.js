import SliceIdentifier from "@/components/SliceIdentifier";
import MixedText from "@/components/Texts/MixedText";
import RichText from "@/components/Texts/RichText";
import { spanPosition } from "@/utils/helperClasses";
import Image from "next/image";

/**
 * @typedef {import("@prismicio/client").Content.TextShowcaseSlice} TextShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TextShowcaseSlice>} TextShowcaseProps
 * @param {TextShowcaseProps}
 */
const TextShowcase = ({ slice }) => {
  return (
    <div className="universal-padding">
      <SliceIdentifier
        text={slice.primary.slice_identifier}
        hasSpider={slice.primary.spider_image}
        isVisible={slice.primary.add_image}
      />
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="universal-padding flex flex-col md:items-center justify-start sm:mt-14 w-fit "
      >
        <div className="font-ambit-regular w-full text-5xl sm:w-[30rem] md:text-8xl md:w-[50rem]  text-black text-left justify-center md:text-center">
         
         <p>
          {slice.primary.title}
         </p>
          {/* <span>{slice.primary.title.split(" ")[0]}</span>
          <br />
          <span>{slice.primary.title.split(" ").slice(1).join(" ")}</span> */}
        </div>

        {/* <MixedText
          texts={slice.primary.title}
          // index={1}
          // spanPosition={spanPosition}
          className="font-ambit-regular w-full text-5xl sm:w-[30rem] sm:text-6xl lg:text-8xl lg:w-[50rem] text-deep-green justify-center"
        /> */}
        <Image
          src="/vector_line.svg"
          height={20}
          width={20}
          alt=""
          className="w-[86%]  md:w-[60%] mt-4  "
          style={{
            filter:
              "brightness(0) saturate(100%) invert(68%) sepia(75%) saturate(330%) hue-rotate(151deg) brightness(88%) contrast(88%)",
          }}
        />
      </section>
    </div>
  );
};

export default TextShowcase;
