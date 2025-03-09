import SliceIdentifier from "@/components/SliceIdentifier";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.SuccessRate1Slice} SuccessRate1Slice
 * @typedef {import("@prismicio/react").SliceComponentProps<SuccessRate1Slice>} SuccessRate1Props
 * @param {SuccessRate1Props}
 */
const SuccessRate1 = ({ slice }) => {
  return (
    <>
 <section
         data-slice-type={slice.slice_type}
         data-slice-variation={slice.variation}
         className=" mt-0 "
       >
       

         <SliceIdentifier text={slice.primary.slice_identifier} />
         <h1 className="font-ambit-regular text-5xl md:text-xl lg:text-center text-left mt-6 ">
           {slice.primary.main_heading}
         </h1>
         <h1 className="font-ambit-regular text-5xl md:text-6xl lg:text-8xl lg:text-center text-left ">
           {slice.primary.heading}
         </h1>
         <div className="flex flex-col lg:flex-row mt-6 lg:space-x-8 ">
           <div className="flex flex-col bg-[#ECF0F1] rounded-lg p-8  lg:w-[50%] w-full relative">
             <div className="w-full h-full flex flex-col items-start justify-between min-h-[160px]  ">
               <h1 className="font-ambit-regular text-black text-5xl lg:text-7xl text-left ">
                 {slice.primary.card_1_heading}
               </h1>
               <p className="font-ambit-regular text-black lg:text-3xl text-xl   lg:text-left  ">
                 {slice.primary.card_1_description_1}
               </p>
             </div>
 
             <PrismicNextImage
               field={slice.primary.asset_1}
               height={220}
               width={220}
               className=" h-[80px] w-[80px] lg:h-[170px] lg:w-[170px] absolute right-0 top-0 object-cover"
               alt={"Card Image"}
               />
           </div>
           <div class=" bg-[#ECF0F1] flex lg:flex-row flex-col p-8 rounded-lg items-center justify-center  lg:w-[50%] mt-8 lg:mt-0  ">
            
             <div class="flex flex-col justify-between  w-full ">
               {/* <!-- First Percentage Section --> */}
               <div class="flex flex-col space-y-2">
                 <div class="text-5xl lg:text-7xl font-ambit-regular text-black">
                   {slice.primary.card_2_title}
                 </div>
                 <div class=" lg:text-3xl text-xl font-ambit-regular text-black">
                   {slice.primary.card_2_description}
                 </div>
               </div>
 
               {/* <!-- Second Percentage Section --> */}
              
             </div>
 
            
           </div>
           
         </div>
             
       </section>
     

         
       
      
      
     </>
  );
};

export default SuccessRate1;
