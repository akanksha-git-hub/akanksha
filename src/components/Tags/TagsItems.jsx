'use client'

import { useSmoothScroller } from "../LenisScrollContext";
import RichText from "../Texts/RichText";
import { useTagContext } from "./Tags";

export default function TagsItems({ tags, className }) {
    
    const { handleTag, activeTag } = useTagContext();
    const { lenisScrollTo } = useSmoothScroller();

    function handleClick(id) {

        let filterId = null;

        if(id !== 'Recent') filterId = id;

        handleTag(filterId);
        lenisScrollTo(id !== 'Recent' ? id : 'recent');
    }

    const tagList = [{ category: 'Recent' }, ...tags ];

  return (
    <div className={className}>
        <RichText 
            text='CATEGORY'
            className='font-ambit-semibold text-black text-xl grid md:place-content-center mb-6'
        />
        <ul className="flex flex-wrap md:justify-center gap-4 lg:gap-6 w-full lg:w-[80%] md:mx-auto">
            {tagList.map(item => {

                const lowerCase = item.category.split(" ").join('').toLowerCase();

                return(
                    <li 
                        onClick={() => handleClick(lowerCase)}
                        key={item.category}
                        className={`w-fit py-2 px-4 cursor-pointer font-ambit-regular text-lg rounded-full transition-all
                                    border border-black 
                                    ${activeTag === lowerCase ? 'bg-black text-off-white' : 'text-black hover:opacity-75'} 
                                    active:scale-95`
                                }
                    >
                        {item.category}
                    </li>
                )
            })}
        </ul>
    </div>
  )
}
