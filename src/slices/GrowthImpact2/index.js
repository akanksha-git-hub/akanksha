import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.GrowthImpact2Slice} GrowthImpact2Slice
 * @typedef {import("@prismicio/react").SliceComponentProps<GrowthImpact2Slice>} GrowthImpact2Props
 * @param {GrowthImpact2Props}
 */
const GrowthImpact2 = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-6"
    >
      <div className="flex lg:flex-row flex-col lg:space-x-6  ">
        <div className="flex flex-col  bg-[#ECF0F1] rounded-lg py-14 px-8  lg:w-[40%] w-full relative  md:max-h-[270px] xl:max-h-max ">
          <div className="w-[100%]  flex flex-col items-left justify-evenly  min-h-[200px] ">
            <h1 className="font-ambit-regular text-black text-4xl xl:text-7xl w-[2ch] ">
              {slice.primary.card_1_percentage}
            </h1>
            <p className="font-ambit-regular text-lg xl:text-2xl  ">
              {slice.primary.card_1_description}
            </p>
          </div>
          <div className="absolute right-0 top-0">
            <PrismicNextImage
              height={300}
              width={300}
              loading="eager"
              field={slice.primary.card_1_asset}
              className="xl:h-36 xl:w-36 h-28 w-28 object-cover"
              alt="growth image"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row bg-[#ECF0F1] rounded-lg p-8 lg:mt-0 mt-6 lg:w-[60%]  w-full relative">
          {/* Left Section */}
          <div className="w-full md:w-[60%]  flex flex-col items-left justify-evenly ">
            <h1 className="font-ambit-regular text-black text-4xl xl:text-6xl">
              {slice.primary.card_2_title}
            </h1>
            <p className="font-ambit-regular text-lg xl:text-2xl w-[18ch]">
              {slice.primary.card_2_description}
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-[40%] h-full flex flex-col items-right justify-center">
            {/* First Box */}
          
            <PrismicNextImage
              height={300}
              width={300}
              loading="eager"
              field={slice.primary.card_2_image}
              className="xl:h-48 xl:w-72 mx-auto h-32 w-44   "
              alt="growth image"
            />
      
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthImpact2;
