'use client'
import Image from "next/image";

export default function GridA({ item, i }) {

    return(
        <li 
            key={i}
            className="flex flex-col space-y-6 w-full xl:w-2/4 our-schools-grid py-12 px-6 font-ambit-regular transition-all opacity-45 hover:opacity-100"
        >    
            <p className="text-deep-green flex flex-col space-y-2 md:space-y-0 md:flex-row items-start justify-between">
                <span className="text-3xl w-full md:max-w-[70%] 3xl:max-w-[28ch]">{item.body_name}</span>
                <span className="flex flex-col">
                    <span className="font-ambit-semibold max-w-[15ch] uppercase text-xl">{item.position}</span>
                    <span className="text-lg">{item.name}</span>
                </span>
            </p>
            <p className="text-deep-green flex items-center gap-4">
                <Image 
                    src='/location_icon.svg'
                    alt=""
                    height={30}
                    width={30}
                />
                <span className="w-[20ch]text-lg leading-6">{item.location}</span>
            </p>
        </li>
    )

}   