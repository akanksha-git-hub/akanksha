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
      <div className="flex  lg:flex-row flex-col lg:space-x-4 justify-between  items-stretch mt-4  min-h-[250px]    ">
      <div className="flex flex-col  p-8 lg:w-[55%] w-full relative border-[0.15rem] border-black md:hover:bg-v2-yellow mt-4 lg:mt-0 space-y-4 ">
  {/* Top Section: Card Heading and Description */}
  <div className="flex flex-col justify-between items-center h-full">
  <div className="flex flex-row items-start  min-h-[180px] ">
    <h1 className="font-ambit-regular text-5xl text-left">
      {slice.primary.card_1_heading}
    </h1>
    <p className="font-ambit-regular text-[1.35rem] mt-4 w-full">
      {slice.primary.card_1_description}
    </p>
  </div>

  {/* Bottom Section: Marquee */}
  <div className="flex flex-wrap justify-around gap-4 mt-4">
    <MarqueeNew data={data} />
  </div>
  </div>
</div>

<div className="flex flex-col p-8 lg:w-[45%] w-full relative border-[0.15rem] border-black md:hover:bg-v2-yellow mt-4 lg:mt-0 space-y-4">
  
  
<div className="flex flex-col justify-around items-start h-full w-full" >
  <div className="relative w-full h-14 md:w-full md:h-44 ">
              <PrismicNextImage
                field={slice.primary.card_2_image}
                fill
                style={{ objectFit: 'contain' }}
                alt={slice.primary.card_2_image?.alt || 'Icon'}
              />
            </div>
            <div>
<p className="font-ambit-regular text-black text-[1.35rem] lg:text-left">
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
