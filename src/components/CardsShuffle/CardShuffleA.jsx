import { PrismicLink } from "@prismicio/react";
import RichText from "../Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";

export default function CardShuffleA({ item, index }) {

    let trackIndex = 0;

    if(index % 3 === 0) trackIndex = 0; 
    
    const bg = ['FBDA1D', '55BBD3', '37473C'];

  return (
    <div 
        className="bg-deep-green p-4 lg:p-8 h-full rounded-[10px]"
    >
        <div 
            className="flex flex-col lg:flex-row items-start justify-between h-full relative">
            <div className="w-full lg:w-[52%] lg:h-full flex lg:flex-col justify-between">
                <div className="font-ambit-regular space-y-1 lg:space-y-2">
                    <RichText 
                        className='text-[#9E9E9E] text-base'
                        text={item.small_title}
                    />
                    <RichText
                        className='text-off-white leading-3 text-xl lg:text-5xl' 
                        text={item.main_title}
                    />
                </div>
                <div>
                    <RichText 
                        className='font-ambit-regular text-off-white text-sm lg:text-xl max-w-[28ch]'
                        text={item.description}
                    />
                    <PrismicLink 
                        className="text-bright-yellow text-sm lg:text-base font-ambit-regular"
                    >
                        Read Story
                    </PrismicLink>
                </div>
            </div>
            <div className="w-full h-[550px] mt-6 lg:mt-0 lg:w-[36%] md:h-full rounded overflow-hidden">
                <PrismicNextImage 
                    field={item.image}
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    </div>
  )
}
