import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SparkleMedium from "./sparkle-medium";
import SparkleSmall from "./sparkle-small";
import RichText from "../Texts/RichText";
import SparkleBig from "./sparkle-big";
import { PrismicImage } from "@prismicio/react";

import ButterflyLineA from "@/assets/butterfly-line-A.svg";
import ButterflyLineB from "@/assets/butterfly-line-B.svg";
import ButterFlyA from "@/assets/butterfly-A.svg";
import ButterFlyB from "@/assets/butterfly-B.svg";

gsap.registerPlugin(ScrollTrigger);

export default function SparkleText({ slice, isRight, onContentChange,isActive,
 componentName, }) {
  // useEffect(() => {
  //   gsap.fromTo(
  //     ".image-1-trigger",
  //     { clipPath: "inset(100% 0 0 0)" },
  //     {
  //       clipPath: "inset(0% 0 0 0)",
  //       duration: 2,

  //       ease: "power3.out",

  //       scrollTrigger: {
  //         trigger: ".image-2-trigger",
  //         top: "10%",

  //         bottom: "40%",
  //         toggleActions: "play pause resume none ",
  //       },
  //     }
  //   );
  //   gsap.fromTo(
  //     ".image-2-trigger",
  //     { clipPath: "inset(100% 0 0 0)" },
  //     {
  //       clipPath: "inset(0% 0 0 0)",
  //       duration: 2,
  //       delay: 0.4,
  //       ease: "power3.out",

  //       scrollTrigger: {
  //         trigger: ".image-2-trigger",
  //         top: "10%",

  //         bottom: "40%",
  //         toggleActions: "play pause resume none ",
  //       },
  //     }
  //   );

  //   gsap.fromTo(
  //     ".sparkle-big",
  //     {
  //       yPercent: 50,
  //       opacity: 0,
  //     },
  //     {
  //       yPercent: 0,
  //       opacity: 1,
  //       duration: 1,
  //       ease: "power3.out",
  //       scrollTrigger: {
  //         trigger: ".sparkle-big",
  //         top: "10%",
  //         bottom: "40%",
  //         toggleActions: "play pause resume none ",
  //       },
  //       onComplete: () => {
  //         gsap.to(".sparkle-big", {
  //           scale: 1.2,
  //           opacity: 0.8,
  //           duration: 0.5,
  //           ease: "power1.inOut",
  //           yoyo: true,
  //           repeat: -1,
  //         });
  //       },
  //     }
  //   );
  //   gsap.fromTo(
  //     ".sparkle-medium",
  //     { yPercent: 50, opacity: 0 },
  //     {
  //       yPercent: 0,
  //       opacity: 1,
  //       duration: 1,
  //       ease: "power3.out",
  //       delay: 0.4,
  //       scrollTrigger: {
  //         trigger: ".sparkle-medium",
  //         top: "10%",
  //         bottom: "40%",
  //         toggleActions: "play pause resume none ",
  //       },
  //       onComplete: () => {
  //         gsap.to(".sparkle-medium", {
  //           rotation: 15,
  //           scale: 1.1,
  //           duration: 0.6,
  //           ease: "power1.inOut",
  //           yoyo: true,
  //           repeat: -1,
  //         });
  //       },
  //     }
  //   );
  //   gsap.fromTo(
  //     ".sparkle-small",
  //     { yPercent: 50, opacity: 0 },
  //     {
  //       yPercent: 0,
  //       opacity: 1,
  //       duration: 1,
  //       ease: "power3.out",
  //       delay: 0.6,
  //       scrollTrigger: {
  //         trigger: ".sparkle-small",
  //         top: "10%",
  //         bottom: "40%",
  //         toggleActions: "play pause resume none ",
  //       },
  //       onComplete: () => {
  //         gsap.to(".sparkle-small", {
  //           scale: 0.9,
  //           opacity: 0.6,
  //           duration: 0.4,
  //           ease: "power2.inOut",
  //           yoyo: true,
  //           repeat: -1,
  //         });
  //       },
  //     }
  //   );
  // }, []);

  const text_b_modified = slice.text_b.replace(/\+/g, "").trim();

  const handleClick = () => {

    // const element = event.target;

    // gsap.fromTo(
    //   element,
    //   { scale: 1 },
    //   {
    //     scale: 0.9,
    //     duration: 0.2,

    //     onComplete: () => {
    //       gsap.to(element, { scale: 1, duration: 0.2 });
    //     },
    //   }
    // ); 

    /* TODO
      Unwanted gsap calculation for a simple and singular click event, 
      can use tailwind css. Optimize performance 
    */

    const title = isRight
      ? "The " + text_b_modified
      : "The " + `${slice.text_a}`;
    const description = isRight
      ? `${slice.vision_description}`
      : `${slice.mission_description}`;

    onContentChange(title, description);

  };
  
  let content = (
    <>
       <RichText
          text={slice.text_a}
          className="text-description active:scale-90 transition-all font-ambit-regular text-7xl text-deep-green flex justify-end hover:cursor-pointer hover:text-opacity-70"
          onClick={handleClick} 
        />
      <div className="w-full 950px:w-[40%] h-auto relative">
      {slice.image_a.url ? (
          <>
            <PrismicImage
              className="image-1-trigger rounded-2xl w-full h-auto max-w-[90%] mx-auto 950px:max-w-none 950px:w-full active:scale-95 transition-all hover:cursor-pointer hover:scale-105"
              onClick={handleClick}
              field={slice.image_a}
              imgixParams={{
                w: 400,
                h: 600,
                fit: "crop",
              }}
            />
          </>
      ) : (
        <Image
          className="rounded-2xl w-full h-full"
          src="/dummy_img.png"
          alt=""
          height={100}
          width={200}
        />
      )}
      {/* <SparkleBig className="sparkle-big absolute hidden md:scale-90 950px:block -top-16 -left-40 2xl:h-24" />
      <SparkleMedium className="sparkle-medium absolute -left-20 -bottom-4 scale-[0.4]" />
      <SparkleMedium className="sparkle-medium absolute -left-[300px] -bottom-4 scale-[0.4]" />
      <SparkleMedium className="sparkle-medium absolute left-3/4 -bottom-16 scale-[0.4]" />
      <SparkleSmall className="sparkle-small absolute right-32 -top-2/4" /> */}
      </div>
    </>
  );

  if (isRight) {
    content = (
      <>
        <div className="w-full 950px:w-[40%] h-auto relative">
          {slice.image_b.url ? (
            <PrismicImage
              className="image-2-trigger rounded-2xl h-full w-full active:scale-95 transition-all hover:cursor-pointer hover:scale-105"
              onClick={handleClick}
              field={slice.image_b}
              imgixParams={{
                w: 400,
                h: 600,
                fit: "crop",
              }}
            />
          ) : (
              <Image
                className="image-trigger rounded-2xl h-full w-full"
                src="/dummy_img.png"
                alt=""
                height={200}
                width={200}
              />            
          )}
            {/* <SparkleMedium 
              className="sparkle-medium absolute hidden 950px:block top-2/4 -right-96 scale-[0.4]" 
            /> */}
            {/* <SparkleSmall className=" sparkle-small absolute -top-16 left-12 950px:top-0 2xl:top-1/4 -translate-y-2/4 950px:-left-[40%] 2xl:-left-44" /> */}
            <TempFillImageComponent 
              src={ButterflyLineA}
              className="absolute -bottom-40 -z-10 -left-24 h-80 w-80"
            />
            <TempFillImageComponent 
              src={ButterFlyA}
              className="absolute -z-10 -top-20 md:-bottom-4 md:-left-20 950px:-left-60 h-24 w-24 950px:h-44 950px:w-44"
            />
            <TempFillImageComponent 
              src={ButterFlyB}
              className="absolute -z-10 -top-40 sm:-right-20 md:-right-[130%] 2xl:-right-full h-24 w-24 950px:h-44 950px:w-44"
            />
            <TempFillImageComponent 
              src={ButterflyLineB}
              className="absolute -top-0 -right-20 md:-right-[110%] 2xl:-right-[78%] -z-10 h-44 w-44"
            />
        </div>
        <RichText
          text={slice.text_b}
          className="text-description active:scale-90 transition-all font-ambit-regular text-7xl text-deep-green flex justify-end hover:cursor-pointer hover:text-opacity-70"
          onClick={handleClick}
        />
      </>
    );
  }

  return (
    <div
      className={`flex ${isRight ? "flex-col-reverse" : "flex-col"} 950px:flex-row 950px:justify-center 950px:items-center gap-8 w-full `}
    >
      {content}
    </div>
  );
}


function TempFillImageComponent({ src, className }) {

  /* 
    TempFillImageComponent div must have absolute class to be used in relative to any other parent div 
  */

  return(
    <div className={className}>
      <div className="relative h-full w-full">
        <Image 
          src={src}
          fill
          alt="image"
        />
      </div>
    </div>
  )

} // TODO convert as required later