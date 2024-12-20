import Image from "next/image";

export default function HorizontalScrollCardA() {
  return (
    <div className="flex bg-[#55BBD3]  rounded-lg overflow-hidden w-full h-[800px]  ">
      <div className=" p-16 flex flex-col justify-around flex-1 ">
        <div>
          <h2 className="text-8xl  text-white font-ambit-regular">99.4%</h2>
          <p className="text-2xl text-white mt-2 font-ambit-regular">
            Pass Percentage
          </p>
        </div>

        <div className="mt-4">
          <p className="text-5xl text-white font-ambit-light w-[28ch]">
            In AY 2023-24, 663 students from Akanksha appeared for the SSC
            exams, with an overall pass percentage of 99.4% The highest in 5
            years.
          </p>
        </div>
      </div>

      <div className="w-1/3 h-full flex items-center justify-center ">
        {/* Outer White Circle */}
        <div className="bg-white rounded-full relative flex items-center justify-center h-[500px] w-[500px]">
          {/* Ellipse Layer */}
          <div className="absolute rounded-full flex items-center justify-center h-[450px] w-[450px] overflow-hidden">
            <Image
              src="/Ellipse.png"
              alt="Ellipse"
              layout="fill"
              objectFit="cover"
            />
          </div>
          {/* Main Image */}
          <div className="relative flex items-center justify-center h-[250px] w-[250px] overflow-hidden rounded-full">
            <Image
              src="/BOOK.png"
              alt="Card image"
              width={350}
              height={350}
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
