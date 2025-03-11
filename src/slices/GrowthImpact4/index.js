import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.GrowthImpact4Slice} GrowthImpact4Slice
 * @typedef {import("@prismicio/react").SliceComponentProps<GrowthImpact4Slice>} GrowthImpact4Props
 * @param {GrowthImpact4Props}
 */
const GrowthImpact4 = ({ slice }) => {
  return (
   <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="mt-6"
          >
            <div className="flex lg:flex-row flex-col lg:space-x-6  min-h-[300px] xl:min-h-[350px]">
            <div className="flex flex-col bg-[#ECF0F1] rounded-lg md:px-12  pt-14 px-6 items-center justify-between  lg:w-[50%] w-full relative overflow-hidden">
         {/* Description */}
         <div className="w-full  ">
           <h1 className="font-ambit-regular text-black text-4xl xl:text-5xl w-[10ch] mr-auto text-left ">
             {slice.primary.card_1_heading}
           </h1>
         </div>
   
       
         
     {/* First Chart */}
     <div className="flex md:flex-row flex-col   md:items-end md:justify-between items-center justify-center mt-6 md:mt-0 w-full h-full relative   ">
     
           <h1 className="font-ambit-regular text-black text-lg xl:text-2xl md:w-[15ch]  xl:text-left  leading-snug md:pb-6">
             {slice.primary.card_1_description}
           </h1>
         
       
         <PrismicNextImage 
             field= {slice.primary.card_1_asset} 
             className=" -right-40 -bottom-24 xl:min-w-[400px] xl:min-h-[300px] object-cover p-2 absolute"
             alt={"Card Image"}
           />
          
        
     </div>
   
 
     
   
   
   
   
       </div>
       <div className="relative flex flex-col justify-center bg-[#ECF0F1] rounded-lg p-6 mt-6 lg:mt-0 lg:w-[50%] w-full overflow-hidden">
  {/* Absolutely positioned image */}
  <div className="absolute -top-28 lg:-top-44 right-12 p-2">
    <PrismicNextImage 
      field={slice.primary.card_2_asset}
      className="lg:min-w-[350px] lg:min-h-[300px] max-w-[220px] max-h-[220px] object-cover"
      alt="Card Image"
    />
  </div>

  {/* Heading and description */}
  <div className=" w-full">
    <h1 className="font-ambit-regular text-black text-4xl xl:text-7xl text-left w-[5ch]">
      {slice.primary.card_2_heading}
    </h1>
    <p className="font-ambit-regular text-black text-lg xl:text-2xl leading-snug mt-2">
      {slice.primary.card_2_description}
    </p>
  </div>
</div>

            </div>
          </section>
  );
};

export default GrowthImpact4;
