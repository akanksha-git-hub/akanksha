'use client'

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useState } from "react";
import RichText from "../Texts/RichText";
gsap.registerPlugin(ScrollTrigger);

export default function IconScrollShowcase({ data }) {

    const [onMount, setOnMount] = useState(false);
    
    const length = data.length - 1;

    useEffect(() => {

        if(!onMount) {
            setOnMount(() => true);
            return;
        }

        const siblings = document.querySelectorAll('.icon-container');
        const outerRingA = document.querySelectorAll('.outer-ring-A');
        const outerRingB = document.querySelectorAll('.outer-ring-B');
        const outerRingC = document.querySelectorAll('.outer-ring-C');
        
        gsap.set(siblings, { opacity: 0.6 });
        gsap.set([outerRingA, outerRingB, outerRingC], { opacity: 0, height: '0%', width: '0%' });

        let ctx = gsap.context(() => {
            
            siblings.forEach((item, i) => {

                const onEnter = () => {
                    item.style.opacity = 1;
                    outerRingA[i].style.opacity = 1;
                    outerRingB[i].style.opacity = 1;
                    outerRingC[i].style.opacity = 1;
                    
                    outerRingA[i].style.height = '136%';
                    outerRingA[i].style.width = '136%';
                    outerRingB[i].style.height = '122%';
                    outerRingB[i].style.width = '122%';
                    outerRingC[i].style.height = '110%';
                    outerRingC[i].style.width = '110%';
                }
                const onLeaveBack = () => {
                    item.style.opacity = 0.6;
                    outerRingA[i].style.opacity = 0;
                    outerRingB[i].style.opacity = 0;
                    outerRingC[i].style.opacity = 0;
     
                    outerRingA[i].style.height = '0%';
                    outerRingA[i].style.width = '0%';
                    outerRingB[i].style.height = '0%';
                    outerRingB[i].style.width = '0%';
                    outerRingC[i].style.height = '0%';
                    outerRingC[i].style.width = '0%';
                }

                const gsapNestedAnimation = () => {
                    gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: 'top center',
                            end: 'bottom bottom',
                            onEnter: onEnter,
                            onLeaveBack: onLeaveBack, 
                            scrub: true
                        }
                    })
                }
    
                gsap.timeline({
                    opacity: 1,
                    scrollTrigger: {
                        trigger: '.target-icon-container',
                        start: 'top center',
                        end: 'bottom bottom',
                        onEnter: gsapNestedAnimation,
                        invalidateOnRefresh: true,
                        scrub: true
                    },
                });
                
            });
        });

        return () => ctx.revert();

    }, [onMount]);

    return(
        <ul className="flex flex-col items-center space-y-44 justify-center my-24 target-icon-container">
            {data.map((item, i) => (
                <li key={item.text} className="icon-container custom-bezier h-[8rem] w-[8rem] sm:h-[10rem] sm:w-[10rem] md:h-[14rem] md:w-[14rem] xl:h-[20rem] xl:w-[20rem] rounded-full bg-bright-yellow flex items-center justify-center relative">
                    <div  
                        className="outer-ring-C custom-bezier border-[5px] border-bright-yellow h-0 w-0 rounded-full absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    />
                    <div  
                        className="outer-ring-B !delay-[50ms] custom-bezier border-[3px] border-bright-yellow h-0 w-0 rounded-full absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    />
                    <div  
                        className="outer-ring-A !delay-[120ms] custom-bezier border-[2px] border-[#ebd97f] h-0 w-0 rounded-full absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className={
                        `absolute -bottom-[150%] lg:-bottom-full left-2/4 -translate-x-2/4 h-[200px] sm:h-[400px] w-[4px] -z-10 bg-[#ebd97f] ${i === length && ('hidden')}`
                    }>
                        <div className="h-full w-full relative">
                            <div className="inner-progress-line transition-all bg-bright-yellow w-full h-full" />
                        </div>
                    </div>
                    <div className="h-[60%] w-[60%]">
                        <PrismicNextImage 
                            field={item.image}
                            className="h-full w-full"
                            alt=""
                            height={100}
                            width={100}
                        />
                    </div>
                    <div className={`absolute top-2/4 ${i % 2 === 0 ? '-translate-y-2/4 left-[90%]' : '-translate-y-2/4 right-[68%] sm:right-[90%] md:right-[120%] xl:right-[90%]'} w-full`}>
                        <div className={`w-full md:w-[300px] xl:w-full flex ${i % 2 == 0 ? 'flex-row' : 'flex-row-reverse'} gap-0 md:gap-4`}>
                            <div className={`flex ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                                <div className="h-3 w-3 relative rounded-full bg-deep-green" />
                                <div className="h-[2px] w-[14px] md:w-[80px] lg:w-[120px] bg-deep-green" />
                            </div>
                            <RichText 
                                text={item.text}
                                className='text-deep-green text-center w-auto xl:w-auto xl:text-nowrap font-ambit-regular text-base md:text-xl'
                            />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}