import MarqueeNew from "@/components/MarqueeNew";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.ImpactMarqueeSlice} ImpactMarqueeSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImpactMarqueeSlice>} ImpactMarqueeProps
 * @param {ImpactMarqueeProps}
 */
const ImpactMarquee = ({ slice }) => {
  const data = slice.primary.universities;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex  xl:flex-row flex-col xl:space-x-4 justify-between  items-stretch mt-4  min-h-[250px]    ">
      <div className="flex flex-col  p-8 xl:w-[55%] w-full relative border-[0.15rem] border-black md:hover:bg-v2-yellow mt-4 lg:mt-0 space-y-4 ">
  {/* Top Section: Card Heading and Description */}
  <div className="flex flex-col justify-between items-center h-full  overflow-hidden">
  <div className="flex flex-col md:flex-row items-start  min-h-[180px] ">
    <h1 className="font-ambit-regular text-5xl text-left">
      {slice.primary.card_1_heading}
    </h1>
    <p className="font-ambit-regular text-[1.35rem] mt-4 w-full">
      {slice.primary.card_1_description}
    </p>
  </div>

  {/* Bottom Section: Marquee */}
  <div className="flex flex-wrap justify-around gap-4 mt-4  ">
    <MarqueeNew data={data} />
  </div>
  </div>
</div>

<div className="flex flex-col p-8 xl:w-[45%] w-full relative border-[0.15rem] border-black md:hover:bg-v2-yellow mt-4 xl:mt-0 space-y-4">
  
  
<div className="flex flex-col justify-start items-start h-full w-full ">
  {/* Image container aligned to left */}
  <PrismicNextImage
                                field={slice.primary.card_2_image}
                                className=" h-full w-full object-cover"
                            />

  {/* Paragraph aligned to left edge */}
  <div className="w-full  mt-4 ">
    <p className="font-ambit-regular text-black  text-lg md:text-[1.35rem] text-left">
      {slice.primary.card_2_description}
    </p>
  </div>
</div>

  
              
                  
                  
                  
                  </div>
</div>

    </section>
  );
};

export default ImpactMarquee;
