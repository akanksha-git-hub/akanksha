import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.ImpactPoint2Slice} ImpactPoint2Slice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImpactPoint2Slice>} ImpactPoint2Props
 * @param {ImpactPoint2Props}
 */
const ImpactPoint2 = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    className="universal-padding">
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
                              field= {slice.primary.card_1_asset} 
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
                              field= {slice.primary.asset} 
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
