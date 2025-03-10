import SliceIdentifier from "@/components/SliceIdentifier";
import HeadingAndDescription from "@/components/v2-components/HeadingAndDescription";
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
         <div className="flex  lg:flex-row flex-col lg:space-x-4 justify-between  items-stretch mt-8  min-h-[250px]    ">
           <div className="flex flex-col    p-8  lg:w-[35%] w-full relative border-[0.15rem] border-black  md:hover:bg-v2-yellow">
             <div className="w-full h-full flex flex-col items-start justify-around   ">
             <HeadingAndDescription
        heading={slice.primary.card_1_heading}
        description={slice.primary.card_1_description_1}
        iconField={slice.primary.icon_1}
      />
             </div>
 
            
           </div>
           <div className="flex flex-col    p-8  lg:w-[65%] w-full relative border-[0.15rem] border-black  md:hover:bg-v2-yellow mt-4 lg:mt-0">
            
           <div className="w-full h-full flex flex-col items-start justify-around    ">
               {/* <!-- First Percentage Section --> */}
               <div class="flex flex-col space-y-2 items-start justify-around ">
               <HeadingAndDescription
        heading=   {slice.primary.card_2_title}
        description=  {slice.primary.card_2_description}
        iconField={slice.primary.icon_2}
      />
               
               </div>
 
         
              
             </div>
 
            
           </div>
           
         </div>
             
       </section>
     

         
       
      
      
     </>
  );
};

export default SuccessRate1;
