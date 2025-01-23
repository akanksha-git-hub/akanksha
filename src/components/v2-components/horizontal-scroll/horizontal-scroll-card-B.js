import Image from "next/image";
import { useState } from "react";
import PencilShading from "@/assets/pencil-shading.svg";
import { PrismicImage } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export default function HorizontalScrollCardB({ item }) {
  const [selectedYear, setSelectedYear] = useState("2024");

  // Data for each year
  // const yearData = {
  //   2021: "A solid performance in 2020 highlighted consistent excellence in distinction rates.",
  //   2022: "Despite challenges, students in 2021 maintained distinction levels above the state average.",
  //   2023: "In 2022, the distinction rate was remarkable and exceeded state and division averages.",
  //   2024: "In 2024, the distinction rate was remarkable and exceeded state and division averages.",
  // };
  const yearData = item.data.year_data.reduce((acc, yearItem) => {
    acc[yearItem.year] = yearItem.data;
    return acc;
  }, {});

  // Sort the years in ascending order
  const sortedYears = Object.keys(yearData).sort(
    (a, b) => Number(b) - Number(a)
  );

  return (
    <div className="flex flex-col lg:flex-row bg-[#FFFBF1] rounded-lg overflow-hidden w-full max-w-[1500px]  h-full max-h-[700px] mx-auto">
      {/* Left Section */}
      <div className="p-16 flex flex-col justify-around w-full lg:w-[50%]">
        {/* Top Text */}
        <div>
          <h2 className="text-5xl lg:text-7xl text-black font-ambit-regular">
            {item.data.title}
          </h2>
          <p className="text-xl lg:text-2xl text-black mt-2 font-ambit-regular">
            {item.data.subtitle}
          </p>
          {/* State Selector */}
          <div className="mt-4 grid grid-cols-2 gap-2 md:flex md:space-x-2">
            {sortedYears.map((year) => (
              <div key={year} className="relative group active:scale-95 w-fit">
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`transition-all right-0 
                  flex items-center gap-1 font-inter  
                  w-fit text-sm rounded-full py-2 px-4 relative 
                  z-[1] group-hover:opacity-95 group-hover:right-[2px] ${
                    selectedYear === year
                      ? "bg-[#FE6600] text-white border border-none"
                      : "text-gray bg-transparent border-none"
                  }`}
                >
                  {year}
                </button>
                {selectedYear === year && (
                  <div
                    className="w-full h-full absolute top-0 left-0 rounded-full
                    overflow-hidden opacity-0 group-hover:opacity-100
                    group-hover:top-[7px] z-[0]
                    custom-bezier pointer-events-none"
                  >
                    <div className="h-full w-full relative">
                      <Image
                        alt="pencil-shading"
                        className="object-cover"
                        src={PencilShading}
                        fill
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-2 ">
          <p className="text-xs md:text-xl lg:text-2xl text-black font-ambit-light lg:w-[29ch]">
            {yearData[selectedYear]}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full xl:w-[50%] h-full flex md:items-center items-start   justify-center  ">
        <div className="relative h-[150px] w-[150px] md:h-[250px] md:w-[250px] lg:h-[350px] lg:w-[350px] xl:h-[450px] xl:w-[450px] ">
          <PrismicImage
            field={item.data.cirlce}
            alt="Card image"
            layout="fill"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}
