import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.GrowthImpact3Slice} GrowthImpact3Slice
 * @typedef {import("@prismicio/react").SliceComponentProps<GrowthImpact3Slice>} GrowthImpact3Props
 * @param {GrowthImpact3Props}
 */
const GrowthImpact3 = ({ slice }) => {
  return (
   <section
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className="mt-6"
       >
         <div className="flex lg:flex-row flex-col lg:space-x-6  min-h-[350px]">
         <div className="flex flex-col bg-[#ECF0F1] rounded-lg p-8 items-center justify-between lg:w-[40%] w-full relative">
      {/* Description */}
      <div className="w-full flex flex-col">
        <h1 className="font-ambit-regular text-black text-lg xl:text-2xl text-left xl:w-[12ch]">
          {slice.primary.card_1_description}
        </h1>
      </div>

      {/* Chart Section */}
      <div className="w-full flex flex-row mt-0 space-x-2 justify-center items-end h-[220px] mx-auto">
  {/* First Chart */}
  <div className="flex flex-col items-center justify-end w-full h-full relative max-w-[250px]">
    <span className="text-3xl xl:text-5xl font-ambit-regular text-black mb-2">{slice.primary.percentage_1}</span>
    <div className="w-full bg-[#58BCD4]  relative flex items-end justify-center p-4" style={{ height: "40%" }}>
      <span className="text-xl xl:text-3xl font-ambit-regular text-black absolute">{slice.primary.chart_description_1}</span>
    </div>
  </div>

  {/* Second Chart */}
  <div className="flex flex-col items-center justify-end w-full h-full relative max-w-[250px]">
    <span className="text-3xl xl:text-5xl font-ambit-regular text-black mb-2">{slice.primary.percentage_2}</span>
    <div className="w-full bg-[#F4456E]  relative flex items-end justify-center p-4 " style={{ height: "80%" }}>
      <span className="text-xl xl:text-3xl  font-ambit-regular text-black absolute">{slice.primary.chart_description_2}</span>
    </div>
  </div>
</div>



    </div>
    <div className="flex flex-col lg:flex-row  lg:mt-0 mt-6 lg:w-[60%] w-full relative  ">
      {/* Left Section (Image) */}
      <div className="w-full lg:w-[50%] flex flex-col items-center justify-center ">
        <PrismicNextImage 
          field={slice.primary.card_2_asset} 
          className="max-w-[300px] max-h-[300px]   object-cover"
          alt={"Card Image"}
        />
      </div>

      {/* Right Section (Title, Secondary Title, and Description) */}
      <div className="w-full lg:w-[50%] flex flex-col justify-center space-y-4 items-left  xl:p-6 ">
        {/* Title */}
        <h1 className="font-ambit-regular text-left text-black text-4xl xl:text-7xl">
          {slice.primary.card_2_title}
        </h1>

        {/* Secondary Title */}
        <h2 className="font-ambit-regular text-left text-black text-xl xl:text-3xl">
          {slice.primary.card_2_small_title}
        </h2>

        {/* Description */}
        <p className="font-ambit-regular text-base xl:text-xl text-black text-left">
          {slice.primary.card_2_description}
        </p>
      </div>
    </div>
         </div>
       </section>
  );
};

export default GrowthImpact3;
