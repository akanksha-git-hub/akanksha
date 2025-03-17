import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.ImpactPoint2Slice} ImpactPoint2Slice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImpactPoint2Slice>} ImpactPoint2Props
 * @param {ImpactPoint2Props}
 */
const ImpactPoint2 = ({ slice }) => {
  if (slice.variation === "impactPointAse") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="mt-6"
      >
        <div className="flex lg:flex-row flex-col lg:space-x-6 min-h-[300px] justify-stretch items-stretch ">
          <div className="flex flex-row bg-[#ECF0F1] rounded-lg p-6 items-center justify-between lg:w-[40%] w-full  ">
            <div className="w-full h-full flex flex-col justify-around items-start ">
              <h1 className="font-ambit-regular text-black text-5xl md:text-7xl text-left ">
                {slice.primary.card_1_title}
              </h1>
              <h1 className="font-ambit-regular text-black md:text-3xl text-xl lg:text-left ">
                {slice.primary.card_1_description}
              </h1>
            </div>
            <PrismicNextImage
              field={slice.primary.card_1_asset}
              height={150}
              width={150}
              className=" object-contain"
              alt={"Card Image"}
            />
          </div>
          <div className="flex flex-row bg-[#ECF0F1] rounded-lg p-6 items-center justify-between mt-8 lg:mt-0 lg:w-[40%] w-full ">
            <div className="w-full h-full flex flex-row justify-between items-center md:items-stretch space-x-2">
              {/* Percentage Box */}
              <span className="bg-[#FBDA1D] font-ambit-regular min-h-[150px] text-5xl md:text-7xl text-left text-black flex items-center justify-center rounded-[5rem] w-[40%] h-full">
                {slice.primary.percentage_box}
              </span>

              {/* Description Section */}
              <h1 className="font-ambit-regular text-black md:text-3xl text-xl flex-1 h-full flex items-center">
                {slice.primary.card_2_description}
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <PrismicNextImage
              field={slice.primary.asset}
              height={150}
              width={150}
              className=" w-[250px] h-[250px] "
              alt={"Card Image"}
            />
          </div>
        </div>
      </section>
    );
  }
  if (slice.variation === "impactVersion3") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="universal-padding"
      >
        <div className="flex lg:flex-row flex-col lg:space-x-6  min-h-[300px] justify-center items-stretch   ">
          <div className="flex flex-row bg-[#ECF0F1] rounded-lg md:p-12 p-8 items-center justify-between lg:w-[50%] w-full  ">
            <div className="w-full h-full flex flex-col justify-end items-start   ">
              <h1 className="font-ambit-semibold text-black text-5xl md:text-8xl text-left ">
                {slice.primary.card_1_title}
              </h1>
              <h1 className="font-ambit-regular text-black md:text-2xl text-xl   lg:text-left ">
                {slice.primary.card_1_description}
              </h1>
            </div>
            <PrismicNextImage
              field={slice.primary.card_1_asset}
              height={150}
              width={150}
              className="  w-[150px] h-[150px] md:w-[250px] md:h-[250px] object-contain"
              alt={"Card Image"}
            />
          </div>
          <div className="flex flex-row bg-[#ECF0F1] rounded-lg p-6 items-center justify-between mt-8 lg:mt-0 lg:w-[50%] w-full min-h-[150px]">
            <div className="w-full h-full flex flex-row justify-between items-center md:items-stretch space-x-2">
              {/* Percentage Box */}
              <span className="bg-[#FBDA1D] font-ambit-semibold  text-xl md:text-6xl text-center text-black flex items-center justify-center rounded-[5rem] px-2 py-6 md:px-0 md:py-0 w-[40%] h-full">
                {slice.primary.percentage_box}
              </span>

              {/* Description Section */}
              <h1 className="font-ambit-regular text-black lg:text-3xl text-xl flex-1 h-full flex items-center ">
                {slice.primary.card_2_description}
              </h1>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center">
            <PrismicNextImage
              field={slice.primary.asset}
              height={150}
              width={150}
              className=" w-[250px] h-[250px] "
              alt={"Card Image"}
            />
          </div>
        </div>
      </section>
    );
  }
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding"
    >
      <div className="flex lg:flex-row flex-col lg:space-x-6  min-h-[300px] justify-stretch items-stretch ">
        <div className="flex flex-row bg-[#ECF0F1] rounded-lg p-6 items-center justify-between lg:w-[40%] w-full  ">
          <div className="w-full h-full flex flex-col justify-around items-start ">
            <h1 className="font-ambit-regular text-black text-5xl md:text-7xl text-left ">
              {slice.primary.card_1_title}
            </h1>
            <h1 className="font-ambit-regular text-black md:text-2xl text-xl  lg:text-left ">
              {slice.primary.card_1_description}
            </h1>
          </div>
          <PrismicNextImage
            field={slice.primary.card_1_asset}
            height={150}
            width={150}
            className=" object-contain"
            alt={"Card Image"}
          />
        </div>
        <div className="flex flex-row bg-[#ECF0F1] rounded-lg p-6 items-center justify-between mt-8 lg:mt-0 lg:w-[40%] w-full">
          <div className="w-full h-full flex flex-col justify-around items-start ">
            <h1 className="font-ambit-regular text-black text-5xl lg:text-5xl text-left lg:w-[12ch] ">
              {slice.primary.card_2_title}
            </h1>

            <h1 className="font-ambit-regular text-black lg:text-2xl text-xl lg:w-[19ch]  lg:text-left ">
              {slice.primary.card_2_description}
            </h1>
          </div>

          <span className="bg-[#FBDA1D] text-black font-bold  px-8 py-5 rounded-full text-4xl">
            {slice.primary.percentage_box}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center">
          <PrismicNextImage
            field={slice.primary.asset}
            height={150}
            width={150}
            className=" w-[250px] h-[250px] "
            alt={"Card Image"}
          />
        </div>
      </div>
    </section>
  );
};

export default ImpactPoint2;
