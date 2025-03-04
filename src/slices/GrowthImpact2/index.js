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
      <div className="flex lg:flex-row flex-col lg:space-x-6  min-h-[250px]">
        <div className="flex flex-col  bg-[#ECF0F1] rounded-lg p-8 items-center justify-end  lg:w-[40%] w-full relative">
          <div className="w-[100%]  flex flex-col mt-10">
            <h1 className="font-ambit-regular text-black text-4xl xl:text-7xl w-[2ch] items-center">
              {slice.primary.card_1_percentage}
            </h1>
            <p className="font-ambit-regular text-lg  xl:text-3xl  ">
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
          <div className="w-full md:w-[60%]  flex flex-col items-left justify-between ">
            <h1 className="font-ambit-regular text-black text-4xl xl:text-7xl">
              {slice.primary.card_2_title}
            </h1>
            <p className="font-ambit-regular text-lg xl:text-2xl w-[18ch]">
              {slice.primary.card_2_description}
            </p>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-[40%] h-full flex flex-col items-right justify-center">
            {/* First Box */}
            <div className="w-full bg-[#FBDA1D] mt-6 md:mt-0 text-black text-center xl:py-10 py-4 px-6  flex flex-col items-center justify-center rounded-full">
              <h2 className="text-2xl xl:text-4xl font-bold">32%</h2>
              <p className="text-sm xl:text-lg">
                {slice.primary.card_2_button_1_description}
              </p>
            </div>

            {/* Second Box */}
            <div className="w-full bg-[#F4456E] text-black text-center xl:py-10 py-4 px-3 flex flex-col items-center justify-center rounded-full">
              <h2 className="text-2xl xl:text-4xl font-bold">
                {slice.primary.card_2_buttton_2_header}
              </h2>
              <p className="text-sm xl:text-lg">
                {slice.primary.card_2_button_2_description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthImpact2;
