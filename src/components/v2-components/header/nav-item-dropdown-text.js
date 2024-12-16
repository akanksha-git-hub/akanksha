import Image from "next/image";
import SmallArrow from '@/assets/button-arrow-small.svg';
import { useHeaderDropDownContext } from "./header";

export default function NavItemDropDownText({ className, text, ...props }) {

    const { dropDownState: { id, isActive }} = useHeaderDropDownContext();

    const targetText = text.toLowerCase();

    return(
        <button 
            className={`${className} flex items-center gap-2 group hover:opacity-95 active:scale-95 transition-all`}
            {...props}
        >
            <span>{text}</span>
            <span className={`
                    relative h-4 w-3 top-0 transition-all
                    ${(id === targetText) && isActive && 'rotate-180'}
                `}>
                <Image 
                    src={SmallArrow}
                    fill
                    alt="arrow"
                />    
            </span>
        </button>
    )
}