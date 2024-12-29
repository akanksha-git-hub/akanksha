import Image from "next/image";

export default function HorizontalScrollCardA() {
  return (
    <div className="flex flex-col lg:flex-row bg-[#55BBD3] rounded-lg overflow-hidden w-full max-w-[1500px] h-[700px] mx-auto border">
      <div className="p-8 lg:p-12 flex flex-col justify-around flex-1   ">
        <div>
          <h2 className="text-6xl lg:text-7xl text-white font-ambit-regular  ">
            99.4%
          </h2>
          <p className="text-xl lg:text-2xl text-white mt-2 font-ambit-regular ">
            Pass Percentage
          </p>
        </div>

        <p className="text-xl md:text-2xl lg:text-4xl text-white font-ambit-light mt-4    ">
          In AY 2023-24, 663 students from Akanksha appeared for the SSC exams,
          with an overall pass percentage of 99.4%, the highest in 5 years.
        </p>
      </div>

      <div className="w-full lg:w-1/3 h-full flex items-center justify-center">
        {/* Outer White Circle */}
        <div className="bg-white rounded-full relative flex items-center justify-center h-[250px] w-[250px] lg:h-[400px] lg:w-[400px]">
          {/* Ellipse Layer */}
          <div className="absolute rounded-full flex items-center justify-center h-[200px] w-[200px] lg:h-[350px] lg:w-[350px] overflow-hidden">
            <Image
              src="/Ellipse.png"
              alt="Ellipse"
              layout="fill"
              objectFit=""
            />
          </div>
          {/* Main Image */}
          <div className="relative flex items-center justify-center h-[100px] w-[100px] lg:h-[200px] lg:w-[200px] overflow-hidden rounded-full">
            <Image
              src="/BOOK.png"
              alt="Card image"
              width={300}
              height={300}
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
