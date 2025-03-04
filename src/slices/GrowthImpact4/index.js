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
            <div className="flex flex-col bg-[#ECF0F1] rounded-lg p-6 items-center justify-between lg:w-[50%] w-full relative">
         {/* Description */}
         <div className="w-full  ">
           <h1 className="font-ambit-regular text-black text-4xl xl:text-6xl text-center ">
             {slice.primary.card_1_heading}
           </h1>
         </div>
   
       
         
     {/* First Chart */}
     <div className="flex md:flex-row flex-col   md:items-end md:justify-between items-center justify-center mt-6 md:mt-0 w-full h-full  ">
     
           <h1 className="font-ambit-regular text-black xl:text-3xl text-xl md:w-[15ch]  xl:text-left  leading-snug">
             {slice.primary.card_1_description}
           </h1>
         
       
         <PrismicNextImage 
             field= {slice.primary.card_1_asset} 
             className="xl:max-w-[300px] xl:max-h-[300px] object-cover p-2"
             alt={"Card Image"}
           />
          
        
     </div>
   
 
     
   
   
   
   
       </div>
       <div className="flex flex-col bg-[#ECF0F1] rounded-lg p-6 mt-6  lg:mt-0  items-center justify-between lg:w-[50%] w-full relative">
         {/* Description */}
         <div className="w-full flex flex-row  items-center justify-between   ">
         <div>
           <h1 className="font-ambit-regular text-black text-4xl xl:text-7xl text-left w-[5ch]  ">
             {slice.primary.card_2_heading}
           </h1>
           </div>
           <div className="">

           <PrismicNextImage 
             field= {slice.primary.card_2_asset} 
             className="xl:max-w-[300px] xl:max-h-[300px] max-w-[120px] max-h-[120px] object-cover "
             alt={"Card Image"}
             />
             </div>
         </div>
   
       
         
     {/* First Chart */}
     <div className="flex md:flex-row flex-col   md:items-end md:justify-between items-center justify-center mt-6 md:mt-0 w-full h-full  ">
     
           <p className="font-ambit-regular text-black xl:text-3xl text-xl  md:text-left  leading-snug">
             {slice.primary.card_2_description}
           </p>
         
     
          
        
     </div>
   
 
     
   
   
   
   
       </div>
            </div>
          </section>
  );
};

export default GrowthImpact4;
