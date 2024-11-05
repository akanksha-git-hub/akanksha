import Image from "next/image";
import RichText from "../Texts/RichText";
import { useAccordionContext } from "./Accordion";
import { useAccordionItemContext } from "./AccordionItem";

export default function AccordionTitleItemA({ text, className }) {

    const { openItemId } = useAccordionContext();
    const id = useAccordionItemContext();

  return (
    <>
        <RichText 
            text={text}
            className={className}
        />
        <Image 
            src='/accordion-arrow-A.svg'
            height={14}
            width={14}
            alt="arrow"
            className={`transition-all ${openItemId === id ? 'rotate-180' : 'rotate-0'}`}
        />
    </>
  )
}
