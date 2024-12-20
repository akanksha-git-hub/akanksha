import Image from "next/image";

export default function HorizontalScrollCardC() {
  return (
    <div className="flex bg-[#FBDA1D]  rounded-lg overflow-hidden w-full h-[800px] ">
      <div className="p-16 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-8xl  text-[#37473C] font-ambit-regular w-[2ch]">
            SSC Performance
          </h2>
        </div>

        <div className="mt-4">
          <p className="text-5xl text-black font-ambit-light w-[23ch]">
            Some content needs to go here as we cannot leave this blank
          </p>
        </div>
      </div>

      <div className="w-1/3 h-full flex flex-col items-center justify-center p-8 ">
        {/* White Section */}
        <div className="group bg-white w-[550px] h-[150px] hover:h-[350px] flex items-center justify-center relative cursor-pointer transition-all duration-300">
          <p className="text-3xl absolute top-1/2 left-4 transform -translate-y-1/2 font-ambit-regular group-hover:top-12 transition-all duration-300 w-[7ch]">
            Year 2023-24&apos;
          </p>

          <div className="absolute bottom-4 right-4 bg-white text-black text-8xl font-ambit-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            99.4%
          </div>
        </div>

        {/* Yellow Section */}
        <div className="group bg-[#F6AC27] w-[550px] h-[150px] hover:h-[350px] flex items-center justify-center relative cursor-pointer transition-all duration-300">
          <p className="text-3xl absolute top-1/2 left-4 transform -translate-y-1/2 font-ambit-regular group-hover:top-8 transition-all ">
            Year 2022-23&apos;
          </p>

          <div className="absolute bottom-4 right-4  text-black text-8xl font-ambit-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            97.8%
          </div>
        </div>

        {/* Blue Section */}
        <div className="group bg-[#58BCD4]  w-[550px] h-[150px] hover:h-[350px] flex items-center justify-center relative cursor-pointer transition-all duration-300">
          <p className="text-3xl absolute top-1/2 left-4 transform -translate-y-1/2 font-ambit-regular group-hover:top-8 transition-all ">
            Year 2021-22&apos;
          </p>

          <div className="absolute bottom-4 right-4  text-white text-8xl font-ambit-semibold opacity-0 group-hover:opacity-100 transition-opacity">
            96.5%
          </div>
        </div>
      </div>
    </div>
  );
}
