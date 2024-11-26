import React from 'react'
import RichText from '../Texts/RichText'

export default function SlideSelector({ name, program_name, short_content, trackIndex, index, onClick, className, isOptionB, date }) {
  return (
    <li onClick={onClick} className={`
      border-t border-[#D7D7CD] min-h-[10.8rem] overflow-hidden
      p-4 cursor-pointer transition-all 
      ${trackIndex === index ? "opacity-100" : "opacity-55"} ${className}
    `}>
      {isOptionB && (
        <p className='font-ambit-semibold text-deep-green uppercase'>
          <span>{date.startMonth}{date.startYear}</span>&nbsp;-&nbsp;
          <span>{date.endMonth}{date.endYear}</span>
        </p>
      )}
      <div className="flex items-center justify-between">
        <RichText 
          className="text-deep-green max-w-[80] text-2xl 2xl:text-4xl font-inter"
          text={name}
        />
      </div>
      <RichText 
        className="text-deep-green font-inter w-[80%] 2xl:w-full text-sm 2xl:text-base mt-4 "
        text={short_content}
      />
    </li>
  )
}
