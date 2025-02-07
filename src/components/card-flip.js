import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";

export default function CardFlip({ item, i }) {
    return (
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
                    <span className="text-4xl font-ambit-semibold">{item.name}</span>
                    <span className="text-3xl">{item.position}</span>
                    <span className="text-[#F6AC27] text-2xl pt-2 hover:cursor-pointer">Know More</span>
                </p>

            </span>
        </li>
    );
}
