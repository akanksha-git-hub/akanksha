import SliceIdentifier from "@/components/SliceIdentifier";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.SwirlImageSlice} SwirlImageSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SwirlImageSlice>} SwirlImageProps
 * @param {SwirlImageProps}
 */
const SwirlImage = ({ slice }) => {
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
      <div className="md:h-[600px] w-full ">
        <PrismicNextImage 
          className="h-full w-full object-contain"
          height={2200}
          width={2200}
          field={slice.primary.image}
        />
      </div>
    </section>
  );
};

export default SwirlImage;
