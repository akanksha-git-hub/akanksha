'use client'
import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import Tabs from "./Tabs";
import PartnerLogo from "./PartnerLogo";

export default function TabContainer({ slice }) {

    const INITIAL_STATE = {
        text: slice.primary.tab_a_text,
        description: slice.primary.tab_a_description
    }

    const [tabState, setTabState] = useState(INITIAL_STATE);

    const switchTab = (data) => setTabState(() => ({ text: data.text, description: data.description }));

    const FILTERED_IMAGES = slice.primary.images.filter(image => {

        const tabId = image.tabidentifier.toLowerCase();
        const activeTab = tabState.text.toLowerCase();

        return tabId === activeTab;

    });

    return(
        <div className="mt-16">
            <Tabs 
                handleClick={switchTab}
                slice={slice}
                tabState={tabState}
            />
            <div 
                className="text-black font-ambit-regular text-xl mt-16 w-full lg:w-[70%] "
            >
                <PrismicRichText 
                    field={tabState.description}
                />
            </div>
            {FILTERED_IMAGES && (
                <ul className="mt-12 flex flex-wrap w-full">
                    {FILTERED_IMAGES.map((image, index) => (
                        <PartnerLogo 
                            image={image.image}
                            key={index}
                            imageClassName="h-[80%] w-[80%] object-contain"
                            className="flex items-center justify-center border border-[#DCDCDC] sm:mb-0 h-[12rem] w-full sm:h-[8rem] md:w-[30%] lg:w-[20%]"              
                        />
                    ))}
                </ul>
            )}
        </div>
    )
}
