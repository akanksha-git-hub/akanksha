import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.SuccessRate2Slice} SuccessRate2Slice
 * @typedef {import("@prismicio/react").SliceComponentProps<SuccessRate2Slice>} SuccessRate2Props
 * @param {SuccessRate2Props}
 */
const SuccessRate2 = ({ slice }) => {
  return (
    <>
    <section
           data-slice-type={slice.slice_type}
           data-slice-variation={slice.variation}
         className=" universal-padding">
          <div className="flex lg:flex-row flex-col lg:space-x-8 min-h-[300px] justify-stretch items-stretch relative ">
                         <div className="flex flex-row   p-6 items-center justify-between lg:w-[50%] w-full  ">
                     
                               <div className="w-full h-full flex flex-col justify-around items-start ">
                                 <h1 className="font-ambit-regular text-black text-5xl md:text-7xl text-left ">
                                     {slice.primary.card_1_title}
                                 </h1>
                                <h1 className="font-ambit-regular text-black md:text-3xl text-xl lg:text-left ">
                                      {slice.primary.card_1_description}
                                </h1>
                          </div>
                                <PrismicNextImage
                                   field= {slice.primary.card_1_asset} 
                                   height={150}
                                   width={150}
                                    className=" object-contain"
                                   alt={"Card Image"}
                                  />
                      
                           </div>
                            <div className="flex flex-row bg-[#ECF0F1] rounded-lg p-6 items-center justify-between mt-8 lg:mt-0 lg:w-[50%] w-full ">
                     
                            <div className="w-full h-full flex flex-row justify-between items-center md:items-stretch space-x-2">
     {/* Percentage Box */}
     <span className="bg-[#FBDA1D] font-ambit-semibold min-h-[150px] text-5xl md:text-7xl text-left text-black flex items-center justify-center rounded-[5rem] w-[40%] h-full">
       {slice.primary.box_number}
     </span> 
   
     {/* Description Section */}
     <h1 className="font-ambit-regular text-black md:text-3xl text-xl flex-1 h-full flex items-center">
       {slice.primary.card_2_description}
     </h1>
   </div>
   
                
                
                         </div>
            
              
               
            </div>
         
<div className="flex flex-row   p-6 items-center justify-between  w-full mt-12  ">
                     
                     <div className="w-full h-full flex flex-col justify-around items-start ">
                       <h1 className="font-ambit-regular text-black text-5xl md:text-7xl text-left ">
                           {slice.primary.card_3_title}
                       </h1>
                      <h1 className="font-ambit-regular text-black md:text-3xl text-xl lg:text-left ">
                            {slice.primary.card_3_description}
                      </h1>
                </div>
                      <PrismicNextImage
                         field= {slice.primary.asset} 
                         height={150}
                         width={150}
                          className=" object-contain"
                         alt={"Card Image"}
                        />
            
                 </div>
         </section>
         
         <div className="absolute top-[313%]" >

         
<PrismicNextImage
field={slice.primary.band_asset}
height={920}
width={1080}
className="h-[70px]  !w-screen  object-cover "
alt={"Card Image"}
/>
</div>
</>
  );
};

export default SuccessRate2;
