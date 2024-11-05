import { useAccordionContext } from "./Accordion"
import { useAccordionItemContext } from "./AccordionItem";


export default function AccordionContent({ children, className='' }) {

    const { openItemId } = useAccordionContext();
    const id = useAccordionItemContext();

  return (
    <div className={`${className} ${openItemId === id ? 'active-height' : 'in-active-height'} overflow-hidden`}>
      {children}
    </div>
  )
}
