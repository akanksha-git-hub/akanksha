'use client'

import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useState } from "react";
import RichText from "../Texts/RichText";
gsap.registerPlugin(ScrollTrigger);

export default function IconScrollShowcaseHorizontal({ data }) {

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

            let time = 800;

            siblings.forEach((item, i) => {

                
                const onEnter = () => {

                    setTimeout(() => {
                        item.style.opacity = 1;
                    }, i * time);

                    outerRingA.forEach((item, i) => {
                        setTimeout(() => {
                            item.style.opacity = 1;
                            item.style.height = '136%';
                            item.style.width = '136%';
                        }, i * time);
                    });

                    outerRingB.forEach((item, i) => {
                        setTimeout(() => {
                            item.style.opacity = 1;
                            item.style.height = '122%';
                            item.style.width = '122%';
                        }, i * time);
                    });
                    
                    
                    outerRingC.forEach((item, i) => {
                        setTimeout(() => {
                            item.style.opacity = 1;
                            item.style.height = '110%';
                            item.style.width = '110%';
                        }, i * time);
                    });

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
        <ul className="flex items-center justify-evenly my-64 target-icon-container">
            {data.map((item, i) => (
                <li key={item.text} className="icon-container custom-bezier h-[12rem] w-[12rem] rounded-full bg-bright-yellow flex items-center justify-center relative">
                    <div  
                        className="outer-ring-C custom-bezier border-[5px] border-bright-yellow h-0 w-0 rounded-full absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    />
                    <div  
                        className="outer-ring-B !delay-[50ms] custom-bezier border-[2px] border-bright-yellow h-0 w-0 rounded-full absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    />
                    <div  
                        className="outer-ring-A !delay-[120ms] custom-bezier border-[2px] border-[#ebd97f] h-0 w-0 rounded-full absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                    />
                    <div className={
                        `absolute left-2/4 h-[4px] w-[200%] -z-10 bg-[#ebd97f] ${i === length && ('hidden')}`
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
                    <div className={`absolute ${i % 2 === 0 ? 'top-full rotate-90' : 'bottom-full rotate-90'} w-[150px] h-[200px]`}>
                        <div className="relative h-full w-full flex items-center justify-center">
                            <div className={`relative w-full flex ${i % 2 == 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                <div className={`flex ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} items-center`}>
                                    <div className="h-3 w-3 relative rounded-full bg-deep-green" />
                                    <div className="h-[2px] w-[14px] md:w-[80px] lg:w-[120px] bg-deep-green" />
                                </div>
                            </div>
                            <RichText 
                                text={item.text}
                                className={`text-deep-green text-center w-[200px]
                                        ${i % 2 === 0 ? 'left-2/4 -rotate-90' : 'right-2/4 -rotate-90'} bottom-2/4 translate-y-2/4 
                                        font-ambit-regular text-xl absolute
                                        `
                                    }
                            />
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}