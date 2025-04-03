import SliceIdentifier from "@/components/SliceIdentifier";
import HeadingAndDescription from "@/components/v2-components/HeadingAndDescription";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.AluminiGridSlice} AluminiGridSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AluminiGridSlice>} AluminiGridProps
 * @param {AluminiGridProps}
 */
const AluminiGrid = ({ slice }) => {
    const { show_identifier, slice_identifier } = slice.primary;
      
        const RenderIdentifier = () =>
          show_identifier && <SliceIdentifier text={slice_identifier} />;
        return (
          <>
            <section
              data-slice-type={slice.slice_type}
              data-slice-variation={slice.variation}
              className="md:mt-72 mt-16 "
            >
              <RenderIdentifier />
             
              <h1 className="font-ambit-regular text-5xl md:text-6xl lg:text-8xl lg:text-center text-left mt-2 ">
                {slice.primary.title}
              </h1>
              {/* //Row 1  */}
              <div className="flex  lg:flex-row flex-col lg:space-x-4 justify-between  items-stretch mt-8  min-h-[250px]    ">
                <div className="flex flex-row    p-8 md:w-[50%] xl:w-[55%] w-full relative border-[0.15rem] border-black  md:hover:bg-v2-yellow">
                  
                  <div className="flex flex-col xl:flex-row">
                  <div className="flex flex-row items-center justify-center xl:w-[50%]  xl:px-6">

 <PrismicNextImage
                                field={slice.primary.image_1}
                                className=" h-full w-full object-cover"
                            />
</div>
                  <div className="flex flex-row xl:items-end xl:w-[50%] xl:mt-0 mt-4">

                  <p className="font-ambit-regular text-black text-[1.35rem]" >{slice.primary.card_1_description}</p>
                  </div>
                 
                  </div>
                
                </div>
                <div className="flex flex-col p-8 md:w-[50%]  xl:w-[45%] w-full relative border-[0.15rem] border-black md:hover:bg-v2-yellow mt-4 lg:mt-0 space-y-4">
  
  <div className="flex  flex-col xl:flex-row   xl:justify-between xl:items-center ">
    {/* Left: Percentage and Total */}
    <div className="flex flex-col">
      <span className=" text-5xl md:text-6xl lg:text-8xl font-ambit-regular text-black">{slice.primary.card_2_percentage_1}</span>
    
    </div>
    {/* Right: Description */}
    <div className="xl:w-1/2 text-left font-ambit-regular text-[1.35rem]">
     {slice.primary.card_2_description_1}
    </div>
  </div>

  
  <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center">
    {/* Left: Percentage and Total */}
    <div className="flex flex-col">
      <span className="text-5xl md:text-6xl lg:text-8xl  font-ambit-regular">{slice.primary.card_2_percentage_2}</span>
      
    </div>
    {/* Right: Description */}
    <div className="xl:w-1/2 text-left text-black font-ambit-regular text-[1.35rem]">
    {slice.primary.card_2_description_2}
    </div>
  </div>
</div>

              </div>
              {/* //Row 2 */}
              <div className="flex  lg:flex-row flex-col lg:space-x-4 justify-between  items-stretch mt-4  min-h-[250px]    ">
                <div className="flex flex-row    p-8  lg:w-[50%] w-full relative border-[0.15rem] border-black  md:hover:bg-v2-yellow">
                  
                <div className="w-full h-full flex flex-col items-start justify-around    ">
              {/* <!-- First Percentage Section --> */}
              <div class="flex flex-col space-y-2 items-start justify-around ">
                <HeadingAndDescription
                  heading={slice.primary.card_3_percentage_1}
                  description={slice.primary.card_3_description}
                  iconField={slice.primary.card_3_icon}
                />
              </div>
            </div>
                
                </div>
                <div className="flex flex-col p-8 lg:w-[50%] w-full relative border-[0.15rem] border-black md:hover:bg-v2-yellow mt-4 lg:mt-0 space-y-4">
  
  

  
              
                  
                  <div className="w-full h-full flex flex-col items-start justify-around    ">
                {/* <!-- First Percentage Section --> */}
                <div class="flex flex-col space-y-2 items-start justify-around ">
                  <HeadingAndDescription
                    heading={slice.primary.card_4_percentage}
                    description={slice.primary.card_4_description}
                    iconField={slice.primary.card_4_icon}
                  />
                </div>
              </div>
                  
                  </div>
</div>

{/* Row 3 */}
<div className="flex  lg:flex-row flex-col lg:space-x-4 justify-between  items-stretch mt-4  min-h-[250px]    ">
                <div className="flex flex-row    p-8  lg:w-[40%] w-full relative border-[0.15rem] border-black  md:hover:bg-v2-yellow">
                  
                <div className="w-full h-full flex flex-col items-start justify-around    ">
              {/* <!-- First Percentage Section --> */}
              <div class="flex flex-col space-y-2 items-start justify-around ">
                <HeadingAndDescription
                  heading={slice.primary.card_5_percentage}
                  description={slice.primary.card_5_description}
                  iconField={slice.primary.card_5_icon}
                />
              </div>
            </div>
                
                </div>
                <div className="flex flex-col p-8 lg:w-[60%] w-full relative border-[0.15rem] border-black md:hover:bg-v2-yellow mt-4 lg:mt-0 space-y-4">
  
  

  
              
                  
                  <div className="w-full h-full flex flex-col items-start justify-around    ">
                {/* <!-- First Percentage Section --> */}
                <div class="flex flex-col space-y-2 items-start justify-around ">
                  <div>
                    <p className="font-ambit-regular text-black text-[1.35rem] lg:text-left" >{slice.primary.card_6_subtitle}</p>
                
                  </div>
                  <div>
                    <p className=" font-ambit-regular text-black text-5xl md:text-7xl" >{slice.primary.card_6_percentage}</p>
                
                  </div>
                  <div>
                    <p className="font-ambit-regular text-black text-[1.35rem] lg:text-left" >{slice.primary.card_6_description}</p>
                
                  </div>
                </div>
              </div>
                  
                  </div>
</div>

              


              
            </section>
          </>
        );
      
};

export default AluminiGrid;
