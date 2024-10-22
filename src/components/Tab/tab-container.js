'use client'
import { memo, useState } from "react";
import TabContent from "./tab-content";
import TabSelectors from "./tab-selectors";
import Image from "next/image";

const TabContainer = memo(function TabContainer({ children, tabValues, data }) {

    const [grabValue, setGrabValue] = useState({ index: 0, value: tabValues[0].lowerCaseValue });

    const tabContent = data
                        .filter(item =>  {
                            const lowerCaseValue = item.identifier.toLowerCase();
                            const matchData = lowerCaseValue === grabValue.value;
                            return matchData;
                        });

    return (
        <>
        <ul 
            className="flex items-center justify-center 
                md:flex-wrap gap-24 text-nowrap whitespace-nowrap 
                overflow-x-scroll md:overflow-x-hidden mt-12 border border-red-500 pl-12"
        >
            <TabSelectors 
                values={tabValues}
                setValue={setGrabValue}
                index={grabValue.index}
            />
        </ul>
        <TabContent className="flex xl:border-t xl:border-deep-green flex-wrap mt-12">
           {tabContent && (
            tabContent.map((item, i) => {
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

            })
           )}
        </TabContent>
        {children}
        </>
    )
});


export default TabContainer;