'use client'
import { createContext, useContext } from "react"

const INITIAL_VALUE = {
  id: null
}

const AccordionItemContext = createContext(INITIAL_VALUE);

export function useAccordionItemContext() {
  const ctx = useContext(AccordionItemContext);

  if(!ctx) throw new Error('Accordion-Item related components must be wrapped under <Accordion.Item>');

  return ctx;
  
}


export default function AccordionItem({ id, children, className }) {


  const ctxValues = { id };

  return (
    <AccordionItemContext.Provider value={ctxValues}>
      <li className={className}>{children}</li>
    </AccordionItemContext.Provider>
  )
}
