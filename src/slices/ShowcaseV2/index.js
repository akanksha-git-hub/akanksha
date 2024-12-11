import ImageSwiper from "@/components/ImageSwiper";
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";
import Button from "@/components/v2-components/buttons/button";

/**
 * @typedef {import("@prismicio/client").Content.ShowcaseV2Slice} ShowcaseV2Slice
 * @typedef {import("@prismicio/react").SliceComponentProps<ShowcaseV2Slice>} ShowcaseV2Props
 * @param {ShowcaseV2Props}
 */
const ShowcaseV2 = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding mt-4"
    >
      <SliceIdentifier 
        text={slice.primary.slice_identifier}
      />
      <div className="flex flex-col lg:flex-row lg:items-center justify-between py-12 lg:py-24">
        <div className="grid space-y-8">
          <RichText 
            text={slice.primary.title}
            className="font-ambit-regular text-deep-green text-5xl md:text-6xl max-w-[14ch] tracking-tight"
          />
          <Button
            prismicLink={slice.primary.cta_link}
          >
            {slice.primary.cta_text}
          </Button>
        </div>
        <div className="mt-12 w-full lg:mt-0 lg:w-[52%]">
          <ImageSwiper 
            data={slice.primary.images}
          />
        </div>
      </div>
    </section>
  );
};

export default ShowcaseV2;
