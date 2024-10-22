'use client'

import { memo, useState } from "react";


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
                                text-deep-green font-ambit-regular text-3xl cursor-pointer transition-all
                                ${index === i ? 'opacity-100' : 'opacity-45'}
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
