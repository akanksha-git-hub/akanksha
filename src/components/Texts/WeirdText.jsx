'use client'
import { spanPosition } from "@/utils/helperClasses";
import MixedText from "./MixedText";
import RichText from "./RichText";

export default function WeirdText({ texts, className }) {
    
    const splitText = texts.split(" ");

    const textA = splitText.slice(0, 2).map(item => <span key={item}>{item}&nbsp;</span>);
    const textB = splitText.slice(2, texts.length).map(item => <span key={item}>{item}&nbsp;</span>);
    
    let commonClassName = "font-ambit-regular text-deep-green text-6xl lg:text-7xl xl:text-8xl";

  return (
    <div className={`${className}`}>
      {/* <MixedText 
        texts={textA}
        isSplit
        index={null}
        spanPosition={"top-2 sm:top-3"}
        className={`${commonClassName}`}
      />
      <MixedText 
        texts={textB}
        index={0}
        isSplit
        spanPosition={"top-2 sm:top-3"}
        className={`${commonClassName} pl-0 md:pl-16 lg:pl-36 xl:pl-56`}
      /> */}
      <RichText 
        className={`${commonClassName}`}
        text={textA}
      />
      <RichText 
        className={`${commonClassName} pl-0 md:pl-16 lg:pl-36 xl:pl-56`}
        text={textB}
      />
    </div>
  );
}
