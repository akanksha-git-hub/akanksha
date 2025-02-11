'use client'
import { PrismicNextImage } from "@prismicio/next";
import RichText from "./Texts/RichText";
import PrimaryCTA from "./UI/Button/PrimaryCTA";
import { useSmoothScroller } from "./LenisScrollContext";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";
import Button from "./v2-components/buttons/button";
gsap.registerPlugin(ScrollTrigger);

export default function BlogInfo({ data }) {

    const [onMount, setOnMount] = useState(false);

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

    
    useEffect(() => {
        
        if(!onMount) {
            setOnMount(() => true);
            return;
        }

       const containers = document.querySelectorAll('.blog-child-title');
       const texts = document.querySelectorAll('.blog-child-short-title');

       gsap.set(texts, { opacity: 0.2 });

       containers.forEach((container, index) => {

        const increaseOpacity = () => gsap.to(texts[index], { opacity: 1 });
        const reduceOpacity = () => gsap.to(texts[index], { opacity: 0.2 });
        
        gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: 'top 50%',
                end: 'bottom 30%',
                onEnter: increaseOpacity,
                onLeave: reduceOpacity,
                onLeaveBack: reduceOpacity,
                onEnterBack: increaseOpacity
            }
        })

       })


    }, [onMount]);

  return (
    <div className="flex items-start">
        <div className="sticky top-12 left-0">
            {/* Sticky component */}    
            <div className="relative hidden xl:block rounded-[10px] bg-white overflow-hidden max-w-[300px]">
                <div className="p-4">
                    <p className="font-ambit-semibold text-black">CONTENTS</p>
                    <ul className="px-4 space-y-3 mt-2">
                        {finalData.length > 0 && (
                            finalData.map((item, index) => {
                                const targetSection = `b${index}`;
                                const truncatedText = `${item.substring(0, 20)}...`
                                return(
                                    <li 
                                        key={item} className="blog-child-short-title font-ambit-regular relative text-black cursor-pointer"
                                        onClick={() => lenisScrollTo(targetSection)} 
                                    >
                                        {truncatedText}
                                        <span className="h-2 w-2 bg-black rounded-full absolute -left-3 top-2/4 -translate-y-2/4"></span>
                                    </li>
                                )
                            })
                        )}
                    </ul>
                </div>
                <div className="bg-bright-yellow p-4">
                    <p className="font-ambit-regular text-black">
                        Volunteer program open
                    </p>
                    <div className="flex items-center justify-between mt-2">
                        {/* <PrimaryCTA 
                            className='!p-2 !w-[100px] flex items-center justify-center'
                            text='Know more'
                        /> */}
                        <Button className="!p-2 !w-[130px] ">
                            Know More
                        </Button>
                        <Button className="!p-2 !w-[100px] ">
                           Donate
                        </Button>
                        {/* <PrimaryCTA
                            className='!p-2 !w-[100px] flex items-center justify-center' 
                            text='Donate'
                        /> */}
                    </div>
                </div>
            </div>
            {/*  */}
        </div>
        <div className="w-full xl:w-[70%] relative 3xl:w-[1200px] xl:left-[2%] 3xl:left-[5%]">
            <ul>
                {data.map((item, index) => {

                    const image = item.image;
                    const hasImage = Object.keys(image).length > 0;

                    return(
                        <div className="blog-child-title text-black space-y-4 mb-12" key={index}>
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
                                        className="h-[250px] xl:h-[500px] w-full object-cover mx-auto"
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
