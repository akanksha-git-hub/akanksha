import Image from "next/image";

export default function CardB({item}) {
    console.log(item);
    
    return (
        <div className="bg-[#58BCD4] rounded-lg shadow-lg h-full md:p-0 pl-6 pt-6 pb-6">
        <div className="flex flex-col md:flex-row justify-between h-full w-full">
            {/* Section 1 */}
            <div className="w-full md:w-2/4  md:p-12 flex flex-col justify-between">
                {/* Top Section */}
                <div>
                    <h1 className="text-4xl md:text-7xl text-black font-ambit-regular">HSC  
                    Performance</h1>
                   
                </div>
                {/* Bottom Section */}
                <div className="mt-4">
                    <p className="font-ambit-regular text-sm md:text-2xl w-[28ch] md:w-[30ch]">
                    Akanksha alumni pass % is higher by 2% than the Maharashtra State Average, higher by 3% than the Mumbai division and higher by 1% than the Pune division averages.
                    </p>
                </div>
            </div>
    
            {/* Section 2 */}
            <div className="w-full md:w-2/4 ">
    {/* Rotated Container */}
    <div className=" flex flex-col justify-center space-y-3  w-full h-full ">
        {/* First Chart */}

        <div className="bg-[#FBDA1D] ml-auto w-[90%] flex items-center justify-between p-4">
  {/* Text */}
  <div className="font-ambit-regular text-sm sm:text-lg md:text-xl lg:text-2xl">
    Year 2023-24
  </div>

  {/* Image and Percentage Container */}
  <div className="flex items-center justify-end">
    {/* Image */}
    <Image
      src="/hover-3.png"
      alt="Hovered Image"
      width={12} 
      height={12} 
    />

    {/* Percentage */}
    <div className="font-ambit-regular text-xl sm:text-2xl md:text-3xl lg:text-6xl ml-2">
      99.4%
    </div>
  </div>
</div>


        {/* Second Chart */}
        <div className="bg-[#F6AC27] ml-auto w-[65%] flex items-center justify-between p-4">
  {/* Text */}
  <div className="font-ambit-regular text-sm sm:text-lg md:text-xl lg:text-2xl">
    Year 2023-24
  </div>

  {/* Percentage */}
  <div className="font-ambit-regular text-xl sm:text-2xl md:text-3xl lg:text-6xl">
    99.4%
  </div>
</div>

        {/* Third Chart */}
        <div className="bg-[#ECF0F1] ml-auto w-[75%] flex items-center justify-between p-4">
  {/* Text */}
  <div className="font-ambit-regular text-sm sm:text-lg md:text-xl lg:text-2xl">
    Year 2023-24
  </div>

  {/* Percentage */}
   <div className="font-ambit-regular text-xl sm:text-2xl md:text-3xl lg:text-6xl">
    99.4%
  </div>
</div>


    </div>
</div>

        </div>
    </div>
    
    );
}
