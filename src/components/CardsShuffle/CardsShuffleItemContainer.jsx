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
  const arrowRef = useRef(null);

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

      cards.forEach((card, index) => {
        gsap.set(`#${card.id}`, {
          translateY: index === 0 ? "0%" : "10%",
          translateZ: index === 0 ? "120px" : index === 1 ? "100px" : "90px",
          scale: index === 0 ? 1 : 0.9,
        });
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
            onUpdate: (self) => {
              const progress = self.progress; // Get scroll progress
              const isLastCardVisible = progress > 0.95; // Adjust threshold if needed
              gsap.to(arrowRef.current, { opacity: isLastCardVisible ? 0 : 1, duration: 0.5, ease: "power1.out" });
            },
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

      return () => ctx.revert();
    }
  }, [onMount.firstMount, onMount.secondMount, cards]);

  return (
    <div className="pin-wrapper relative min-h-screen">
      <div ref={root} className={`${className} relative`}>
        <ul className={`${itemsContainerClassName} relative`}>
          {slice.map((item, index) => (
            <li
              className={`${itemClassName} relative`}
              key={itemKeyFn(item, index)}
              id={`card-${index + 1}`}
            >
              {children(item, index)}
            </li>
          ))}
        </ul>

        {/* Scroll Down Arrow */}
        <div
          ref={arrowRef}
          className="absolute left-1/2 bottom-5 transform -translate-x-1/2 flex flex-col items-center animate-bounce"
          style={{
            position: "absolute",
            bottom: "-250px", 
            zIndex: 50,
            opacity: 1, // Ensure it starts visible
            transition: "opacity 0.5s ease",
          }}
        >
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
      </div>
    </div>
  );
}
