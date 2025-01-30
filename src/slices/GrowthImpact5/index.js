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
       <div className="flex items-center justify-between  px-8 py-6 w-full">
      {/* Left Section */}
      <div className="flex items-center space-x-6">
        {/* Growth Box */}
        <div className="bg-[#FBDA1D] text-black p-8 rounded-[80px] flex items-center justify-center min-h-[300px] ">
          <p className="text-left text-6xl font-ambit-regular">
            {slice.primary.card_1_title}<br />
            <p className="text-2xl font-ambit-regular mt-4">{slice.primary.card_1_description}</p>
          </p>
        </div>
        {/* Text */}
        <div className="flex flex-col items-start justify-around  min-h-[300px] ">
          <p className="text-4xl font-ambit-regular w-[16ch] ">
           {slice.primary.card_2_title}
          </p>
          {/* Roles */}
          <div className="flex items-end space-x-4 mt-2 justify-center   ">
            <span className="bg-[#55BBD3] text-black px-8 py-4 rounded-full text-xl">
             {slice.primary.role_1}
            </span>
            <span className="bg-[#FBDA1D] text-black px-8 py-4 rounded-full text-xl">
              {slice.primary.role_2}
            </span>
            <span className="bg-[#F6AC27] text-black px-8 py-4 rounded-full text-xl">
              {slice.primary.role_3}
            </span>
          </div>
         
          <p className="text-xl font-ambit-regular text-black ">{slice.primary.card_2_description}</p>
          
        </div>
      </div>
      {/* Right Section */}
      <div className="relative">
         <PrismicNextImage
                    field= {slice.primary.asset} 
                    className="max-w-[300px] max-h-[300px] object-cover"
                    alt={"Card Image"}
                  />
       
      </div>
    </div>
    </section>
  );
};

export default GrowthImpact5;
