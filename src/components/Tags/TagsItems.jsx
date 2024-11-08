'use client'

import { useSmoothScroller } from "../LenisScrollContext";
import RichText from "../Texts/RichText";
import { useTagContext } from "./Tags";

export default function TagsItems({ tags, className }) {

    const { handleTag, activeTag } = useTagContext();
    const { lenisScrollTo } = useSmoothScroller();


    function handleClick(id) {
        handleTag(id);
        lenisScrollTo(id);
    }

  return (
    <div className={className}>
        <RichText 
            text='CATEGORY'
            className='font-ambit-semibold text-deep-green text-xl grid place-content-center mb-6'
        />
        <ul className="flex flex-wrap justify-center gap-6">
            {tags.map(item => {

                const lowerCase = item.category.split(" ").join('').toLowerCase();

                return(
                    <li 
                        onClick={() => handleClick(lowerCase)}
                        key={item.category}
                        className={`w-fit py-2 px-4 cursor-pointer font-ambit-regular text-lg rounded-full transition-all
                                    border border-deep-green 
                                    ${activeTag === lowerCase ? 'bg-deep-green text-off-white' : 'text-deep-green hover:opacity-75'} 
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
