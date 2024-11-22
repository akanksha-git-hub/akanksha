import { PrismicLink } from "@prismicio/react";
import RichText from "../Texts/RichText";

export default function CardShuffleA({ item, index }) {
  return (
    <>
        <div className="border border-red-500 flex flex-col md:flex-row items-start justify-between h-full relative">
            <p className="absolute top-0 left-4 bg-black text-white">Card - {index + 1}</p>
            <div className="w-[52%] h-full flex flex-col justify-between">
                <div className="font-ambit-regular">
                    <RichText 
                        className='text-[#9E9E9E] text-base'
                        text={item.small_title}
                    />
                    <RichText
                        className='text-off-white text-4xl' 
                        text={item.main_title}
                    />
                </div>
                <div className="">
                    <RichText 
                        className='font-ambit-regular text-off-white text-xl border border-red-500 max-w-[28ch]'
                        text={item.description}
                    />
                    <PrismicLink 
                        className="text-bright-yellow font-ambit-regular"
                    >
                        Read Story
                    </PrismicLink>
                </div>
            </div>
            <div className="w-full h-[550px] md:w-[28%] md:h-full bg-red-500">

            </div>
        </div>
    </>
  )
}
