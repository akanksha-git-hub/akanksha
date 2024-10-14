import PartnerLogo from "@/components/PartnerLogo";

/**
 * @typedef {import("@prismicio/client").Content.ImageShowcaseSlice} ImageShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImageShowcaseSlice>} ImageShowcaseProps
 * @param {ImageShowcaseProps}
 */
const ImageShowcase = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      {slice.primary.images && (
        <ul className="mt-8 flex flex-wrap w-full">
          {slice.primary.images.map((image, index) => (
            <PartnerLogo 
              image={image.image}
              key={index}
              imageClassName="h-[80%] w-[80%] object-contain"
              className="flex items-center justify-center border border-[#DCDCDC] sm:mb-0 h-[10rem] w-full sm:h-[8rem] md:w-[30%] lg:w-[20%]"              
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default ImageShowcase;
