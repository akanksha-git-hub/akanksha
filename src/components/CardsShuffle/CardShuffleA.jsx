import { PrismicLink } from "@prismicio/react";
import RichText from "../Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import TextCTA from "../UI/Button/TextCTA";

const cardProps = [
    {
        bg: '#37473C',
        smallTitle: '#9E9E9E',
        mainTitle: '#FFFBF1',
        description: '#FFFBF1',
        link: '#FBDA1D'
    },
    {
        bg: '#FBDA1D',
        smallTitle: '#515753',
        mainTitle: '#37473C',
        description: '#37473C',
        link: '#37473C'
    },
    {
        bg: '#55BBD3',
        smallTitle: '#515753',
        mainTitle: '#37473C',
        description: '#37473C',
        link: '#FFFBF1'
    },
];

export default function CardShuffleA({ item, index }) {

    let trackIndex = index;
    const selectIndex = trackIndex % cardProps.length;
    
  return (
    <div 
        className="bg-deep-green p-4 lg:p-8 h-full rounded-[10px]"
        style={{background: `${cardProps[selectIndex].bg}`}}
    >
        <div 
            className="flex flex-col lg:flex-row items-start justify-between h-full relative">
            <div className="w-full lg:w-[52%] lg:h-full flex lg:flex-col justify-between">
                <div className="font-ambit-regular space-y-1 lg:space-y-2">
                    <RichText 
                        className='text-xl'
                        style={{color: `${cardProps[selectIndex].smallTitle}`}}
                        text={item.small_title}
                    />
                    <RichText
                        className='leading-3 text-xl lg:text-5xl' 
                        style={{color: `${cardProps[selectIndex].mainTitle}`}}
                        text={item.main_title}
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <RichText 
                        className='font-ambit-regular text-sm lg:text-xl max-w-[28ch]'
                        style={{color: `${cardProps[selectIndex].description}`}}
                        text={item.description}
                    />
                    <TextCTA 
                        link={item.cta_link}
                        hasUnderLine
                        text='Read Story'
                        style={{color: `${cardProps[selectIndex].link}`}}
                        strokeColor={`${cardProps[selectIndex].link}`}
                        bgColor={`${selectIndex === 0 ? 'bg-[#FBDA1D]' : selectIndex === 1 ? 'bg-[#37473C]' : 'bg-[#FFFBF1]'}`}
                    />
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
