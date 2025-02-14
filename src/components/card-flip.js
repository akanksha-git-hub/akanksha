import { useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";

export default function CardFlip({ item, i, isSchoolLeaders = false }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <li 
                className={`bg-[#FAFAFA] relative  border border-stone-400 w-full
                    ${isSchoolLeaders ? "h-[240px] md:w-[280px] rounded-[1.5rem]" : "rounded-[2rem] h-[500px] md:h-[428px] md:w-[420px]"} 
                    flip-card group`}
                key={i}
            >
                <span className="h-full flex flex-col items-center justify-center space-y-8 w-full">
                    
                    {/* Bottom shading effect */}
                    <div className="absolute bottom-0 w-full h-[1rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="relative h-full w-[90%] mx-auto">
                            <Image src="/quote-side-down.png" alt="Quote Shading" fill />
                        </div>
                    </div>

                    {!isSchoolLeaders && (
                        <div className="w-32 h-32 md:w-44 md:h-44 flex items-center justify-center rounded-full overflow-hidden">
                            <PrismicNextImage 
                                field={item.image}
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}

                    {/* Name & Position */}
                    <p className="flex flex-col space-y-2 text-center max-w-[90%] font-ambit-regular">
                        <span className={`font-ambit-semibold ${isSchoolLeaders ? "text-3xl md:text-2xl" : "text-4xl md:text-3xl"}`}>
                            {item.name}
                        </span>
                        <span className={`${isSchoolLeaders ? "text-2xl md:text-xl" : "text-3xl md:text-2xl"}`}>
                            {item.position}
                        </span>

                        {!isSchoolLeaders && (
                            <span 
                                className="text-[#F6AC27] text-2xl pt-2 hover:cursor-pointer"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Know More
                            </span>
                        )}
                    </p>
                </span>
            </li>

            {/* Modal */}
            {isModalOpen && !isSchoolLeaders && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-0"
                    onClick={() => setIsModalOpen(false)} 
                >
                    <div 
                        className={`bg-white rounded-2xl shadow-lg p-6 md:p-8 mx-auto relative 
                            ${isSchoolLeaders ? "max-w-md w-full sm:w-[80%]" : "max-w-lg w-full sm:w-[90%]"}`}
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <button 
                            className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 hover:text-gray-800 transition"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✕
                        </button>

                        {!isSchoolLeaders && (
                            <div className="w-24 h-24 md:w-32 md:h-32 mx-auto flex items-center justify-center rounded-full overflow-hidden mb-4">
                                <PrismicNextImage 
                                    field={item.image}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        )}

                        {/* Name & Position */}
                        <h2 className="font-ambit-regular text-2xl md:text-xl font-bold text-center">{item.name}</h2>
                        <p className="font-ambit-regular text-lg md:text-base text-center text-black">{item.position}</p>

                        {/* Description */}
                        <div className="px-6 md:px-8 font-normal text-black text-base sm:text-lg mt-4 space-y-3">
                            <p>{item.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
