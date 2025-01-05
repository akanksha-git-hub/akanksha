import { forwardRef } from "react";
import Arrow from "@/assets/button-arrow.svg";
import PlayVector from "@/assets/play-vector.svg";
import PencilShading from "@/assets/pencil-shading.svg";
import Image from "next/image";
import { PrismicLink } from "@prismicio/react";

const Button = forwardRef(function Button({ children, isVideo, prismicLink, href, className, ...props }, ref) {

    let baseClass = `bg-v2-orange text-black border border-black transition-all right-0 
                    flex items-center gap-1 font-inter font-bold 
                    w-fit text-sm rounded-full py-2 px-4 relative 
                    z-[1] group-hover:opacity-95 group-hover:right-[2px] 
                    ${className}`;

    const BaseButton = () => (
        <div className="relative group active:scale-95 w-fit">
            <button 
                className={`${baseClass}`}
                {...props}
                ref={ref}
            >
                <span>{children}</span>
                <span className="relative top-[1px] h-4 w-6">
                    <Image 
                        alt="arrow"
                        src={isVideo ? PlayVector : Arrow}
                        fill 
                    />
                </span>
            </button>

            {/* Background effect that stays behind */}
            <div 
                className="
                    w-full h-full absolute top-0 left-0 rounded-full
                    overflow-hidden opacity-0 group-hover:opacity-100
                    group-hover:top-[7px] z-[0]
                    custom-bezier pointer-events-none
                "
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
        </div>
    );
   

    if(prismicLink) {
        return(
            <PrismicLink
                field={prismicLink}
            >
                <BaseButton />
            </PrismicLink>
        )
    }

    return(
        <BaseButton />
    )

});


export default Button;