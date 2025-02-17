"use client";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { useCardsShuffleContext } from "./CardsShuffle";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function CardsShuffleItemContainer({
  children,
  itemKeyFn,
  itemClassName,
  itemsContainerClassName,
  className,
}) {
  const { slice } = useCardsShuffleContext();
  const [onMount, setOnMount] = useState({
    firstMount: false,
    secondMount: false,
  });
  const [cards, setCards] = useState(slice);
  const root = useRef(null);

  const frameCount = 1400;
  let travelPixel = cards.length < 4 ? cards.length * 800 : cards.length * 542;

  useEffect(() => {
    if (!onMount.firstMount) {
      setOnMount((prevState) => ({ ...prevState, firstMount: true }));
      return;
    }

    if (!onMount.secondMount) {
      setCards((prevState) => {
        const totalLength = prevState.length;
        const occupyFramesPerItem = frameCount / totalLength;

        let currentFrame = 0;
        let newData = prevState.map((item, index) => {
          const startFrame = currentFrame;
          const endFrame = currentFrame + occupyFramesPerItem;

          currentFrame = endFrame;

          return {
            ...item,
            id: `card-${index + 1}`,
            startFrame,
            endFrame,
          };
        });

        setOnMount((prevState) => ({ ...prevState, secondMount: true }));

        return newData;
      });
    }

    if (onMount.secondMount) {
      gsap.set(".pin-wrapper", { height: "auto" });

      // Set Initial Values for cards (not FIRST INDEX)
      cards.forEach((card, index) => {
        if (index !== 0) {
          if (index === 1) {
            gsap.set(`#${card.id}`, {
              translateY: "10%",
              translateZ: "100px",
              scale: 0.9,
            });
          } else {
            gsap.set(`#${card.id}`, {
              translateY: "10%",
              translateZ: "90px",
              scale: 0.9,
            });
          }
        } else {
          gsap.set(`#${card.id}`, { translateY: "0%", translateZ: "120px" });
        }
      });

      let ctx = gsap.context(() => {
        let tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            scrub: 2,
            start: "top top",
            end: `+=${travelPixel} bottom`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            scroller: "body",
          },
        });

        cards.forEach((card, i) => {
          const currentCard = i + 1;
          const cardLength = cards.length;

          tl.to(currentCard !== cardLength && `#${card.id}`, {
            translateY: "-86%",
            translateZ: "120px",
            duration: 3.5,
            ease: "sine.in",
          })
            .to(currentCard !== cardLength && `#${card.id}`, {
              scale: 0.9,
              duration: 3.5,
              ease: "sine.in",
            })
            .to(currentCard !== cardLength && `#${card.id}`, {
              translateZ: "-100px",
            })
            .to(
              currentCard !== cardLength &&
                currentCard <= cardLength &&
                `#card-${i + 2}`,
              { translateZ: "130px" }
            )
            .to(
              currentCard !== cardLength &&
                currentCard < cardLength &&
                `#card-${i + 3}`,
              { translateZ: "120px" }
            )
            .to(
              currentCard !== cardLength &&
                currentCard <= cardLength &&
                `#card-${i + 2}`,
              { translateY: "10%", scale: 1, duration: 3.5, ease: "sine.in" }
            )
            .to(currentCard !== cardLength && `#${card.id}`, {
              translateY: "10%",
              duration: 3.5,
              scale: 0.9,
              ease: "sine.in",
            });
        });

        ScrollTrigger.refresh();
      });

      return () => ctx.revert(); // cleanup function
    }
  }, [onMount.firstMount, onMount.secondMount, cards]);

  return (
    <div className="pin-wrapper">
      <div ref={root} className={`${className}`}>
        <ul className={itemsContainerClassName}>
          {slice.map((item, index) => (
            <li
              className={`${itemClassName} relative`}
              key={itemKeyFn}
              id={`card-${index + 1}`}
            >
              {children(item, index)}

              {/* Scroll Down Arrow - Only Show if Not Last Card */}
              {index !== slice.length - 1 && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-[-50px] flex flex-col items-center animate-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
