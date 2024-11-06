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
    //     return (
    //         <div className="h-fit border border-red-500">
    //             <Accordion className='flex flex-wrap h-fit items-start justify-start'>
    //                 {item.year_groups.map((year, index) => {
            
    //                     const categorizedYearsData = item.fcra_document_link.filter((item) => {
            
    //                         const items = year.year.split(" ");
    //                         const itemsLength = items.length;
            
    //                         let targetItem;
    //                         let itemLength;
    //                         let yearCategory;
            
    //                         if(itemsLength > 2) {
    //                             targetItem = items[2];
    //                         } else {
    //                             targetItem = items[1];
    //                         }
            
    //                         if(targetItem) {
    //                             itemLength = targetItem.split("").length;
    //                             if(itemLength > 4) {
    //                                 yearCategory = targetItem.split("").splice(1, itemLength).join("");
    //                             } else {
    //                                 yearCategory = targetItem.split(" ").join(" ");
    //                             }
    //                         }
            
    //                         const matchData = yearCategory === item.year_identifier;
            
    //                         return matchData;
                            
    //                     });
            
    //                     const isFcraFinancials = categorizedYearsData.filter(item => {
    //                         const isFcraFinancials = item.is_fcra_financials === true;
    //                         return isFcraFinancials;
    //                     }).map(item => {
    //                         return(
    //                             <div key={item.year_identifier}>
    //                                 {
    //                                     item ? 
    //                                     <AccordionLink
    //                                         className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
    //                                         href={item.file_link} 
    //                                         download
    //                                     >
    //                                         {item.title}
    //                                     </AccordionLink>
    //                                     :
    //                                     <RichText 
    //                                         text='-'
    //                                         className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
    //                                     />
    //                                 }
    //                             </div>
    //                         )
    //                     });
            
    //                     const isFcraQuarterlyReports = categorizedYearsData.filter(item => {
    //                         const isFcraQuarterlyReports = item.is_fcra_financials === false;
    //                         return isFcraQuarterlyReports;
    //                     }).map(item => {
    //                         return(
    //                             <div key={item.year_identifier}>
    //                                 {
    //                                     item ? 
    //                                     <AccordionLink
    //                                         className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
    //                                         href={item.file_link} 
    //                                         download
    //                                     >
    //                                         {item.title}
    //                                     </AccordionLink>
    //                                     :
    //                                     <RichText 
    //                                         text='-'
    //                                         className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
    //                                     />
    //                                 }
    //                             </div>
    //                         )
    //                     });
            
    //                     return(
    //                         <Accordion.Item className='border border-[#DCDCDC] h-fit w-[45%] p-4' key={index} id={index}>
    //                             <Accordion.Title
    //                                 className='flex items-center justify-between cursor-pointer transition-all opacity-55 hover:opacity-100'
    //                             >
    //                                 <AccordionTitleItemA 
    //                                     text={year.year}
    //                                     className="font-ambit-semibold text-2xl text-deep-green hover:text-black transition-all"                        
    //                                 />
    //                             </Accordion.Title>
    //                             <Accordion.Content className="space-y-2">
    //                                 <div className="border-t border-[#DCDCDC]">
    //                                     <RichText 
    //                                         text='FCRA Quarterly Reports'
    //                                         className='font-ambit-semibold text-deep-green text-lg pt-2'
    //                                     />
    //                                     {hasItems && (<div className="space-y-2">{isFcraQuarterlyReports}</div>)}
    //                                 </div>
    //                                 <div className="border-t border-[#DCDCDC]">
    //                                     <RichText 
    //                                         text='FCRA Financials'
    //                                         className='font-ambit-semibold text-deep-green text-lg pt-2'
    //                                     />
    //                                     {hasItems && (<div className="space-y-2">{isFcraFinancials}</div>)}
    //                                 </div>
    //                             </Accordion.Content>
    //                         </Accordion.Item>
    //                     )
    //                 })}
    //             </Accordion>
    //         </div>
    //     )
    // } else {

    const dataLength = item.year_groups.length - 1;
    if(dataLength > 1) {

        const halfDataLength = dataLength / 2;
        const firstHalfDataSet = item.year_groups.slice(0, halfDataLength);
        const secondHalfDataSet = item.year_groups.slice(halfDataLength, dataLength);

        return(
            <div className="grid grid-cols-1 place-content-center gap-x-12 md:grid-cols-2 w-full lg:w-[880px] 3xl:w-[1000px] lg:mx-auto">
                <Accordion className='flex flex-wrap items-start justify-start h-fit'>
                    {firstHalfDataSet.map((year, index) => {
            
                        const categorizedYearsData = item.fcra_document_link.filter((item) => {
            
                            const items = year.year.split(" ");
                            const itemsLength = items.length;
            
                            let targetItem;
                            let itemLength;
                            let yearCategory;
            
                            if(itemsLength > 2) {
                                targetItem = items[2];
                            } else {
                                targetItem = items[1];
                            }
            
                            if(targetItem) {
                                itemLength = targetItem.split("").length;
                                if(itemLength > 4) {
                                    yearCategory = targetItem.split("").splice(1, itemLength).join("");
                                } else {
                                    yearCategory = targetItem.split(" ").join(" ");
                                }
                            }
            
                            const matchData = yearCategory === item.year_identifier;
            
                            return matchData;
                            
                        });
            
                        const isFcraFinancials = categorizedYearsData.filter(item => {
                            const isFcraFinancials = item.is_fcra_financials === true;
                            return isFcraFinancials;
                        }).map(item => {
                            return(
                                <div key={item.year_identifier}>
                                    {
                                        item ? 
                                        <AccordionLink
                                            className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
                                            href={item.file_link} 
                                            download
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
                                <div key={item.year_identifier}>
                                    {
                                        item ? 
                                        <AccordionLink
                                            className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
                                            href={item.file_link} 
                                            download
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
                                    <div className="border-t border-[#DCDCDC]">
                                        <RichText 
                                            text='FCRA Quarterly Reports'
                                            className='font-ambit-semibold text-deep-green text-lg pt-2'
                                        />
                                        {hasItems && (<div className="space-y-2">{isFcraQuarterlyReports}</div>)}
                                    </div>
                                    <div className="border-t border-[#DCDCDC]">
                                        <RichText 
                                            text='FCRA Financials'
                                            className='font-ambit-semibold text-deep-green text-lg pt-2'
                                        />
                                        {hasItems && (<div className="space-y-2">{isFcraFinancials}</div>)}
                                    </div>
                                </Accordion.Content>
                            </Accordion.Item>
                        )
                    })}
                </Accordion>
                <Accordion className='flex flex-wrap items-start justify-start h-fit'>
                    {secondHalfDataSet.map((year, index) => {
            
                        const categorizedYearsData = item.fcra_document_link.filter((item) => {
            
                            const items = year.year.split(" ");
                            const itemsLength = items.length;
            
                            let targetItem;
                            let itemLength;
                            let yearCategory;
            
                            if(itemsLength > 2) {
                                targetItem = items[2];
                            } else {
                                targetItem = items[1];
                            }
            
                            if(targetItem) {
                                itemLength = targetItem.split("").length;
                                if(itemLength > 4) {
                                    yearCategory = targetItem.split("").splice(1, itemLength).join("");
                                } else {
                                    yearCategory = targetItem.split(" ").join(" ");
                                }
                            }
            
                            const matchData = yearCategory === item.year_identifier;
            
                            return matchData;
                            
                        });
            
                        const isFcraFinancials = categorizedYearsData.filter(item => {
                            const isFcraFinancials = item.is_fcra_financials === true;
                            return isFcraFinancials;
                        }).map(item => {
                            return(
                                <div key={item.year_identifier}>
                                    {
                                        item ? 
                                        <AccordionLink
                                            className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
                                            href={item.file_link} 
                                            download
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
                                <div key={item.year_identifier}>
                                    {
                                        item ? 
                                        <AccordionLink
                                            className="font-ambit-regular text-deep-green text-base transition-all hover:opacity-55"
                                            href={item.file_link} 
                                            download
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
                                    <div className="border-t border-[#DCDCDC]">
                                        <RichText 
                                            text='FCRA Quarterly Reports'
                                            className='font-ambit-semibold text-deep-green text-lg pt-2'
                                        />
                                        {hasItems && (<div className="space-y-2">{isFcraQuarterlyReports}</div>)}
                                    </div>
                                    <div className="border-t border-[#DCDCDC]">
                                        <RichText 
                                            text='FCRA Financials'
                                            className='font-ambit-semibold text-deep-green text-lg pt-2'
                                        />
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

}

function AccordionLink({ children, className, ...props }) { return <PrismicLink {...props} className={className}>{children}</PrismicLink> }
