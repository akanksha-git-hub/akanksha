import Image from "next/image";
import { useState } from "react";

export default function HorizontalScrollCardB() {
  const [selectedYear, setSelectedYear] = useState("2024");

  // Data for each year
  const yearData = {
    2021: "A solid performance in 2020 highlighted consistent excellence in distinction rates.",
    2022: "Despite challenges, students in 2021 maintained distinction levels above the state average.",
    2023: "In 2022, the distinction rate was remarkable and exceeded state and division averages.",
    2024: "Students passed with distinction or first class, which is higher than Maharashtra State (70%), Mumbai Division (64%), Pune Division (72%).",
  };

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
            73%
          </h2>
          <p className="text-xl lg:text-2xl text-black mt-2 font-ambit-regular">
            Distinction
          </p>
          {/* State Selector */}
          <div className="mt-4 grid grid-cols-2 gap-2 md:flex md:space-x-2">
  {sortedYears.map((year) => (
    <button
      key={year}
      onClick={() => setSelectedYear(year)}
      className={`text-xs md:text-lg font-ambit-regular px-6 py-2 rounded-full ${
        selectedYear === year ? "bg-[#FE6600] text-white" : "text-gray"
      }`}
    >
      {year}
    </button>
  ))}
</div>

        </div>

        {/* Bottom Text */}
        <div className="mt-4 ">
          <p className="text-sm md:text-xl lg:text-2xl text-black font-ambit-light lg:w-[29ch]">
            {yearData[selectedYear]}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full xl:w-[50%] h-full flex md:items-center items-start   justify-center ">
        <div className="relative h-[180px] w-[180px] md:h-[250px] md:w-[250px] lg:h-[350px] lg:w-[350px] xl:h-[450px] xl:w-[450px]">
          <Image
            src="/circles.png"
            alt="Card image"
            layout="fill" /* Ensures image fills the parent container */
            objectFit="cover" /* Maintains aspect ratio while covering */
            className="rounded-full" /* Optional: Add additional styles */
          />
        </div>
      </div>
    </div>
  );
}
