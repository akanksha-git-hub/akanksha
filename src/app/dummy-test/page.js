'use client'

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);
        // let ctx = gsap.context(() => {
        //     let tl = gsap.timeline({
        //         scrollTrigger: {
        //             trigger: root.current,
        //             start: 'top top',
        //             markers: true,
        //             scrub: 2,
        //             pin: true,
        //             pinSpacing: true,
        //             invalidateOnRefresh: true
        //         }
        //     })
        // })

        // return () => ctx.revert(); // clean up function

        // gsap.timeline()
        // .to(`#${card.id}`, { translateY: '-100%', translateZ: '120px', duration: 0.5 })
        // .to(`#${card.id}`, { scale: 0.9 })
        // .to(`#${card.id}`, { translateZ: '-100px', translateY: '10%'});



const DUMMY_CARDS = [{text: 'A'},{text: 'B'}, {text: 'C'}, {text: 'D'}, {text: 'E'},];

export default function Page() {

    const [onMount, setOnMount] = useState(false);
    const [secondMount, setSecondMount] = useState(false);
    const [cards, setCards] = useState(DUMMY_CARDS)

    const root = useRef(null);

    const frameCount = 1000;

    let travelPixel;
    travelPixel = (cards.length * 512);


    useEffect(() => {

        if(!onMount) {
            setOnMount(() => true);
            return;
        }

        setCards((prevState) => {

            const totalLength = prevState.length;
            const occupyFramesPerItem = frameCount/totalLength;

            let currentFrame = 0;
            let newData = prevState.map((item, index) => {

                const startFrame = currentFrame;
                const endFrame = currentFrame + occupyFramesPerItem;

                currentFrame = endFrame;

                return {
                    ...item,
                    id: `card-${index + 1}`,
                    startFrame,
                    endFrame
                }

            });

            setSecondMount(() => true);
            
            return newData;

        });

    }, [onMount]);

    useEffect(() => {

        if(secondMount) {

            // set Initial Value for cards not FIRST INDEX;
            cards.forEach((card, index) => {
                if(index !== 0) {
                    gsap.set(`#${card.id}`, { translateY: '10%', translateZ: '100px'});
                } else {
                    gsap.set(`#${card.id}`, { translateY: '0%', translateZ: '120px' })
                }
            });

            let ctx = gsap.context(() => {

                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: root.current,
                        scrub: 2,
                        start: 'top top',
                        end: `${travelPixel || 1000}px top`,
                        pin: true,
                        pinSpacing: true,
                        scroller: 'body'
                    }
                })

                cards.forEach((card) => {

                    tl.to(`#${card.id}`, { translateY: '-86%', translateZ: '120px', duration: 0.5 })
                    .to(`#${card.id}`, { scale: 0.9 })
                    .to(`#${card.id}`, { translateZ: '-100px', translateY: '10%'});

                });

            });


            return () => ctx.revert(); // cleanup fn

        }

    }, [secondMount])


  return (
    <main>
        <div className="h-screen bg-black grid place-items-center">
            <p className="text-white font-ambit-regular">FIRST SECTION</p>
        </div>
        <ul ref={root} className="h-[200vh] bg-cream">
            <div className="card-container">
                {cards.map((item, index) => {
                    const randomNumber = Math.floor(Math.random() * 200);
                    return(
                        <li 
                            key={item.text} 
                            id={`card-${index + 1}`}
                            style={{background: `rgb(${randomNumber}, ${randomNumber}, ${randomNumber})`}}
                            className={`pers-cards 
                                        grid place-items-center`}
                        >
                            <p className={`font-ambit-regular text-deep-green text-xl`}>
                                {item.text}
                            </p>
                        </li>
                    )}
                )}
            </div>
        </ul>
    </main>
  )
}
