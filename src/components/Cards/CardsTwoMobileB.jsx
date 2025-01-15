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
                   relative `} 
                key={i}
            >
                <div className="space-y-6">
                             <div className={`absolute w-full -top-[15px] ${i === 0 ? 'rotate-[4deg]' : 'rotate-[4deg]'} left-0 h-[18px]`}>
                          {i === 0 && item.left_shading && (
                            <PrismicNextImage field={item.left_shading} />
                          )}
                          {i === 1 && item.right_shading && (
                            <PrismicNextImage field={item.right_shading} />
                          )}
                        </div>
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
                                                <div className={`absolute -bottom-[25px] ${i === 0 ? "rotate-[0deg]" : "rotate-[0deg]"} left-0`}>
                                                
                                                {i === 0 && (
                            <>
                            
                              {item.left_asset && <PrismicNextImage field={item.left_asset} />}
                            </>
                          )}
                          {i === 1 && item.right_asset && (
                            <PrismicNextImage field={item.right_asset} />
                          )}
                        </div>
                    </div>
                    
                </div>

            </li>
        )

    })}
</ul>
  )
}
