import RichText from "./RichText";

export default function MixedText({ texts, index, className, spanPosition, isSplit }) {

    let checkIndex = index;
    let splitText;

    if(isSplit) {
        splitText = texts.map((text, i) => {
            if(checkIndex === i) {
                return <span key={i} className="font-playfair-display italic flex">{text}&nbsp;</span>
            } else {
                return <span className={`flex items-end relative ${spanPosition}`} key={i}>{text}&nbsp;</span>
            }
        });
    } else {
        splitText = texts.split(" ").map((text, i) => {
            if(checkIndex === i) {
                return <span key={i} className="font-playfair-display italic flex">{text}&nbsp;</span>
            } else {
                return <span className={`flex items-end relative ${spanPosition}`} key={i}>{text}&nbsp;</span>
            }
        });
    }


  return (
    <RichText 
        className={`flex items-center flex-wrap ${className}`}
        text={splitText}
    />
  )
}
