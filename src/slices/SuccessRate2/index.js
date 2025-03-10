import HeadingAndDescription from "@/components/v2-components/HeadingAndDescription";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.SuccessRate2Slice} SuccessRate2Slice
 * @typedef {import("@prismicio/react").SliceComponentProps<SuccessRate2Slice>} SuccessRate2Props
 * @param {SuccessRate2Props}
 */
const SuccessRate2 = ({ slice }) => {
  return (
    <section
           data-slice-type={slice.slice_type}
           data-slice-variation={slice.variation}
         className="  ">
          <div className="flex  lg:flex-row flex-col lg:space-x-4 justify-between items-stretch mt-6  min-h-[250px]  ">
                         <div className="flex flex-row  border-[0.15rem] border-black  md:hover:bg-v2-yellow p-6  items-center justify-between lg:w-[65%] w-full  ">
                     
                               <div className="w-full h-full flex flex-col justify-around items-start ">
                               <HeadingAndDescription
        heading={slice.primary.card_1_title}
        description=  {slice.primary.card_1_description}
        iconField={slice.primary.card_1_icon}
      />
                                 
                          </div>
                                <PrismicNextImage
                                   field= {slice.primary.card_1_asset} 
                                   height={150}
                                   width={150}
                                    className=" object-contain"
                                   alt={"Card Image"}
                                  />
                      
                           </div>
                            <div className="flex flex-row  border-[0.15rem] border-black  md:hover:bg-v2-yellow p-6 items-center justify-between mt-4 lg:mt-0 lg:w-[35%] w-full ">
                     
                            <div className="w-full h-full flex flex-row justify-between items-center md:items-stretch space-x-2">
     {/* Percentage Box */}
     <HeadingAndDescription
        heading={slice.primary.box_number}
        description= {slice.primary.card_2_description}
        iconField={slice.primary.card_2_icon}
      />
    
   </div>
   
                
                
                         </div>
            
              
               
            </div>
           
<div className="flex flex-row   border-[0.15rem] border-black  md:hover:bg-v2-yellow p-6 justify-around items-stretch  w-full mt-4 lg:mt-6  min-h-[250px] ">
                     
                     <div className="w-full h-full flex flex-col justify-around items-start ">
                     <HeadingAndDescription
        heading= {slice.primary.card_3_title}
        description= {slice.primary.card_3_description}
        iconField={slice.primary.card_3_icon}
      />
                     
                </div>
                    
                 </div>
         </section>
         
  );
};

export default SuccessRate2;
