'use client'
import { PrismicNextImage } from "@prismicio/next";
import RichText from "./Texts/RichText";
import PrimaryCTA from "./UI/Button/PrimaryCTA";
import { useSmoothScroller } from "./LenisScrollContext";

export default function BlogInfo({ data }) {


    const { lenisScrollTo } = useSmoothScroller();

    const ourData = data.map(item  => {

        const extractData = item.rich_text.filter(innerItem => {

            const heading = innerItem.type !== 'paragraph';

            return heading;

        });

        const finalData = extractData.map(finalItem => finalItem.text);
        
        return finalData;

    });

    const totalLength = ourData.length - 1;

    let finalData = [];

    for(let i = 0; i <= totalLength; i+=1) {
        finalData.push(...ourData[i]);
    }

  return (
    <div className="flex items-start justify-center">
        <div className="sticky top-12 left-0">
            {/* Sticky component */}    
            <div className="relative -left-12 rounded-[10px] bg-white overflow-hidden max-w-[300px]">
                <div className="p-4">
                    <p className="font-ambit-semibold text-deep-green">CONTENTS</p>
                    <ul className="px-4 space-y-3 mt-2">
                        {finalData.length > 0 && (
                            finalData.map((item, index) => {
                                const targetSection = `b${index}`;
                                const truncatedText = `${item.substring(0, 20)}...`
                                return(
                                    <li onClick={() => lenisScrollTo(targetSection)} key={item} className="relative text-deep-green cursor-pointer">
                                        {truncatedText}
                                        <span className="h-2 w-2 bg-deep-green rounded-full absolute -left-3 top-2/4 -translate-y-2/4"></span>
                                    </li>
                                )
                            })
                        )}
                    </ul>
                </div>
                <div className="bg-bright-yellow p-4">
                    <p className="font-ambit-regular text-deep-green">
                        Volunteer program open
                    </p>
                    <div className="flex items-center justify-between mt-2">
                        <PrimaryCTA 
                            className='!p-2 !w-[100px] flex items-center justify-center'
                            text='Know more'
                        />
                        <PrimaryCTA
                            className='!p-2 !w-[100px] flex items-center justify-center' 
                            text='Donate'
                        />
                    </div>
                </div>
            </div>
            {/*  */}
        </div>
        <div className="w-[70%] relative 3xl:w-[1200px]">
            <ul>
                {data.map((item, index) => {

                    const image = item.image;
                    const hasImage = Object.keys(image).length > 0;

                    return(
                        <div className="text-deep-green space-y-4 mb-12" key={index}>
                            {item.rich_text.map((text, i) => {

                                const heading = text.type !== 'paragraph';

                                let identifier;

                                identifier = `b${index}`;

                                return(
                                    <div id={heading && (identifier)} key={i}>
                                        <RichText 
                                            className='text-3xl sm:text-4xl font-ambit-semibold text-left md:text-center flex items-center justify-center w-[90%] 2xl:w-[32ch] md:mx-auto'
                                            text={heading && (text.text)}
                                        />
                                        <RichText 
                                            className='font-ambit-regular text-base sm:text-lg text-justify'
                                            text={!heading && (text.text)}
                                        />
                                    </div>
                                )
                            })}
                            {hasImage && (
                                <div className={`w-full overflow-hidden`}>
                                    <PrismicNextImage 
                                        className="h-[500px] w-full object-cover mx-auto"
                                        field={item.image}
                                    />
                                </div>
                            )}
                        </div>
                    )})
                }
            </ul>
        </div>
    </div>
  )
}
