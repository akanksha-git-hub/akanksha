'use client'
import Arrow from "@/components/Arrow";
import { PrismicNextLink } from "@prismicio/next";

export default function TextCTA({ text, link, className, linkClassName, hasUnderLine, strokeColor, textColor, bgColor, ...props }) {
  return (
    <PrismicNextLink
      field={link}
      className={linkClassName}
    >
      <button type="button">
        <p className={`flex relative items-center gap-2 ${textColor} ${className}`} {...props}>
          {text}{hasUnderLine && (<span className="relative top-[2px]"><Arrow dimension="14" strokeColor={strokeColor} /></span>)}
          {hasUnderLine && (<span className={`absolute -bottom-1 left-0 h-[1px] w-full ${bgColor}`} {...props}/>)}
        </p>
      </button>
    </PrismicNextLink>
  )
}
