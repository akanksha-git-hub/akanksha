'use client'
import React, { memo, useState, cloneElement } from "react";
import TabContent from "./tab-content";
import TabSelectors from "./tab-selectors";
import Image from "next/image";

const TabContainer = memo(function TabContainer({ tabValues, data, RenderElement, className }) {

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
            className="flex md:justify-center  flex-wrap md:gap-24 gap-8 text-nowrap whitespace-nowrap overflow-x-hidden mt-12"
        >
            <TabSelectors 
                values={tabValues}
                setValue={setGrabValue}
                index={grabValue.index}
            />
        </ul>
        <TabContent className={className}>
           {tabContent && (
            tabContent.map((item, i) => {
                return React.cloneElement(<RenderElement />, { item, i })
             })
           )}
        </TabContent>
        </>
    )
});


export default TabContainer;