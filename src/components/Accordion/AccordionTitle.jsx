import { useAccordionContext } from "./Accordion"
import { useAccordionItemContext } from "./AccordionItem";

export default function AccordionTitle({ children, className }) {

    const { toggleItem } = useAccordionContext();
    const id = useAccordionItemContext();
 
  return (
    <div onClick={() => toggleItem(id)} className={className}>
      {children}
    </div>
  )
}
