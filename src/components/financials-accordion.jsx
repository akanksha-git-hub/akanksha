'use client'
import { PrismicLink } from "@prismicio/react";
import Accordion from "./Accordion/Accordion"
import AccordionTitleItemA from "./Accordion/AccordionTitleItemA"
import RichText from "./Texts/RichText";
import { useEffect, useState } from "react";
import Skeleton from "./Skeleton";

export default function FinancialsAccordion({ item }) {

    const [onMount, setOnMount] = useState(false);
    useEffect(() => {
        if(!onMount) {
            setOnMount(() => true);
            return;
        }
    }, [onMount]);

    const hasItems = item.fcra_document_link && item.fcra_document_link.length > 0;

    if(!onMount) return <Skeleton count={5} itemClassName='h-24' />

    // --- FIX #1: Correctly calculate lengths to avoid dropping the last item ---
    const dataLength = item.year_groups.length;
    if(dataLength > 1) {

        const halfDataLength = Math.ceil(dataLength / 2); // Use Math.ceil for odd numbers
        const firstHalfDataSet = item.year_groups.slice(0, halfDataLength);
        const secondHalfDataSet = item.year_groups.slice(halfDataLength); // Slicing from midpoint to the end

        return(
            <div className="grid grid-cols-1 place-content-center gap-x-12 md:grid-cols-2 w-full lg:w-[880px] 3xl:w-[1000px] lg:mx-auto">
                <Accordion className='flex flex-wrap items-start justify-start h-fit'>
                    {firstHalfDataSet.map((year, index) => {
            
                        // --- FIX #2 (Part 1): Replaced the entire buggy filtering logic with a simple, correct version ---
                        const categorizedYearsData = item.fcra_document_link.filter((doc) => {
                            // Get the start year, e.g., "2015" from "2015 - 2016"
                            const startYear = year.year.split(" ")[0];
                            // Match if the document's identifier is the same as the starting year.
                            return doc.year_identifier === startYear;
                        });
            
                        const isFcraFinancials = categorizedYearsData.filter(item => {
                            const isFcraFinancials = item.is_fcra_financials === true;
                            return isFcraFinancials;
                        }).map(item => {
                            return(
                                <div key={item.title}> {/* Using item.title for key as identifier might not be unique in the filtered list */}
                                    {
                                        item ? 
                                        <AccordionLink
                                            className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
                                            field={item.cta_link} 
                                        >
                                            {item.title}
                                        </AccordionLink>
                                        :
                                        <RichText 
                                            text='-'
                                            className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
                                        />
                                    }
                                </div>
                            )
                        });
            
                        const isFcraQuarterlyReports = categorizedYearsData.filter(item => {
                            const isFcraQuarterlyReports = item.is_fcra_financials === false;
                            return isFcraQuarterlyReports;
                        }).map(item => {
                            return(
                                <div key={item.title}> {/* Using item.title for key as identifier might not be unique in the filtered list */}
                                    {
                                        item ? 
                                        <AccordionLink
                                            className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
                                            field={item.cta_link} 
                                        >
                                            {item.title}
                                        </AccordionLink>
                                        :
                                        <RichText 
                                            text='-'
                                            className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
                                        />
                                    }
                                </div>
                            )
                        });
            
                        return(
                            <Accordion.Item className='border border-[#DCDCDC] h-fit w-full p-4' key={index} id={index}>
                                <Accordion.Title
                                    className='flex items-center justify-between cursor-pointer transition-all opacity-55 hover:opacity-100'
                                >
                                    <AccordionTitleItemA 
                                        text={year.year}
                                        className="font-ambit-semibold text-2xl text-deep-green hover:text-black transition-all"                        
                                    />
                                </Accordion.Title>
                                <Accordion.Content className="space-y-2">
                                    <div className="border-t border-[#DCDCDC] pt-4 mt-4">
                                        {/* <RichText 
                                            text='FCRA Quarterly Reports'
                                            className='font-ambit-semibold text-deep-green text-lg pb-2'
                                        /> */}
                                        {hasItems && (<div className="space-y-2">{isFcraQuarterlyReports}</div>)}
                                    </div>
                                    <div className=" pt-4 mt-4">
                                        {/* <RichText 
                                            text='FCRA Financials'
                                            className='font-ambit-semibold text-deep-green text-lg pb-2'
                                        /> */}
                                        {hasItems && (<div className="space-y-2">{isFcraFinancials}</div>)}
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>
                        )
                    })}
                </Accordion>
                <Accordion className='flex flex-wrap items-start justify-start h-fit'>
                    {secondHalfDataSet.map((year, index) => {
            
                        // --- FIX #2 (Part 2): Applied the same fix to the second column's logic ---
                        const categorizedYearsData = item.fcra_document_link.filter((doc) => {
                            // Get the start year, e.g., "2015" from "2015 - 2016"
                            const startYear = year.year.split(" ")[0];
                            // Match if the document's identifier is the same as the starting year.
                            return doc.year_identifier === startYear;
                        });
            
                        const isFcraFinancials = categorizedYearsData.filter(item => {
                            const isFcraFinancials = item.is_fcra_financials === true;
                            return isFcraFinancials;
                        }).map(item => {
                            return(
                                <div key={item.title}> {/* Using item.title for key as identifier might not be unique in the filtered list */}
                                    {
                                        item ? 
                                        <AccordionLink
                                            className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
                                            field={item.cta_link} 
                                        >
                                            {item.title}
                                        </AccordionLink>
                                        :
                                        <RichText 
                                            text='-'
                                            className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
                                        />
                                    }
                                </div>
                            )
                        });
            
                        const isFcraQuarterlyReports = categorizedYearsData.filter(item => {
                            const isFcraQuarterlyReports = item.is_fcra_financials === false;
                            return isFcraQuarterlyReports;
                        }).map(item => {
                            return(
                                <div key={item.title}> {/* Using item.title for key as identifier might not be unique in the filtered list */}
                                    {
                                        item ? 
                                        <AccordionLink
                                            className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
                                            field={item.cta_link} 
                                        >
                                            {item.title}
                                        </AccordionLink>
                                        :
                                        <RichText 
                                            text='-'
                                            className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
                                        />
                                    }
                                </div>
                            )
                        });
            
                        return(
                            <Accordion.Item className='border border-[#DCDCDC] h-fit w-full p-4' key={index} id={index}>
                                <Accordion.Title
                                    className='flex items-center justify-between cursor-pointer transition-all opacity-55 hover:opacity-100'
                                >
                                    <AccordionTitleItemA 
                                        text={year.year}
                                        className="font-ambit-semibold text-2xl text-deep-green hover:text-black transition-all"                        
                                    />
                                </Accordion.Title>
                                <Accordion.Content className="space-y-2">
                                    <div className="border-t border-[#DCDCDC] pt-4 mt-4">
                                        {/* <RichText 
                                            text='FCRA Quarterly Reports'
                                            className='font-ambit-semibold text-deep-green text-lg pb-2'
                                        /> */}
                                        {hasItems && (<div className="space-y-2">{isFcraQuarterlyReports}</div>)}
                                    </div>
                                    <div className="border-t border-[#DCDCDC] pt-4 mt-4">
                                        {/* <RichText 
                                            text='FCRA Financials'
                                            className='font-ambit-semibold text-deep-green text-lg pb-2'
                                        /> */}
                                        {hasItems && (<div className="space-y-2">{isFcraFinancials}</div>)}
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>
                        )
                    })}
                </Accordion>
            </div>
        )
    }

    return null;
}

function AccordionLink({ children, className, ...props }) { return <PrismicLink {...props} target="_blank" className={className}>{children}</PrismicLink> }