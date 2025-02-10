import { useState, useEffect } from "react";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";

export default function CardFlip({ item, i }) {
    const [isModalOpen, setIsModalOpen] = useState(false);


    return (
        <>
            <li 
                className="bg-[#FAFAFA] relative rounded-[2rem] border border-stone-400 w-full h-[500px] md:h-[428px] md:w-[420px] flip-card group" 
                key={i}
            >
                <span className="h-full flex flex-col items-center justify-center space-y-8 w-full">
                    
                    {/* Quote Image (Hidden by Default, Shown on Hover) */}
                    <div className="absolute bottom-0 w-full h-[1rem] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="relative h-full w-[90%] mx-auto">
                            <Image src="/quote-side-down.png" alt="Quote Shading" fill />
                        </div>
                    </div>

                    {/* Avatar Image */}
                    <div className="w-44 h-44 flex items-center justify-center rounded-full overflow-hidden">
                        <PrismicNextImage 
                            field={item.image}
                            className="object-cover w-full h-full"
                        />
                    </div>

                    {/* Text Content */}
                    <p className="flex flex-col space-y-2 text-center max-w-[90%] font-ambit-regular">
                        <span className="text-4xl md:text-3xl font-ambit-semibold">{item.name}</span>
                        <span className="text-3xl md:text-2xl">{item.position}</span>
                        <span 
                            className="text-[#F6AC27] text-2xl pt-2 hover:cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Know More
                        </span>
                    </p>
                </span>
            </li>

            {/* Modal */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4  sm:px-0"
                    onClick={() => setIsModalOpen(false)} // Close modal when clicking outside
                >
                    <div 
                        className="bg-white rounded-2xl shadow-lg p-6 md:p-8 max-w-lg w-full sm:w-[90%] mx-auto relative"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
                    >
                        {/* Close Button */}
                        <button 
                            className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full text-gray-600 hover:bg-gray-300 hover:text-gray-800 transition"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ✕
                        </button>

                        {/* Avatar */}
                        <div className="w-32 h-32 mx-auto flex items-center justify-center rounded-full overflow-hidden mb-4">
                            <PrismicNextImage 
                                field={item.image}
                                className="object-cover w-full h-full"
                            />
                        </div>

                        {/* Name & Position */}
                        <h2 className=" font-ambit-regular text-3xl md:text-2xl font-bold text-center">{item.name}</h2>
                        <p className="font-ambit-regular text-xl md:text-lg text-center text-black">{item.position}</p>

                        {/* Description (Multi-Paragraph) */}
                        <div className=" px-8 font-ambit-regular mt-4 text-lg md:text-base text-black space-y-3">
                          
                          <p>{item.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
