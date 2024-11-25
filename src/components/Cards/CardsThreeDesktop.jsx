'use client'
import { useState } from 'react'
import { PrismicNextImage } from '@prismicio/next'
import RichText from '../Texts/RichText'

export default function CardsThreeDesktop({ cards }) {

    const [active, setActive] = useState(1);

    const handleMouseEnter = (i) => setActive(() => i);
  

  return (
    <ul className="flex justify-between mt-24 2xl:w-[80%] mx-auto">
        {cards.map((item, i) => {

          return(
            <li
              onMouseEnter={() => handleMouseEnter(i)} 
              className={`${active === i ? 'bg-bright-yellow border border-transparent scale-100' : 'border border-deep-green scale-90'} transition-all w-[32%] 2xl:w-[28%] rounded p-4`} 
              key={i}
            >
              <div className="overflow-hidden rounded">
                <PrismicNextImage 
                  field={item.image}
                  className="h-full w-full object-cover rounded"
                />
              </div>
              <div className="mt-8">
                <RichText 
                  text={item.title}
                  className='uppercase text-deep-green font-ambit-bold text-xl'
                />
                <RichText 
                  text={item.desc}
                  className='text-deep-green font-ambit-regular text-base'
                />
              </div>
            </li>
          )

        })}
      </ul>
  )
}
