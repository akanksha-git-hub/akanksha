import React from 'react'
import RichText from '../Texts/RichText'
import { PrismicNextImage } from '@prismicio/next'

export default function CardsTwoMobileB({ data }) {
  return (
    <ul className="flex flex-wrap sm:items-center sm:justify-center gap-12 my-12 sm:my-24">
    {data.map((item, i) => {
        return(
            <li
                className={`
                    border bg-bright-yellow border-transparent
                    rounded-[10px] px-8 pt-8 pb-16 space-y-2 w-[420px] h-[420px] flex items-center justify-center transition-all
                    `} 
                key={i}
            >
                <div className="space-y-6">
                        <div className="flex items-center justify-center">
                                             <PrismicNextImage field={item.card_image} />
                                             </div>
                    <RichText 
                        text={item.title}
                        className='font-ambit-regular text-black text-4xl
                                    text-center flex items-center justify-center'
                    />
                    <div className="space-y-3">
                        <p
                            className="text-black font-ambit-regular w-[70%] mx-auto text-2xl text-center" 
                        >
                            {item.desc}
                        </p>
                    </div>
                </div>
            </li>
        )

    })}
</ul>
  )
}
