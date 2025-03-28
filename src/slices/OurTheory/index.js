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
      
<div className="relative mx-auto bg-[#F4456E] font-ambit-regular text-white text-[1.35rem] max-w-[50%] mt-14 h-full px-12 py-6  " >
<PrismicRichText  field={slice.primary.description} />
<div className="absolute  top-1/2 -translate-y-1/2 left-0 z-10 ">
<Image
  src="/quote-left.png" 
  alt="quote icon"
  width={15}
  height={60}
  className="object-cover h-auto"
/>
        </div>
</div>

        <div className="absolute h-[45%] w-[45%] top-[15%] left-32 -z-10 ">
          <PrismicNextImage
            height={1000}
            width={1000}
            field={slice.primary.asset_1}
            alt=""
          />
        </div>
        <div className="absolute h-[18%] w-[18%] top-[50%] right-64 -z-10 ">
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

