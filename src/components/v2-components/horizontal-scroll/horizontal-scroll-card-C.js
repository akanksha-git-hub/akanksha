import { useState } from "react";
import Image from "next/image";

export default function HorizontalScrollCardC({ item }) {
  const [hoveredIndex, setHoveredIndex] = useState(0); // State to track hovered section

  console.log("3rd Card", item.data);

  return (
    <div className="flex flex-col lg:flex-row bg-[#FBDA1D] rounded-lg overflow-hidden w-full max-w-[1500px] md:p-6 h-full max-h-[700px] mx-auto">
      {/* Left Section */}
      <div className="w-full lg:w-[50%] p-6 flex flex-col justify-between   flex-1">
        <div>
          <h2 className="text-2xl md:text-5xl lg:text-7xl text-black font-ambit-regular">
            {item.data.title}
          </h2>
        </div>

        <div className="mt-4">
          <p className="text-lg md:text-xl lg:text-3xl w-[28ch] text-black ">
            {item.data.description}
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-[40%] h-full flex flex-col items-center justify-center px-8 lg:px-0">
        {item.data.year_performance.map((performance, index) => {
          const bgColors = ["#F6AC27", "#FFFFFF", "#58BCD4"];
          const hoverImages = ["/hover-3.png", "/hover-2.png", "/hover-1.png"];

          const isHovered = hoveredIndex === index;

          return (
            <div
              key={index}
              style={{ backgroundColor: bgColors[index] }} // Apply background color dynamically
              className={`group w-full h-[80px] sm:h-[120px] ${
                isHovered ? "lg:h-[350px]" : ""
              } flex items-center justify-center relative cursor-pointer transition-all sm:pt-6 sm:pb-6`}
              onMouseEnter={() => setHoveredIndex(index)} // Update hovered index
            >
              {/* Text and Image Container */}
              <div
                className={`absolute top-1/2 left-0 right-0 px-4 transform -translate-y-1/2 flex justify-between items-center font-ambit-regular transition-all ${
                  isHovered ? "lg:top-8 top-8" : ""
                }`}
              >
                {/* Text */}
                <p className="text-xl lg:text-3xl">{performance.year_202324}</p>

                {/* Hover Image */}
                <Image
                  src={hoverImages[index]}
                  alt={`Hover Image ${index + 1}`}
                  width={16}
                  height={16}
                  className={`transition-opacity ${
                    isHovered ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>

              {/* Percentage */}
              <div
                className={`absolute bottom-0 sm:bottom-8 right-4 sm:right-4 text-black font-ambit-semibold transition-opacity ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-sm sm:text-2xl md:text-4xl lg:text-8xl">
                  {performance.percentage}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
