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
      className=" mt-0"
    >
      <SliceIdentifier text={slice.primary.slice_identifier} />
      <h1 className="font-ambit-regular text-3xl md:text-6xl text-center mt-14 ">
        {slice.primary.title}
      </h1>
      <div className="flex flex-col lg:flex-row bg-[#ECF0F1]  rounded-lg   pt-2  mt-14   w-full ">
        <div className="w-[100%] lg:w-[60%] flex flex-col px-12 py-14 justify-evenly  ">
          <h1 className="font-ambit-regular text-black text-4xl xl:text-7xl w-[2ch] ">
            {slice.primary.card_1_title}
          </h1>
          <p className="font-ambit-regular text-lg xl:text-2xl xl:w-[20ch] ">
            {slice.primary.card_1_description}
          </p>
        </div>
        <div className="w-[100%] lg:w-[40%] flex flex-col h-full justify-end px-6   ">
          <PrismicNextImage
            height={200}
            width={200}
            loading="eager"
            field={slice.primary.card_1_image}
            className=" w-full h-[350px] object-fill "
            alt="growth image"
          />
        </div>
      </div>
    </section>
  );
};

export default GrowthImpact;
