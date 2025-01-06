import Image from "next/image";

export default function HorizontalScrollCardC() {
  return (
    <div className="flex flex-col  lg:flex-row bg-[#FBDA1D]  rounded-lg overflow-hidden w-full max-w-[1500px] md:p-12  h-full max-h-[700px] mx-auto ">
    <div className="w-full lg:w-[50%] p-8 flex flex-col justify-between flex-1">
      <div>
        <h2 className="text-2xl md:text-5xl lg:text-7xl text-[#37473C] font-ambit-regular ">
          SSC Performance
        </h2>
      </div>
  
      <div className="mt-4">
        <p className="textlg md:text-2xl lg:text-4xl text-black font-ambit-light ">
          Some content needs to go here as we cannot leave this blank
        </p>
      </div>
    </div>
  
    <div className="w-full lg:w-[40%] h-full flex flex-col items-center justify-center  px-8 lg:px-0  ">
      {/* White Section */}
        <div className="group bg-[#F6AC27] w-full h-[80px] sm:h-[120px] lg:hover:h-[350px] flex items-center justify-center relative cursor-pointer transition-all sm:pt-6 sm:pb-6">
  {/* Text and Image Container */}
  <div className="absolute top-1/2 left-0 right-0 px-4 transform -translate-y-1/2 flex justify-between items-center font-ambit-regular lg:group-hover:top-8 transition-all">
  {/* Text */}
  <p className="text-xl lg:text-3xl">Year 2022-24&apos;</p>

  {/* Hover Image */}
  <Image
  src="/hover-3.png"
  alt="Hovered Image"
  width={16}
  height={16}
  className="opacity-0 group-hover:opacity-100 transition-opacity w-4 h-10 pb-2 lg:pb-0 "
/>

</div>



  {/* Percentage */}
  <div className="absolute bottom-2 sm:bottom-8 right-4 sm:right-4 text-black font-ambit-semibold opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
    <p className="text-sm sm:text-2xl md:text-4xl lg:text-8xl">99.4%</p>
  </div>
</div>
  
      {/* Yellow Section */}
      <div className="group bg-white w-full h-[80px] sm:h-[120px] lg:hover:h-[350px] flex items-center justify-center relative cursor-pointer transition-all sm:pt-6 sm:pb-6">
  {/* Text and Image Container */}
  <div className="absolute top-1/2 left-0 right-0 px-4 transform -translate-y-1/2 flex justify-between items-center font-ambit-regular lg:group-hover:top-8 transition-all">
  {/* Text */}
  <p className="text-xl lg:text-3xl">Year 2022-23&apos;</p>

  {/* Hover Image */}
  <Image
    src="/hover-2.png"
    alt="Hovered Image"
    width={16}
    height={16}
    className="opacity-0 group-hover:opacity-100 transition-opacity"
  />
</div>



  {/* Percentage */}
  <div className="absolute bottom-2 sm:bottom-8 right-4 sm:right-4 text-black font-ambit-semibold opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
    <p className="text-sm sm:text-2xl md:text-4xl lg:text-8xl">97.8%</p>
  </div>
</div>

  
      {/* Blue Section */}
      <div className="group bg-[#58BCD4] w-full h-[80px] sm:h-[120px] lg:hover:h-[350px] flex items-center justify-center relative cursor-pointer transition-all sm:pt-6 sm:pb-6">
  {/* Text and Image Container */}
  <div className="absolute top-1/2 left-0 right-0 px-4 transform -translate-y-1/2 flex justify-between items-center font-ambit-regular lg:group-hover:top-8 transition-all">
  {/* Text */}
  <p className="text-xl lg:text-3xl">Year 2021-22&apos;</p>

  {/* Hover Image */}
  <Image
    src="/hover-1.png"
    alt="Hovered Image"
    width={16}
    height={16}
    className="opacity-0 group-hover:opacity-100 transition-opacity"
  />
</div>



  {/* Percentage */}
  <div className="absolute bottom-2 sm:bottom-8 right-4 sm:right-4 text-black font-ambit-semibold opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity">
    <p className="text-sm sm:text-2xl md:text-4xl lg:text-8xl">96.5%</p>
  </div>
</div>
    
    </div>
  </div>
  
  );
}
