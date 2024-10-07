import React from 'react'
import RichText from './RichText';

export default function SecondWeirdText({ texts, checkIndexA, checkIndexB, className, spanPosition }) {

    let splitText;

    splitText = texts.split(" ").map((text, i) => {
        if(checkIndexA === i) {
            return <span key={i} className="font-playfair-display flex">{text}&nbsp;</span>
        } else if(checkIndexB === i) {
            return <span key={i} className="font-playfair-display italic flex">{text}&nbsp;</span>
        } else {
            return <span className={`flex items-end relative ${spanPosition}`} key={i}>{text}&nbsp;</span>
        }
    });

  return (
    <RichText 
        className={`flex items-center flex-wrap ${className}`}
        text={splitText}
    />
  )
}
