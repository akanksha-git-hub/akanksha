import Image from "next/image";
import SmallArrow from '@/assets/button-arrow-small.svg';

export default function NavItemDropDownText({ className, text }) {

    return(
        <p className={`${className} flex items-center gap-2 group hover:opacity-95 transition-all`}>
            <span>{text}</span>
            <span className="relative h-4 w-3 top-0 group-hover:top-1 group-hover:scale-95 transition-all">
                <Image 
                    src={SmallArrow}
                    fill
                    alt="arrow"
                />    
            </span>
        </p>
    )
}