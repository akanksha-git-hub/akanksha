'use client'
import { memo, useState } from "react";
import TabContent from "./tab-content";
import TabSelectors from "./tab-selectors";

const TabContainer = memo(function TabContainer({ children, values }) {

    console.log('A')
    const [grabValue, setGrabValue] = useState(null);

    return (
        <>
        <ul 
            className="flex items-center justify-center 
                md:flex-wrap gap-24 text-nowrap whitespace-nowrap 
                overflow-x-scroll md:overflow-x-hidden mt-12"
        >
            <TabSelectors 
                values={values}
                setValue={setGrabValue}
            />
        </ul>
        <TabContent>
            {grabValue}
        </TabContent>
        {children}
        </>
    )
});


export default TabContainer;