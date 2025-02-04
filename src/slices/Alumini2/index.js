import SliceIdentifier from "@/components/SliceIdentifier";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";

/**
 * @typedef {import("@prismicio/client").Content.Alumini2Slice} Alumini2Slice
 * @typedef {import("@prismicio/react").SliceComponentProps<Alumini2Slice>} Alumini2Props
 * @param {Alumini2Props}
 */
const Alumini2 = ({ slice }) => {

  if (slice.variation === "successHeadingHero") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className=" mt-0"
      >
        <SliceIdentifier text={slice.primary.slice_identifier} />
        <h1 className="font-ambit-regular text-5xl md:text-xl md:text-center text-left mt-6 ">
        {slice.primary.main_heading}
      </h1>
         <h1 className="font-ambit-regular text-5xl md:text-6xl lg:text-8xl md:text-center text-left ">
        {slice.primary.heading}
      </h1>
        <div className="flex flex-col xl:flex-row mt-6" >
          <div className="flex flex-col bg-[#ECF0F1] rounded-lg p-8  xl:w-[50%] w-full relative">
             
             <div className="w-full h-full flex flex-col items-start justify-between ">
               <h1 className="font-ambit-regular text-black text-5xl md:text-7xl text-left ">
                 {slice.primary.card_1_heading}
               </h1>
               <h1 className="font-ambit-regular text-black md:text-3xl text-xl md:w-[19ch]  md:text-left  leading-snug">
                 {slice.primary.card_1_description_1}
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
        <div class=" flex xl:flex-row flex-col  items-center justify-center p-4 xl:w-[50%] mt-8 xl:mt-0  ">

          {/* <!-- Left Half: Two Percentage Sections --> */}
          <div class="flex flex-col justify-between xl:w-1/2 w-full ">
            {/* <!-- First Percentage Section --> */}
            <div class="flex flex-col space-y-2">
              <div class="text-5xl md:text-7xl font-ambit-regular text-black">
                {slice.primary.contribution1_percentaege}
              </div>
              <div class="text-sm md:text-base font-ambit-regular text-gray-900">
                {slice.primary.contribution1_desc}
              </div>
            </div>

            {/* <!-- Second Percentage Section --> */}
            <div class="mt-8">
              <div class="text-5xl  lg:text-7xl  font-ambit-regular text-black ">
             {slice.primary.contribution2_percentaege}
              </div>
              <div class="text-sm md:text-base font-ambit-regular text-gray-900 ">
                {slice.primary.contribution2_desc}
              </div>
            </div>
          </div>

          {/* <!-- Right Half: Image Section --> */}
          <div class="xl:w-1/2 w-full h-full flex flex-col  p-2">
            <PrismicNextImage
              field={slice.primary.image}
              alt="Akanksha Alumni Image"
              className="object-cover  w-full h-full"
            />
          </div>
        </div>
        </div>
      </section>
    );
  }

  
  if (slice.variation === "secondVariation") {
    return (
      <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding    mt-8"
    >
      <SliceIdentifier text={slice.primary.slice_identifier} />
        <h1 className="font-ambit-regular text-5xl md:text-6xl lg:text-8xl md:text-center text-left mt-12 md:mt-24">
        {slice.primary.heading}
      </h1>
      <div class="flex flex-col xl:flex-row mt-12 md:mt-24 ">
        {/* <!-- Section 1: Charts --> */}
        <div className="xl:w-1/2 flex flex-row justify-center items-end gap-8 p-4  h-[500px] relative">
          {/* <!-- Blue Section --> */}

          <div class="flex flex-col items-center justify-start bg-[#58BCD4] text-black  p-6 h-[100%] ">
            <div className="absolute  transform  translate-x-[50%] translate-y-[-85%] rotate-[25deg] bg-black text-white font-bold px-8 py-4 rounded-full text-3xl font-ambit-light">
              2x
            </div>
            <p class="text-4xl md:text-6xl font-ambit-semibold pt-16">
              {slice.primary.akanksha_average}
            </p>
            <p class="text-sm lg:text-lg font-ambit-semibold text-center">
              {slice.primary.akanksha_alumini}
            </p>
          </div>

          {/* Dotted Line */}
          <div className="absolute top-1/2 left-0 w-full flex justify-center transform -translate-y-1/2 -z-10">
            <Image
              src="/line-1.png"
              alt="Dotted Line"
              width={800} // Adjust width as needed
              height={10} // Adjust height as needed
              className="object-contain"
            />
          </div>
          {/* <!-- Orange Section --> */}
          <div class="flex flex-col items-center justify-center bg-[#F6AC27] text-black  p-6 h-[45%] ">
            <p class="text-4xl xl:text-6xl font-ambit-semibold pt-10">
              {slice.primary.national_average}
            </p>
            <p class="text-sm  lg:text-lg font-ambit-semibold text-center">
              {slice.primary.national_average_text}
            </p>
          </div>
          <p className="absolute md:-bottom-[2rem] -bottom-[3rem] w-[85%]  lg:w-[83%] text-left text-sm font-ambit-regular text-gray-900 ">
           {slice.primary.stats}
          </p>
        </div>
        <div className="flex flex-col xl:flex-row  xl:mt-0 mt-6 xl:w-[60%] w-full relative    ">
      {/* Left Section (Image) */}
      <div className="w-full xl:w-[50%] flex flex-col xl:items-end xl:justify-end  justify-center  mt-12 xl:mt-0  ">
        <PrismicNextImage 
          field={slice.primary.image} 
          className="max-w-[350px] max-h-[350px]   object-cover"
          alt={"Card Image"}
        />
      </div>

      {/* Right Section (Title, Secondary Title, and Description) */}
  
      <div className="w-full xl:w-[50%] flex flex-col justify-end items-start xl:mb-20 space-y-2 p-6 ">
        {/* Title */}
        <h1 className="font-ambit-regular text-left text-black text-6xl xl:text-8xl">
          {slice.primary.contribution1_percentaege}
        </h1>

        {/* Secondary Title */}
        <h2 className="font-ambit-regular text-left text-black text-3xl">
          {slice.primary.contribution1_desc}
        </h2>

       
      </div>
      
      </div>
     
      </div>
    </section>
    );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding   md:mt-94 mt-64"
    >
        <h1 className="font-ambit-regular text-5xl md:text-6xl lg:text-8xl md:text-center text-left ">
        {slice.primary.heading}
      </h1>
      <div class="flex flex-col xl:flex-row mt-8 ">
        {/* <!-- Section 1: Charts --> */}
        <div className="xl:w-1/2 flex flex-row justify-center items-end gap-8 p-4  h-[500px] relative">
          {/* <!-- Blue Section --> */}

          <div class="flex flex-col items-center justify-start bg-[#58BCD4] text-black  p-6 h-[100%] ">
            <div className="absolute  transform  translate-x-[50%] translate-y-[-85%] rotate-[25deg] bg-black text-white font-bold px-8 py-4 rounded-full text-3xl font-ambit-light">
              2x
            </div>
            <p class="text-4xl md:text-6xl font-ambit-semibold pt-16">
              {slice.primary.akanksha_average}
            </p>
            <p class="text-sm lg:text-lg font-ambit-semibold text-center">
              {slice.primary.akanksha_alumini}
            </p>
          </div>

          {/* Dotted Line */}
          <div className="absolute top-1/2 left-0 w-full flex justify-center transform -translate-y-1/2 -z-10">
            <Image
              src="/line-1.png"
              alt="Dotted Line"
              width={800} // Adjust width as needed
              height={10} // Adjust height as needed
              className="object-contain"
            />
          </div>
          {/* <!-- Orange Section --> */}
          <div class="flex flex-col items-center justify-center bg-[#F6AC27] text-black  p-6 h-[45%] ">
            <p class="text-4xl xl:text-6xl font-ambit-semibold pt-10">
              {slice.primary.national_average}
            </p>
            <p class="text-sm  lg:text-lg font-ambit-semibold text-center">
              {slice.primary.national_average_text}
            </p>
          </div>
          <p className="absolute md:-bottom-[2rem] -bottom-[3rem] w-[85%]  lg:w-[83%] text-left text-sm font-ambit-regular text-gray-900 ">
            Akanksha alumni earn an average monthly income of Rs. 24,778. This
            is higher than the national average of Rs. 10,780 for individuals
            aged 25 to 34.
          </p>
        </div>

        <div class="xl:w-1/2 flex flex-row p-4 mt-20 xl:mt-0 h-[500px]">
          {/* <!-- Left Half: Two Percentage Sections --> */}
          <div class="flex flex-col justify-between w-1/2 p-4">
            {/* <!-- First Percentage Section --> */}
            <div class="flex flex-col space-y-2">
              <div class="text-5xl md:text-8xl font-ambit-regular text-black">
                75%
              </div>
              <div class="text-lg md:text-xl font-ambit-regular text-gray-900">
                Akanksha alumni contribution to their households.
              </div>
            </div>

            {/* <!-- Second Percentage Section --> */}
            <div class="mt-8">
              <div class="text-5xl md:text-7xl lg:text-8xl  font-ambit-regular text-black ">
                50%
              </div>
              <div class="text-lg md:text-xl font-ambit-regular text-gray-900 self-start">
                Akanksha alumni engaged in community activities.
              </div>
            </div>
          </div>

          {/* <!-- Right Half: Image Section --> */}
          <div class="w-1/2 relative">
            <PrismicNextImage
              field={slice.primary.image}
              alt="Akanksha Alumni Image"
              className="object-cover absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Alumini2;
