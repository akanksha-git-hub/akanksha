import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";

/**
 * @typedef {import("@prismicio/client").Content.Alumini2Slice} Alumini2Slice
 * @typedef {import("@prismicio/react").SliceComponentProps<Alumini2Slice>} Alumini2Props
 * @param {Alumini2Props}
 */
const Alumini2 = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding   mt-8 lg:px-44"
    >
      <div class="flex flex-col xl:flex-row ">
        {/* <!-- Section 1: Charts --> */}
        <div className="xl:w-1/2 flex flex-row justify-center items-end gap-8 p-4  h-[500px] relative">
          {/* <!-- Blue Section --> */}

          <div class="flex flex-col items-center justify-start bg-[#58BCD4] text-black  p-6 h-[100%] w-[40%]">
            <div className="absolute  transform  translate-x-[50%] translate-y-[-85%] rotate-[25deg] bg-black text-white font-bold px-8 py-4 rounded-full text-3xl font-ambit-light">
              2x
            </div>
            <p class="text-4xl md:text-6xl font-ambit-semibold pt-16">{slice.primary.akanksha_average}</p>
            <p class="text-lg font-ambit-semibold">{slice.primary.akanksha_alumini}</p>
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
          <div class="flex flex-col items-center justify-center bg-[#F6AC27] text-black  p-6 h-[45%] w-[40%]">
            <p class="text-4xl md:text-6xl font-ambit-semibold pt-10">{slice.primary.national_average}</p>
          <p class="text-lg font-ambit-semibold">{slice.primary.national_average_text}</p>
          </div>
        </div>

        {/* 
  <!-- Section 2: Placeholder for Future Content --> */}
        <div class="xl:w-1/2 flex flex-row p-4  h-[500px]">
  {/* <!-- Left Half: Two Percentage Sections --> */}
  <div class="flex flex-col justify-between w-1/2 p-4">
    {/* <!-- First Percentage Section --> */}
    <div class="flex flex-col space-y-2">
  <div class="text-5xl md:text-8xl font-ambit-regular text-black">
    75%
  </div>
  <div class="text-lg md:text-xl font-ambit-regular text-gray-500">
    Akanksha alumni contribution to their households.
  </div>
</div>


    {/* <!-- Second Percentage Section --> */}
    <div class="mt-8">
      <div class="text-5xl md:text-8xl font-ambit-regular text- ">
        50%
      </div>
      <div class="text-lg md:text-xl font-ambit-regular text-gray-500 self-start">
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
