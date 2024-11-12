import React from 'react'
import RichText from '../Texts/RichText'
import TextCTA from '../UI/Button/TextCTA'

export default function QuoteComponent({ quote, quote_by, storyLink }) {
  return (

    <div
        className="rounded-lg rounded-tr-lg rounded-br-lg md:rounded-bl-none md:rounded-tl-none bg-deep-green p-8 w-full xl:w-[56%] flex flex-col items-start justify-between"
    >
        <div>
            <RichText 
                className="text-soft-white text-2xl xl:text-3xl 2xl:text-4xl font-ambit-regular leading-[30px] xl:leading-[48px]"
                text={quote}
            />
            <RichText 
                className="text-off-white text-lg xl:text-xl font-ambit-regular mt-6"
                text={quote_by}
            />
        </div>
        <div 
            className="flex items-center justify-between w-full"
        >
            <TextCTA
                className="font-inter text-sm xl:text-base" 
                hasUnderLine
                strokeColor="#FBDA1D"
                text="Read story"
                bgColor="bg-bright-yellow"
                textColor="text-bright-yellow"
            />
            <TextCTA 
                className="font-inter text-sm xl:text-base"
                text="Donate"
                textColor="text-bright-yellow"
            />
        </div>
    </div>  
)}
