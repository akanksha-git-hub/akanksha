export default function CardB({item}) {
    console.log(item);
    
    return (
        <div className="bg-[#58BCD4] rounded-lg shadow-lg h-full md:p-0 pl-6 pt-6 pb-6">
        <div className="flex flex-col md:flex-row justify-between h-full w-full">
            {/* Section 1 */}
            <div className="w-full md:w-2/4  md:p-12 flex flex-col justify-between">
                {/* Top Section */}
                <div>
                    <h1 className="text-4xl md:text-7xl text-[#37473C] font-ambit-regular">HSC  
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
            <div className="w-full md:w-2/4   border border-red-400">
    {/* Rotated Container */}
    <div className=" flex flex-col justify-evenly  w-full h-full ">
        {/* First Chart */}
        <div className="bg-[#FBDA1D]  w-full"><div className="p-2">Year 2023-24</div></div>
        {/* Second Chart */}
        <div className="bg-[#F6AC27]  w-full">Year 2023-24</div>
        {/* Third Chart */}
        <div className="bg-[#ECF0F1] w-full">Year 2023-24</div>
    </div>
</div>

        </div>
    </div>
    
    );
}
