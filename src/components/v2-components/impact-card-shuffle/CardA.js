export default function CardA({ item }) {
 
  return (
    <div className="bg-[#F6AC27] rounded-lg shadow-lg  h-full">
      <div className="flex flex-col md:flex-row  h-full w-full">
        {/* Section 1 */}
        <div className="w-full md:w-[50%] md:p-12 p-8 flex flex-col justify-between">
          {/* Top Section */}
          <div className="flex flex-col  justify-center">
            <p className="text-xl md:text-3xl text-black font-ambit-regular">
              {item.data.heading}
            </p>
            <h1 className="text-2xl md:text-5xl lg:text-8xl text-black font-ambit-regular">
              {item.data.title}
            </h1>
            <p className="text-xl md:text-xl  text-black font-ambit-regular">
              {item.data.subtitle}
            </p>
          </div>
          {/* Bottom Section */}
          <div className="mt-4">
            <p className="text-black text-lg md:text-xl lg:text-3xl w-[28ch]">
              {item.data.description}
            </p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="w-full md:w-[50%] flex flex-col justify-end">
          <div className="relative h-36 md:h-48 w-full flex justify-center items-end ">
            {/* First (White) Chart */}
            <div className="relative bg-white w-[20%] h-[100%] md:w-[150px] md:h-[200%] flex flex-col justify-between items-center">
              <p className="text-black font-ambit-semibold text-lg md:text-4xl mt-4">
                {item.data.chart_1_percentage}
              </p>
              <p className="ext-black font-medium text-sm md:text-xl mt-auto mb-2">
                {item.data.chart_1_year}
              </p>
            </div>

            {/* Second (Yellow) Chart */}
            <div className="relative bg-[#FBDA1D] w-[20%] h-[80%] md:w-[150px] md:h-[120%] flex flex-col justify-between items-center">
              <p className="text-black font-ambit-semibold text-lg md:text-4xl mt-4">
                {item.data.chart_2_percentage}
              </p>
              <p className="text-black font-medium text-sm md:text-xl mt-auto mb-2">
                {item.data.chart_2_year}
              </p>
            </div>

            {/* Third (Blue) Chart */}
            <div className="relative bg-[#55BBD3] w-[20%] h-[50%] md:w-[150px] md:h-[80%] flex flex-col justify-between items-center">
              <p className="text-black font-ambit-semibold text-lg md:text-4xl mt-4">
                {item.data.chart_3_percentage}
              </p>
              <p className="ext-black font-medium text-sm md:text-xl mt-auto mb-2">
                {item.data.chart_3_year}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
