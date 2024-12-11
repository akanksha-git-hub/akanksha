export default function FaqItem({ answer, question, onClick, index, checkIndex }) {

    let className = "accordion-plus";
    let heightClassName = "in-active-height";

    if(checkIndex === index) {
        className = "accordion-plus-rotate";
        heightClassName = "active-height";
    }

  return (
    <li className="border-b border-[#D2D2D2] pb-6">
        <p onClick={onClick} className="text-deep-green text-xl font-ambit-regular flex items-center justify-between cursor-pointer transition-all xl:hover:opacity-75 active:opacity-75">
            {question} 
            <span className={`${className} rounded-[0.7rem] border border-[#D2D2D2] bg-v2-orange`}>
            </span>
        </p>
        <p
            className={`${heightClassName} overflow-hidden`}
        >
            <span className="text-deep-green mt-4 flex text-base leading-6 w-[80%] overflow-hidden font-inter">
                {answer}
            </span>
        </p>
    </li>
  )
}
