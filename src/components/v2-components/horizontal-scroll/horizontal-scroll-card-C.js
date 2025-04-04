import { useState, useEffect } from "react";
import Image from "next/image";

export default function HorizontalScrollCardC({ item }) {
  // Ensure year_performance exists before setting initial state
  const hasData =
    item?.data?.year_performance && item.data.year_performance.length > 0;
  const [hoveredIndex, setHoveredIndex] = useState(hasData ? 0 : -1); 

  useEffect(() => {
    console.log("Item Data:", item?.data);
    console.log("Year Performance:", item?.data?.year_performance);
    console.log("Hovered Index:", hoveredIndex);
  }, [item, hoveredIndex]);

  // If no data is available, show a placeholder UI
  if (!hasData) {
    return <p className="text-black text-center p-6">No data available.</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row bg-[#FBDA1D] rounded-lg overflow-hidden w-full max-w-[1500px] md:p-6 h-full max-h-[700px] mx-auto">
      {/* Left Section */}
      <div className="w-full lg:w-[50%] p-6 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-2xl md:text-5xl lg:text-7xl text-black font-ambit-regular">
            {item.data.title || "Title Unavailable"}
          </h2>
        </div>

        {/* Description Section - Updates on Hover */}
        <div className="mt-4">
          <p className="text-lg md:text-xl font-ambit-bold lg:text-2xl w-[36ch] text-black transition-opacity duration-300">
            {item.data.year_performance[hoveredIndex]?.descrip_percentage ||
              "N/A"}
          </p>
          <p className="text-lg md:text-xl lg:text-2xl w-[36ch] text-black transition-opacity duration-300">
            {item.data.year_performance[hoveredIndex]?.description ||
              "No description available"}
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
              style={{ backgroundColor: bgColors[index] || "#DDD" }} // Default color fallback
              className={`group w-full h-[80px] sm:h-[120px] ${isHovered ? "lg:h-[350px]" : ""} flex flex-col items-center justify-between relative cursor-pointer transition-all sm:pt-6 sm:pb-6`}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {/* Text and Image Container */}
              <div
                className={`absolute top-1/2 left-0 right-0 px-4 transform -translate-y-1/2 flex justify-between items-center font-ambit-regular transition-all ${
                  isHovered ? "lg:top-8 top-8" : ""
                }`}
              >
                <p className="text-xl lg:text-3xl">
                  {performance.year_202324 || "N/A"}
                </p>
                <Image
                  src={hoverImages[index] || "/default-hover.png"} // Default fallback image
                  alt={`Hover Image ${index + 1}`}
                  width={16}
                  height={16}
                  className={`transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
                />
              </div>

              {/* Performance Percentage - Left Aligned */}
              <div
                className={`p-6 absolute top-1/3 flex flex-row justify-start w-full items-end text-black font-ambit-regular transition-opacity ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-sm sm:text-2xl md:text-4xl lg:text-7xl">
                  {performance.percentage || "0%"}
                </p>
                <p className="ml-4 text-sm md:text-xl lg:text-2xl mb-3">
                  Passed
                </p>
              </div>

              {/* Distinction & 1st Class Row */}
              <div
                className={`absolute bottom-0 mb-2 left-4 right-4 flex flex-row justify-around w-full items-center text-black font-ambit-regular transition-opacity ${
                  isHovered ? "opacity-100" : "opacity-0"
                }`}
              >
                <p className="text-xs sm:text-base md:text-2xl">
                  Distinction - {performance.distinction || "N/A"}
                </p>
                <p className="text-xs sm:text-base md:text-2xl">
                  1st Class - {performance.first_class || "N/A"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
