import React, { useState } from 'react'
import RichText from '../Texts/RichText';

export default function CardsTwoDesktopB({ data }) {

    const [active, setActive] = useState(0);

    const handleMouseHover = (i) => setActive(() => i)

  return (
    <ul className="flex items-center justify-center gap-44 xl:gap-44 my-24">
        {data.map((item, i) => {
            return(
                <li
                    onMouseEnter={() => handleMouseHover(i)}
                    className={`
                        border 
                        ${i === 0 ? 'rotate-[6deg]' : 'rotate-[-6deg]'}
                        ${active === i ? 'bg-bright-yellow border-transparent opacity-100' : 'border-deep-green opacity-70'}
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
