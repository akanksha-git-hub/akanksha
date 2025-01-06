'use client'

import Image from "next/image";
import { memo } from "react";
import PinLocation from "@/assets/pin-location.svg";

    const TabSelectors = memo(function TabSelectors({ values, setValue, index }) {
        const selectors = values;
        const handleClick = (i, text) => setValue(prevState => ({ ...prevState, index: i, value: text }));

        if(selectors) {
            return(
                <>
                {selectors.map((item, i) => {
                    return(
                        <li 
                            onClick={() => handleClick(i, item.lowerCaseValue)}
                            key={item.originalValue}
                            className={`
                                text-deep-green font-ambit-regular text-3xl cursor-pointer transition-all flex items-center
                                ${index === i ? 'opacity-100' : 'opacity-45'}`}
                        >
                            <Image 
                                src={PinLocation}
                                alt="img"
                                height={30}
                                width={30}
                                className="relative bottom-1"
                            />
                            {item.originalValue}
                        </li>
                    )
                })}
                </>
            )
    }})

export default TabSelectors;
