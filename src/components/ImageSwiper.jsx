'use client'

import { PrismicNextImage } from "@prismicio/next"
import { useCallback, useEffect, useState } from "react";

const imageClassName = "h-full w-full overflow-hidden rounded-[5px]";
const INITIAL_STATE = {
    imageAClassName: "absolute top-12 left-2/4 origin-bottom-left rotate-[-12deg] -translate-x-2/4",
    imageBClassName: "absolute top-0 left-2/4 -translate-x-2/4",
    imageCClassName: "absolute top-12 left-2/4 origin-bottom-right -z-10 rotate-[12deg] -translate-x-2/4",
    trackIndex: {
        A: 0,
        B: 1,
        C: 2
    },
    senseClick: false,
    timesClicked: 0
}

export default function ImageSwiper({ data }) {


    const [switchClassName, setSwitchClassName] = useState(INITIAL_STATE);

    const { 
        imageAClassName, 
        imageBClassName, 
        imageCClassName, 
        trackIndex: { A, B, C },
    } = switchClassName;

    let dataLength = (data.length - 1)|| null;


    const handleImageSwiperClick = useCallback(function handleImageSwiperClick(){
        setSwitchClassName((prevState) => {
            return {
                ...prevState,
                imageAClassName: "absolute card-swiper-item top-12 left-2/4 origin-bottom-right -z-10 rotate-[12deg] -translate-x-2/4",
                imageBClassName: "absolute card-swiper-item top-12 left-2/4 origin-bottom-left rotate-[-12deg] -translate-x-2/4",
                imageCClassName: "absolute card-swiper-item top-0 left-2/4 -translate-x-2/4",
                timesClicked: prevState.timesClicked + 1,
                senseClick: true
            }
        });
    }, []);


    useEffect(() => {
        
        const timeOut = setTimeout(() => {

            setSwitchClassName((prevState) => {

                let indexA, indexB, indexC;

                if(prevState.senseClick === true) {

                    if(dataLength === prevState.trackIndex.C) {
                        indexA = prevState.trackIndex.A + 1;
                        indexB = prevState.trackIndex.C;
                        indexC = 0;
                    }

                    if(dataLength === prevState.trackIndex.B) {
                        indexA = prevState.trackIndex.A + 1;
                        indexB = 0;
                        indexC = prevState.trackIndex.C + 1;
                    }

                    if(dataLength === prevState.trackIndex.A) {
                        indexA = 0;
                        indexB = prevState.trackIndex.B + 1;
                        indexC = prevState.trackIndex.C + 1;
                    }

                    if((dataLength !== prevState.trackIndex.A) && (dataLength !== prevState.trackIndex.B) && (dataLength !== prevState.trackIndex.C)) {
                        indexA = prevState.trackIndex.A + 1;
                        indexB = prevState.trackIndex.B + 1;
                        indexC = prevState.trackIndex.C + 1;
                    }
                    
                    return {
                        ...prevState,
                        imageAClassName: "absolute top-12 left-2/4 origin-bottom-left rotate-[-12deg] -translate-x-2/4",
                        imageBClassName: "absolute top-0 left-2/4 -translate-x-2/4",
                        imageCClassName: "absolute top-12 left-2/4 origin-bottom-right -z-10 rotate-[12deg] -translate-x-2/4",
                        trackIndex: {
                            A: indexA,
                            B: indexB,
                            C: indexC
                        }
                    }
                } else {
                    return INITIAL_STATE;
                }
            });
        }, 300);

        return () => clearTimeout(timeOut);

    }, [switchClassName.timesClicked]);

  return (
    <div onClick={handleImageSwiperClick} className="card-swiper relative scale-95 transition-all hover:scale-100 cursor-pointer h-[74vw] sm:h-[60vw] lg:h-[38vw]">
        <div className={`card-swiper-A h-[100%] w-[60%] ${imageAClassName}`}>
            <div className={`${imageClassName} bg-v2-blue`}>
                <PrismicNextImage
                    className={`h-full w-full object-cover opacity-anim`}
                    field={data[A].image}
                    key={switchClassName.timesClicked}
                    loading="eager"
                    alt=""
                    />
            </div>
        </div>
        <div className={`card-swiper-B h-[100%] w-[60%] ${imageBClassName}`}>
            <div className={`${imageClassName} bg-v2-yellow`}>
                <PrismicNextImage 
                    className={`h-full w-full object-cover opacity-anim`}
                    field={data[B].image}    
                    key={switchClassName.timesClicked}
                    loading="eager"
                    alt=""
                    />
            </div>
        </div>
        <div className={`card-swiper-C h-[100%] w-[60%] ${imageCClassName}`}>
            <div className={`${imageClassName} bg-v2-orange`}>
                <PrismicNextImage 
                    className={`h-full w-full object-cover opacity-anim`}
                    field={data[C].image}    
                    key={switchClassName.timesClicked}
                    loading="eager"
                    alt=""
                />
            </div>
        </div>
    </div>
  )
}
