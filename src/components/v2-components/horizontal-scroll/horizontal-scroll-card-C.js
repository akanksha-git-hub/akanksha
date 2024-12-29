import Image from "next/image";

export default function HorizontalScrollCardC() {
  return (
    <div className="flex flex-col  lg:flex-row bg-[#FBDA1D]  rounded-lg overflow-hidden w-full max-w-[1500px] h-[700px]  mx-auto ">
      <div className="p-16 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl  text-[#37473C] font-ambit-regular ">
            SSC Performance
          </h2>
        </div>

        <div className="mt-4">
          <p className="text-xl md:text-2xl lg:text-4xl text-black font-ambit-light ">
            Some content needs to go here as we cannot leave this blank
          </p>
        </div>
      </div>

      <div className="lg:w-1/3 h-full flex flex-col items-center justify-center md:pt-6   ">
        {/* White Section */}
        <div className="group bg-white w-full h-[100px] sm:h-[120px] lg:hover:h-[250px] sm:lg:hover:h-[300px] flex items-center justify-center relative cursor-pointer transition-all duration-300">
          {/* Text */}
          <p className="text-2xl lg:text-3xl absolute top-1/2 right-4 sm:right-6 lg:right-auto sm:left-4 transform -translate-y-1/2 font-ambit-regular lg:group-hover:top-8 lg:sm:group-hover:top-12 transition-all duration-300 w-auto">
            Year 2023-24&apos;
          </p>

          {/* Percentage */}
          <div className="absolute bottom-2 sm:bottom-8 right-2 sm:right-4 text-black font-ambit-semibold opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
            <p className="text-xl sm:text-2xl md:text-4xl lg:text-6xl ">
              99.4%
            </p>
          </div>
        </div>

        {/* Yellow Section */}
        <div className="group bg-[#F6AC27] w-full h-[100px] sm:h-[120px] lg:hover:h-[350px] flex items-center justify-center relative cursor-pointer transition-all duration-300">
          {/* Text */}
          <p className="text-2xl lg:text-3xl absolute top-1/2 right-4 sm:right-6 lg:right-auto sm:left-4 transform -translate-y-1/2 font-ambit-regular lg:group-hover:top-8 transition-all duration-300 w-auto">
            Year 2022-23&apos;
          </p>

          {/* Percentage */}
          <div className="absolute bottom-2 sm:bottom-8 right-2 sm:right-4 text-black font-ambit-semibold opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
            <p className="text-xl sm:text-2xl md:text-4xl lg:text-6xl">97.8%</p>
          </div>
        </div>

        {/* Blue Section */}
        <div className="group bg-[#58BCD4] w-full h-[100px] sm:h-[120px] lg:hover:h-[350px] flex items-center justify-center relative cursor-pointer transition-all duration-300">
          {/* Text */}
          <p className="text-2xl lg:text-3xl absolute top-1/2 right-4 sm:right-6 lg:right-auto sm:left-4 transform -translate-y-1/2 font-ambit-regular lg:group-hover:top-8 transition-all duration-300 w-auto">
            Year 2021-22&apos;
          </p>

          {/* Percentage */}
          <div className="absolute bottom-2 sm:bottom-8 right-2 sm:right-4 text-white font-ambit-semibold opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
            <p className="text-xl sm:text-2xl md:text-4xl lg:text-6xl">96.5%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
