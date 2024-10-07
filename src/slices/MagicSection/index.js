import DragInteraction from "@/components/DragInteraction";
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.MagicSectionSlice} MagicSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MagicSectionSlice>} MagicSectionProps
 * @param {MagicSectionProps}
 */
const MagicSection = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding"
    >
      <SliceIdentifier 
        text={slice.primary.slice_identifier}
        className="mb-6"
      />
      <RichText 
        text={slice.primary.text_showcase}
        className="text-deep-green text-8xl max-w-[10ch] font-ambit-regular my-12"
      />
      <PrismicNextImage 
        field={slice.primary.images[1].image}
        alt=""
        className="h-screen w-full object-cover"
        height={1000}
        width={1000}
      />
      {/* <DragInteraction 
        ctaLink={slice.primary.cta_link}
        ctaText={slice.primary.cta_text}
        images={slice.primary.images}
        sliceIdentifier={slice.primary.slice_identifier}
        text={slice.primary.text_showcase}
      /> */}
    </section>
  );
};

export default MagicSection;
