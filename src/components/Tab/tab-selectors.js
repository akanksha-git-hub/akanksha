'use client'

import { memo, useState } from "react";


    const TabSelectors = memo(function TabSelectors({ values, setValue }) {
            console.log('C')
        const [selected, setSelected] = useState(0);
        const selectors = values;

        const handleClick = (i) => {
            setSelected(() => i);
            setValue(() => i);
        }

        if(selectors) {
            return(
                <>
                {selectors.map((item, i) => {
                    return(
                        <li 
                            onClick={() => handleClick(i)}
                            key={item.originalValue}
                            className={`
                                text-deep-green font-ambit-regular text-3xl cursor-pointer transition-all
                                ${selected === i ? 'opacity-100' : 'opacity-45'}
                                `}
                        >
                            {item.originalValue}
                        </li>
                    )
                })}
                </>
            )
    }})

export default TabSelectors;
