import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.ImpactPointsSlice} ImpactPointsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImpactPointsSlice>} ImpactPointsProps
 * @param {ImpactPointsProps}
 */
const ImpactPoints = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
   className="universal-padding " >
       <div className="flex lg:flex-row flex-col lg:space-x-6  min-h-[300px]  ">
                 <div className="flex flex-col bg-[#ECF0F1] rounded-lg p-8 items-center justify-between lg:w-[50%] w-full relative">
             
              <div className="w-full h-full flex flex-col justify-around items-start  ">
                <h1 className="font-ambit-regular text-black text-5xl md:text-7xl lg:text-8xl text-left ">
                  {slice.primary.card_1_heading}
                </h1>
                <h1 className="font-ambit-regular text-black text-[1.35rem] w-[70%]   md:text-left  leading-snug">
                  {slice.primary.card_1_description}
                </h1>
              </div>
        
            
              
        
          
          
                
              
            
              <PrismicNextImage
                  field= {slice.primary.asset_1} 
                  height={220}
                  width={220}
                  className=" h-[80px] w-[80px] md:h-[200px] md:w-[200px] absolute right-0 top-0 object-cover"
                  alt={"Card Image"}
                />
               
             
          
        
      
          
        
        
        
        
            </div>
            <div className="flex flex-col lg:flex-row bg-[#ECF0F1] rounded-lg p-8  lg:mt-0 mt-6 lg:w-[50%] w-full relative ">
      {/* Left Section (Image) */}
      <div className="w-full lg:w-[50%] flex flex-col items-center justify-center  ">
        <PrismicNextImage 
          field={slice.primary.asset_2} 
          width={300}
          height={300}
          className=" w-[180px] h-[180px] md:h-[220px] md:w-[220px]  object-cover"
          alt={"Card Image"}
        />
      </div>

      {/* Right Section Title and Description) */}
      <div className="w-full lg:w-[50%] flex flex-col justify-around items-left  space-y-4 p-6 ">
        {/* Title */}
        <h1 className="font-ambit-regular text-left text-black text-4xl md:text-8xl">
          {slice.primary.card_2_heading}
        </h1>

       
        {/* Description */}
        <h2 className="font-ambit-regular text-left text-black text-[1.35rem]">
          {slice.primary.card_2_description}
        </h2>

        
      </div>
    </div>
                 </div>
    </section>
  );
};

export default ImpactPoints;
