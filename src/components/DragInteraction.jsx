'use client'
import { PrismicNextImage } from "@prismicio/next";
import { useEffect, useState } from "react";

import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PrimaryCTA from "./UI/Button/PrimaryCTA";
import SliceIdentifier from "./SliceIdentifier";
import SecondWeirdText from "./Texts/SecondWeirdText";
import { spanPosition } from "@/utils/helperClasses";
import Marquee from "./Marquee";

gsap.registerPlugin(Draggable, ScrollTrigger);

export default function DragInteraction({ images, text, ctaText, ctaLink, sliceIdentifier }) {

  const [onMount, setOnMount] = useState(false); 

    useEffect(() => {

      if(!onMount) {
        setOnMount(true);
        return;
      }

      const imgFrames = document.querySelectorAll('.img-frame');
      
      const drag = () => {
        Draggable.create('.frame-B', {
          type: 'x,y',
          bounds: window,
          inertia: true,
          onDragStart: function() {
            gsap.to(imgFrames, {
              duration: 0.2,
              scale: 1.1,
              ease: 'power1.out'
            });
          },
          onDragEnd: function() {
            gsap.to(imgFrames, {
              duration: 0.2,
              scale: 1,
              ease: 'power1.out'
            })
          }
        });
      }

      gsap.to(imgFrames, {
        scrollTrigger: {  
          trigger: '.frame-A',
          start: 'top center',
          onEnter: () => {
            drag()
          },
        },
        duration: 0.3,
        scale: 1,
        ease: 'expo.inOut',
        stagger: 0.2
      })

    }, [onMount]);

  return (
    <>
    <SliceIdentifier  
      className="mb-6"
      text={sliceIdentifier}
    />
    <div>
      <div className="flex flex-col md:hidden">
        <SecondWeirdText 
          checkIndexA={1}
          checkIndexB={3}
          texts={text}
          spanPosition="top-1"
          className="select-none text-deep-green text-6xl w-[80%] my-10 font-ambit-regular text-center z-10"
        />
        <Marquee 
          slice={images}
          noHoverEffect
        />
        <PrimaryCTA 
          className="select-none mt-10"
          text={ctaText}
          link={ctaLink}
        />
      </div>
      <div 
        className="b-scene-frame !hidden md:!block"
      >
      <div className="flex flex-col items-center justify-center absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 space-y-8 z-10">
        <SecondWeirdText 
          checkIndexA={1}
          checkIndexB={3}
          texts={text}
          spanPosition={spanPosition}
          className="select-none text-deep-green text-8xl w-[10ch] font-ambit-regular text-center justify-center z-10"
        />
        <PrimaryCTA 
          className="select-none"
          text={ctaText}
          link={ctaLink}
        />
      </div>
      {/* Inner Frame */}
      <div
        className="b-scene-inner-frame"
      >
        <div className="frame-A">
          <div className="frame-B">
            {images.map(({image}, i) => (
              <div key={i} className="img-frame" style={{scale:'0'}}>
                <figure className="img-frame-figure">
                  <PrismicNextImage 
                    loading="eager" 
                    height={500} width={500} 
                    priority={true} field={image} 
                    style={{height:'100%', width:'100%', objectFit:'cover'}} 
                    alt=""
                  />
                </figure>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}
