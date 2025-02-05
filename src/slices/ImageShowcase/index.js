import Marquee from "@/components/Marquee";
import PartnerLogo from "@/components/PartnerLogo";

/**
 * @typedef {import("@prismicio/client").Content.ImageShowcaseSlice} ImageShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImageShowcaseSlice>} ImageShowcaseProps
 * @param {ImageShowcaseProps}
 */
const ImageShowcase = ({ slice }) => {
  const marqueeASliceEnd = Math.floor(slice.primary.images.length / 2);

  const feedMarqueeDataA = slice.primary.images.slice(
    0,
    marqueeASliceEnd
  );
  const feedMarqueeDataB = slice.primary.images.slice(
    marqueeASliceEnd,
    slice.primary.images.length
  );
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      mt-8
    >
          <Marquee slice={feedMarqueeDataA} noHoverEffect/>
                <Marquee slice={feedMarqueeDataB} isRight noHoverEffect />
                <Marquee slice={feedMarqueeDataA} noHoverEffect/>
               
      {/* {slice.primary.images && (
        <ul className=" flex flex-wrap w-full ">
          {slice.primary.images.map((image, index) => (
            <>
            <PartnerLogo
              image={image.image}
              key={index}
              imageClassName=" h-[55%] w-[55%] md:h-[80%] md:w-[80%]  object-contain"
              className="flex items-center justify-center border border-[#DCDCDC] sm:mb-0 h-[10rem] w-full sm:h-[8rem] md:w-[30%] lg:w-[20%]"
            />
         
            </>
          ))}
        </ul>
      )} */}
    </section>
  );
};

export default ImageShowcase;
