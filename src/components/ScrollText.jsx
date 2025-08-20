'use client';

import { useEffect, useRef, useState } from "react";
import RichText from "./Texts/RichText";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { PrismicNextImage } from "@prismicio/next";
import Skeleton from "./Skeleton";
import RichTextRenderer from "./v2-components/RichTextRenderer";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollText({ title, prismicTexts, asset_2, asset_1 }) {
  const [onMount, setOnMount] = useState(false);
  const [secondMount, setSecondMount] = useState(false);
  const INITIAL_TEXTS = prismicTexts;
  const [texts, setTexts] = useState(INITIAL_TEXTS);

  const seqRef = useRef({ frame: 1 });
  const timeline = useRef(gsap.timeline());
  const root = useRef();

  const frameCount = 800;

  let travelPixel;

  travelPixel = texts.length * 512.4;

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
          id: `text-${index + 1}`, // ensure each element has a unique id
          startFrame: startFrame,
          endFrame: endFrame,
        };
      });

      return newData;
    });

    setSecondMount(true);
  }, [onMount]);

  useEffect(() => {
    if (secondMount) {
      // Hide all texts except the first one
      texts.forEach((t, index) => {
        if (index !== 0) {
          gsap.set(`#${t.id}`, { opacity: 0, y: 0 });
        }
      });

      const renderTexts = (texts) => {
        if (texts && texts.length > 0) {
          texts.forEach((t) => {
            let cFrame = seqRef.current.frame;
            if (cFrame >= t.startFrame && cFrame <= t.endFrame) {
              gsap.to(`#${t.id}`, { y: 0, opacity: 1, duration: 0.12, ease: 'bounce.out' });
            } else {
              gsap.to(`#${t.id}`, { y: 100, opacity: 0, duration: 0.08, ease: 'bounce.out' });
            }
          });
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
          pinSpacing: true,
          pinSpacer: true,
          scroller: 'body',
          pin: true,
          onUpdate: throttledRender, // throttled render on update
        },
      });
    }
  }, [secondMount]);

  return (
    <div ref={root} className="flex flex-col items-center">
      {secondMount ? (
        <>
          <div className="flex flex-row items-center">
            <div className="hidden lg:block">
              <PrismicNextImage
                field={asset_1}
                width={30}
                height={30}
                className="lg:h-[200px] lg:w-[200px]"
                alt=""
              />
            </div>
          <RichTextRenderer
  field={title}
  className="text-black flex items-center justify-center flex-wrap text-left md:text-center text-4xl lg:text-7xl w-full lg:w-[20ch]"
/>

            <div className="hidden lg:block">
              <PrismicNextImage
                field={asset_2}
                width={30}
                height={30}
                className="lg:h-[200px] lg:w-[200px]"
                alt=""
              />
            </div>
          </div>

          {texts && texts.length > 0 && (
            <div className="relative w-full flex items-center justify-center mt-10">
              {texts.map((text, index) => (
                <div
                  className="flex items-start flex-col lg:flex-row lg:items-center w-full xl:w-[800px] gap-4 absolute top-0 left-2/4 -translate-x-2/4"
                  key={index}
                >
                  <PrismicNextImage
                    field={text.points_image}
                    width={30}
                    height={30}
                    className="h-[120px] w-[120px] lg:h-[200px] lg:w-[200px]"
                    id={`text-${index + 1}`}
                    alt=""
                  />
                  <div key={index} id={`text-${index + 1}`} className="scroll-text">
                    <p className="font-ambit-regular text-black text-2xl lg:text-3xl">{text.point}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bottom Arrow */}
          <div className="flex justify-center mt-96 md:mt-56">
            <svg
              className="w-6 h-6 text-black animate-bounce"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </>
      ) : (
        <>
          <ul role="status" className={`w-full animate-pulse space-y-2 mb-6`}>
            <li className={`h-[200px] bg-gray-200 rounded-md dark:bg-gray-300 max-w-[70%]`} />
          </ul>
          <Skeleton count={10} itemClassName="!h-[80px]" />
        </>
      )}
    </div>
  );
}
