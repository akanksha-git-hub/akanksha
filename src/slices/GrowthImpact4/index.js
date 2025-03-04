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
            <div className="flex lg:flex-row flex-col lg:space-x-6  min-h-[400px]">
            <div className="flex flex-col bg-[#ECF0F1] rounded-lg p-6 items-center justify-between lg:w-[50%] w-full relative">
         {/* Description */}
         <div className="w-full flex ">
           <h1 className="font-ambit-semibold text-black text-5xl md:text-8xl text-center ">
             {slice.primary.card_1_heading}
           </h1>
         </div>
   
       
         
     {/* First Chart */}
     <div className="flex md:flex-row flex-col   md:items-end md:justify-between items-center justify-center mt-6 md:mt-0 w-full h-full  ">
     
           <h1 className="font-ambit-semibold text-black md:text-3xl text-xl md:w-[15ch]  md:text-left  leading-snug">
             {slice.primary.card_1_description}
           </h1>
         
       
         <PrismicNextImage 
             field= {slice.primary.card_1_asset} 
             className="max-w-[300px] max-h-[300px] object-cover"
             alt={"Card Image"}
           />
          
        
     </div>
   
 
     
   
   
   
   
       </div>
       <div className="flex flex-col bg-[#ECF0F1] rounded-lg p-6 mt-6  lg:mt-0  items-center justify-between lg:w-[50%] w-full relative">
         {/* Description */}
         <div className="w-full flex md:flex-row flex-col items-center justify-center md:items-end ">
           <h1 className="font-ambit-regular text-black text-5xl md:text-7xl text-left w-[8ch] ">
             {slice.primary.card_2_heading}
           </h1>
           <PrismicNextImage 
             field= {slice.primary.card_2_asset} 
             className="max-w-[300px] max-h-[300px] object-cover"
             alt={"Card Image"}
           />
         </div>
   
       
         
     {/* First Chart */}
     <div className="flex md:flex-row flex-col   md:items-end md:justify-between items-center justify-center mt-6 md:mt-0 w-full h-full  ">
     
           <p className="font-ambit-regular text-black md:text-3xl text-xl  md:text-left  leading-snug">
             {slice.primary.card_2_description}
           </p>
         
     
          
        
     </div>
   
 
     
   
   
   
   
       </div>
            </div>
          </section>
  );
};

export default GrowthImpact4;
