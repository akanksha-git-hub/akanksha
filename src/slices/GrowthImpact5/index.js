import HeadingAndDescription from "@/components/v2-components/HeadingAndDescription";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.GrowthImpact5Slice} GrowthImpact5Slice
 * @typedef {import("@prismicio/react").SliceComponentProps<GrowthImpact5Slice>} GrowthImpact5Props
 * @param {GrowthImpact5Props}
 */
const GrowthImpact5 = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="flex flex-col lg:flex-row items-center justify-between space-x-6  py-6 w-full ">
  {/* Left Section */}
  <div className="flex flex-col lg:flex-row items-center lg:items-start">
    {/* Growth Box */}
   
  </div>

  {/* Middle Section */}
  <div className="flex flex-col items-start justify-center min-h-[250px] mt-6 lg:mt-0 w-full  ">
  <HeadingAndDescription
        heading=   {slice.primary.card_1_title}
     
        iconField={slice.primary.icon_2}
      />
    <p className="text-lg xl:text-2xl font-ambit-regular  ">
      {slice.primary.card_2_title}
    </p>
    {/* Roles */}
    
    <p className="text-xl font-ambit-regular text-black text-center lg:text-left ">
      {slice.primary.card_2_description}
    </p>
  </div>

  {/* Right Section */}
  <div className="relative mt-6 lg:mt-0 w-full lg:w-auto flex justify-center lg:justify-end">
    <PrismicNextImage
      field={slice.primary.asset}
      className="max-w-[300px] max-h-[300px] object-cover"
      alt="Card Image"
    />
  </div>
</div>

    </section>
  );
};

export default GrowthImpact5;
