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
        <div className="xl:w-1/2 flex flex-row justify-center items-end gap-8 p-4 border h-[600px] relative">
          {/* <!-- Blue Section --> */}

          <div class="flex flex-col items-center justify-start bg-[#58BCD4] text-black rounded-t-full p-6 h-[80%] w-[40%]">
            <div className="absolute  transform  translate-x-[75%] translate-y-[-35%] rotate-45 bg-black text-white font-bold px-10 py-4 rounded-full text-3xl font-ambit-light">
              2x
            </div>
            <p class="text-4xl md:text-6xl font-ambit-semibold pt-16">24,778</p>
            <p class="text-lg font-ambit-semibold">Akanksha Alumni</p>
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
          <div class="flex flex-col items-center justify-center bg-[#F6AC27] text-black rounded-t-[6rem] p-6 h-[45%] w-[40%]">
            <p class="text-4xl md:text-6xl font-ambit-semibold pt-10">10,780</p>
            <p class="text-lg font-ambit-semibold">National Average</p>
          </div>
        </div>

        {/* 
  <!-- Section 2: Placeholder for Future Content --> */}
        <div class="xl:w-1/2 flex-1 p-4 border border-gray-300 m-2">
          <p>section 2.</p>
        </div>
      </div>
    </section>
  );
};

export default Alumini2;
