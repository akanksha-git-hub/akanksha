import React from 'react'
import RichText from '../Texts/RichText'

export default function SlideSelector({ name, program_name, short_content, trackIndex, index, onClick, className }) {
  return (
    <li onClick={onClick} className={`
      border-t border-[#D7D7CD] min-h-[10.8rem] overflow-hidden
      p-4 cursor-pointer transition-all 
      ${trackIndex === index ? "opacity-100" : "opacity-55"} ${className}
    `}>
      <div className="flex items-center justify-between">
        <RichText 
          className="text-deep-green max-w-[80] text-2xl 2xl:text-4xl font-inter"
          text={name}
        />
        {/* <RichText 
          className="text-deep-green font-ambit-semibold text-sm 2xl:text-base uppercase"
          text={program_name}
          /> */}
      </div>
      <RichText 
        className="text-deep-green font-inter w-[80%] 2xl:w-full text-sm 2xl:text-base mt-4 "
        text={short_content}
      />
    </li>
  )
}
