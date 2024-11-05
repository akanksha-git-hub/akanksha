'use client'

import { createContext, useContext, useState } from "react"
import AccordionTitle from "./AccordionTitle";
import AccordionItem from "./AccordionItem";
import AccordionContent from "./AccordionContent";


const INITIAL_VALUES = {
    openItemId: null,
    toggleItem: (id) => {},
}

const AccordionContext = createContext(INITIAL_VALUES);


export function useAccordionContext() {
    const ctx = useContext(AccordionContext);

    if(!ctx) throw new Error('Must be wrapped under <Accordion>');

    return ctx;

}

export default function Accordion({ children, className }) {

    const [openItemId, setOpenItemId] = useState(null);

    const toggleItem = (id) =>  setOpenItemId(prevState => prevState === id ? null : id);

    const ctxValues = {
        openItemId,
        toggleItem,
    }

    return(
        <AccordionContext.Provider value={ctxValues}>
            <ul className={className}> 
                {children}
            </ul>
        </AccordionContext.Provider>
    )

}

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;