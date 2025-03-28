import React, { useState } from 'react'
import RichText from '../Texts/RichText';
import { PrismicNextImage } from '@prismicio/next';

export default function CardsTwoDesktopB({ data }) {

    const [active, setActive] = useState(0);

    const handleMouseHover = (i) => setActive(() => i)

  return (


    <ul className="flex items-center justify-center gap-4 xl:gap-4 my-24 relative   ">
          
        {data.map((item, i) => {
            console.log(item);
            
            return(
                <li
                    onMouseEnter={() => handleMouseHover(i)}
                    className={` ${i === 0 ? '' : 'relative top-12'}
                        border 
                        ${i === 0 ? 'rotate-[-6deg]' : 'rotate-[6deg]  '}
                        ${active === i ? 'bg-bright-yellow border-transparent opacity-100  z-10' : 'border-deep-green opacity-70'}
                        rounded-t-[10px] px-8 pt-8 pb-16 space-y-2 w-[420px]  flex items-center justify-center transition-all relative `} 
                    key={i}
                >
                     {i === 0 && (
      <div className="absolute -left-[20%] -top-[10%] scale-50 xl:scale-100">
        <PrismicNextImage
          field={item.sparkles_left}
          className=""
        />
      </div>
    )}

    {/* Conditionally render sparkle_right for index 1 */}
    {i === 1 && (
      <div className="absolute -right-[30%] -top-[20%] scale-50 xl:scale-100">
        <PrismicNextImage
          field={item.sparkles_right}
          className=""
        />
      </div>
    )}
                     
                    <div className="space-y-6 ">
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
                            
                        </div>
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

                </li>
            )

        })}
    </ul>
  )
}
