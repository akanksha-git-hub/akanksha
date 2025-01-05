export default function CardA({item}) {

    console.log(item);
    
    return (

        <div className="bg-[#F6AC27] rounded-lg shadow-lg   mx-auto w-[90%] md:max-w-[1617px] md:aspect-[1617/724]">
        <div className="flex flex-col md:flex-row  h-full w-full">
            {/* Section 1 */}
            <div className="flex-1 p-12 flex flex-col justify-between">
                {/* Top Section */}
                <div>
                    <h1 className="text-7xl md:text-8xl text-black font-ambit-regular">94%</h1>
                    <p className="text-xl md:text-xl mt-2 text-black font-ambit-regular">Passed</p>
                </div>
                {/* Bottom Section */}
                <div className="mt-4">
                    <p className="text-black text-lg md:text-3xl w-[28ch]">
                        In AY 2023-24, 438 Akanksha school alumni appeared for the HSC exams, of which 94% passed.
                    </p>
                </div>
            </div>
    
            {/* Section 2 */}
            <div className="flex-1 flex flex-col justify-end ">
                <div className="relative h-36 md:h-48 w-full flex justify-center items-end space-x-4">
                    {/* First Chart */}
                    <div className="bg-[#FBDA1D] w-[60px] h-[120%] md:w-[120px] md:h-[210%]"></div>
                    {/* Second Chart */}
                    <div className="bg-[#55BBD3] w-[60px] h-[50%] md:w-[120px] md:h-[70%]"></div>
                </div>
            </div>
        </div>
    </div>
    
    );
}
