import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";

/**
 * @typedef {import("@prismicio/client").Content.OurTheorySlice} OurTheorySlice
 * @typedef {import("@prismicio/react").SliceComponentProps<OurTheorySlice>} OurTheoryProps
 * @param {OurTheoryProps}
 */
const OurTheory = ({ slice }) => {
   const { show_identifier, slice_identifier } = slice.primary;
    
      const RenderIdentifier = () =>
        show_identifier && <SliceIdentifier text={slice_identifier} />;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-14  relative"
    >
      <RenderIdentifier />

     
        {/* Separate div for title alignment */}
     
          <h1 className="text-3xl md:text-6xl font-ambit-regular text-left md:text-center mt-14">
            {slice.primary.title}
          </h1>
      
          <div className="relative mx-auto bg-[#F4456E] font-ambit-regular text-white text-[1.35rem] max-w-full sm:max-w-[90%] md:max-w-[80%]  xl:max-w-[50%] mt-14 min-h-[200px] px-6 sm:px-8 md:px-10 lg:px-12 py-8">
  <PrismicRichText field={slice.primary.description} />

  <div className="absolute top-1/2 -translate-y-1/2 left-0 sm:left-0 md:left-0 z-10">
    <Image
      src="/quote-left.png"
      alt="quote icon"
      width={15}
      height={60}
      className="object-cover h-auto"
    />
  </div>
</div>


        <div className="absolute hidden md:block md:h-[65%] md:w-[65%] md:top-[25%] md:-left-36 xl:h-[45%] xl:w-[45%] xl:top-[15%] xl:left-32 -z-10 ">
          <PrismicNextImage
            height={1000}
            width={1000}
            field={slice.primary.asset_1}
            alt=""
          />
        </div>
        <div className="absolute hidden md:block md:h-[30%] md:w-[30%] md:top-[55%] md:-right-12 xl:h-[18%] xl:w-[18%] xl:top-[50%] xl:right-64 -z-10 ">
          <PrismicNextImage
            height={1000}
            width={1000}
            field={slice.primary.asset_2}
            alt=""
          />
        </div>
      
    </section>
  );
};

export default OurTheory;

