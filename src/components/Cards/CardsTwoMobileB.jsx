import React from 'react'
import RichText from '../Texts/RichText'

export default function CardsTwoMobileB({ data }) {
  return (
    <ul className="flex flex-wrap sm:items-center sm:justify-center gap-12 my-12 sm:my-24">
    {data.map((item, i) => {
        return(
            <li
                className={`
                    border bg-bright-yellow border-transparent
                    rounded-[10px] px-8 pt-8 pb-16 space-y-2 w-[420px] h-[380px] flex items-center justify-center transition-all
                    `} 
                key={i}
            >
                <div className="space-y-6">
                    <RichText 
                        text={item.title}
                        className='font-playfair-display text-deep-green text-4xl
                                    text-center flex items-center justify-center'
                    />
                    <div className="space-y-3">
                        <p
                            className="text-deep-green font-ambit-regular w-[70%] mx-auto text-2xl text-center" 
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
