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
    <div className="bg-[#FBDA1D] text-black  rounded-[80px] flex items-center justify-center min-h-[250px] min-w-52 lg:w-auto">
      <p className="text-left text-5xl xl:text-7xl font-ambit-regular">
        {slice.primary.card_1_title}
    
      </p>
    </div>
  </div>

  {/* Middle Section */}
  <div className="flex flex-col items-center justify-center min-h-[250px] mt-6 lg:mt-0 w-full  ">
    <p className="text-xl xl:text-4xl font-ambit-regular  ">
      {slice.primary.card_2_title}
    </p>
    {/* Roles */}
    <div className="flex flex-row flex-wrap justify-start   space-x-4  mt-2">
      <span className="bg-[#55BBD3] text-black px-8 py-4 rounded-full text-sm xl:text-xl mt-2 ">
        {slice.primary.role_1}
      </span>
      <span className="bg-[#FBDA1D] text-black px-8 py-4 rounded-full text-sm xl:text-xl mt-2 ">
        {slice.primary.role_2}
      </span>
      <span className="bg-[#F6AC27] text-black px-8 py-4 rounded-full text-sm xl:text-xl mt-2 ">
        {slice.primary.role_3}
      </span>
    </div>
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
