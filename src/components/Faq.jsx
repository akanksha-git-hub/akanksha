'use client'
import { spanPosition } from "@/utils/helperClasses";
import MixedText from "./Texts/MixedText";
import FaqItem from "./UI/FAQ/FaqTrigger";
import { useState } from "react";
import RichText from "./Texts/RichText";


export default function Faq({ className, title, titleClassName, index, dataItems }) {

    const [triggerAccordion, setTriggerAccordion] = useState(null);

    const handleAccordionTrigger = (i) => {
        if(triggerAccordion === i) {
            setTriggerAccordion(() => null);
        } else {
            setTriggerAccordion(() => i);
        }
    };

  return (
    <div className={`${className} flex flex-col`}>
        {/* <MixedText
            className={`${titleClassName} mb-12`} 
            texts={title}
            index={index}
        /> */}
        <RichText 
            className={`${titleClassName} mb-12`} 
            text={title}
        />
        <ul className="space-y-6">
            {dataItems.length > 0 && (
                dataItems.map((dataItem, index) => (
                    <FaqItem 
                        key={index} answer={dataItem.answer} 
                        question={dataItem.question} 
                        index={index}
                        checkIndex={triggerAccordion}
                        onClick={() => handleAccordionTrigger(index)}
                    />
                ))
            )}
        </ul>
    </div>
  )
}
