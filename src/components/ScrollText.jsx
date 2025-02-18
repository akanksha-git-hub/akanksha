'use client'
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { PrismicNextImage } from "@prismicio/next";
import Skeleton from "./Skeleton";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollText({ title, prismicTexts, asset_2, asset_1 }) {
    const [onMount, setOnMount] = useState(false);
    const [secondMount, setSecondMount] = useState(false);
    const INITIAL_TEXTS = prismicTexts;
    const [texts, setTexts] = useState(INITIAL_TEXTS);

    const seqRef = useRef({ frame: 1 });
    const timeline = useRef(gsap.timeline());
    const root = useRef();
    const arrowRef = useRef(); // Arrow ref

    const frameCount = 800;
    let travelPixel = texts.length * 512.4;

    useEffect(() => {
        if (!onMount) {
            setOnMount(true);
            return;
        }

        setTexts((prevState) => {
            const totalLength = prevState.length;
            const occupyPerFrame = frameCount / totalLength;

            let currentFrame = 0;
            let newData = prevState.map((item, index) => {
                const startFrame = currentFrame;
                const endFrame = currentFrame + occupyPerFrame;
                currentFrame = endFrame;

                return {
                    ...item,
                    id: `text-${index + 1}`,
                    startFrame,
                    endFrame
                };
            });

            return newData;
        });

        setSecondMount(true);
    }, [onMount]);

    useEffect(() => {
        if (secondMount) {
            texts.forEach((t, index) => {
                if (index !== 0) {
                    gsap.set(`#${t.id}`, { opacity: 0, y: 0 });
                }
            });

            const renderTexts = (texts) => {
                if (texts.length > 0) {
                    texts.forEach((t, index) => {
                        let cFrame = seqRef.current.frame;
                        if (cFrame >= t.startFrame && cFrame <= t.endFrame) {
                            gsap.to(`#${t.id}`, { y: 0, opacity: 1, duration: 0.12, ease: 'bounce.out' });
                        } else {
                            gsap.to(`#${t.id}`, { y: 100, opacity: 0, duration: 0.08, ease: 'bounce.out' });
                        }
                    });

                    // Fade out arrow when reaching last text
                    if (seqRef.current.frame >= texts[texts.length - 1].endFrame) {
                        gsap.to(arrowRef.current, { opacity: 0, duration: 0.5 });
                    } else {
                        gsap.to(arrowRef.current, { opacity: 1, duration: 0.5 });
                    }
                }
            };

            const throttledRender = () => renderTexts(texts);

            timeline.current.to(seqRef.current, {
                frame: frameCount - 1,
                snap: 'frame',
                ease: 'none',
                scrollTrigger: {
                    scrub: 0.15,
                    trigger: root.current,
                    start: '-100px top',
                    end: `${travelPixel || 1000}px top`,
                    pin: true,
                    onUpdate: throttledRender,
                },
            });
        }

    }, [secondMount]);

    return (
        <div ref={root} className="flex flex-col items-center mt-20 relative">
            {secondMount ? (
                <>
                    <div className="flex flex-row items-center">
                        <div className="hidden lg:block">
                            <PrismicNextImage field={asset_1} width={30} height={30} className="lg:h-[300px] lg:w-[300px]" alt="" />
                        </div>
                        <p className="text-black text-center text-4xl lg:text-7xl w-full lg:w-[20ch]">
                            {title}
                        </p>
                        <div className="hidden lg:block">
                            <PrismicNextImage field={asset_2} width={30} height={30} className="lg:h-[300px] lg:w-[300px]" alt="" />
                        </div>
                    </div>

                    {texts && texts.length > 0 && (
                        <div className="relative w-full flex items-center justify-center mt-10">
                            {texts.map((text, index) => (
                                <div className="flex items-start flex-col lg:flex-row lg:items-center w-full xl:w-[800px] gap-4 absolute top-0 left-2/4 -translate-x-2/4" key={index}>
                                    <PrismicNextImage 
                                        field={text.points_image}
                                        width={30}
                                        height={30}
                                        className="h-[120px] w-[120px] lg:h-[200px] lg:w-[200px]"
                                        id={`text-${index + 1}`}
                                        alt=""
                                    />
                                    <div id={`text-${index + 1}`} className="scroll-text">
                                        <p className="font-ambit-regular text-black text-2xl lg:text-3xl">{text.point}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Stationary arrow at bottom of text */}
                    <div ref={arrowRef} className=" absolute -bottom-[265px]  transition-opacity">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="40"
                            height="40"
                            fill="currentColor"
                            viewBox="0 0 16 16"
                            className="text-black"
                        >
                            <path fillRule="evenodd" d="M8 12a.5.5 0 0 1-.354-.146l-4-4a.5.5 0 0 1 .708-.708L8 10.293l3.646-3.647a.5.5 0 1 1 .708.708l-4 4A.5.5 0 0 1 8 12z"/>
                        </svg>
                    </div>
                </>
            ) : (
                <>
                    <ul role="status" className="w-full animate-pulse space-y-2 mb-6">
                        <li className="h-[200px] bg-gray-200 rounded-md dark:bg-gray-300 max-w-[70%]" />
                    </ul>
                    <Skeleton count={10} itemClassName="!h-[80px]" /> 
                </>
            )}
        </div>
    );
}
