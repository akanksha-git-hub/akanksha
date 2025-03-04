import SliceIdentifier from "@/components/SliceIdentifier";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicImage } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.GrowthImpactSlice} GrowthImpactSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<GrowthImpactSlice>} GrowthImpactProps
 * @param {GrowthImpactProps}
 */
const GrowthImpact = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" mt-10"
    >
      <SliceIdentifier text={slice.primary.slice_identifier} />
      <h1 className="font-ambit-regular text-3xl md:text-6xl text-center mt-10 ">
        {slice.primary.title}
      </h1>
      <div className="flex flex-col lg:flex-row bg-[#ECF0F1] rounded-lg p-12 mt-8 xl:max-h-[600px] w-full">
        <div className="w-[100%] lg:w-[50%] flex flex-col">
          <h1 className="font-ambit-regular text-black text-5xl md:text-7xl w-[2ch] ">
            {slice.primary.card_1_title}
          </h1>
          <p className="font-ambit-regular text-lg  md:text-3xl w-[20ch] mt-auto">
            {slice.primary.card_1_description}
          </p>
        </div>
        <div className="w-[100%] lg:w-[50%] flex flex-col ">
          <PrismicNextImage
            height={300}
            width={300}
            loading="eager"
            field={slice.primary.card_1_image}
            className="h-full w-full object-cover"
            alt="growth image"
          />
        </div>
      </div>
    </section>
  );
};

export default GrowthImpact;
