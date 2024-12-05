import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import SparkleMedium from "./sparkle-medium";
import SparkleSmall from "./sparkle-small";
import RichText from "../Texts/RichText";
import SparkleBig from "./sparkle-big";
import { PrismicImage } from "@prismicio/react";

gsap.registerPlugin(ScrollTrigger);

export default function SparkleText({ slice, isRight, onContentChange }) {
  useEffect(() => {
    gsap.fromTo(
      ".image-1-trigger",
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 2,

        ease: "power3.out",

        scrollTrigger: {
          trigger: ".image-2-trigger",
          top: "10%",

          bottom: "40%",
          toggleActions: "play pause resume none ",
        },
      }
    );
    gsap.fromTo(
      ".image-2-trigger",
      { clipPath: "inset(100% 0 0 0)" },
      {
        clipPath: "inset(0% 0 0 0)",
        duration: 2,
        delay: 0.4,
        ease: "power3.out",

        scrollTrigger: {
          trigger: ".image-2-trigger",
          top: "10%",

          bottom: "40%",
          toggleActions: "play pause resume none ",
        },
      }
    );

    gsap.fromTo(
      ".sparkle-big",
      {
        yPercent: 50,
        opacity: 0,
      },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".sparkle-big",
          top: "10%",
          bottom: "40%",
          toggleActions: "play pause resume none ",
        },
        onComplete: () => {
          gsap.to(".sparkle-big", {
            scale: 1.2,
            opacity: 0.8,
            duration: 0.5,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      }
    );
    gsap.fromTo(
      ".sparkle-medium",
      { yPercent: 50, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.4,
        scrollTrigger: {
          trigger: ".sparkle-medium",
          top: "10%",
          bottom: "40%",
          toggleActions: "play pause resume none ",
        },
        onComplete: () => {
          gsap.to(".sparkle-medium", {
            rotation: 15,
            scale: 1.1,
            duration: 0.6,
            ease: "power1.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      }
    );
    gsap.fromTo(
      ".sparkle-small",
      { yPercent: 50, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        delay: 0.6,
        scrollTrigger: {
          trigger: ".sparkle-small",
          top: "10%",
          bottom: "40%",
          toggleActions: "play pause resume none ",
        },
        onComplete: () => {
          gsap.to(".sparkle-small", {
            scale: 0.9,
            opacity: 0.6,
            duration: 0.4,
            ease: "power2.inOut",
            yoyo: true,
            repeat: -1,
          });
        },
      }
    );
  }, []);

  const text_b_modified = slice.text_b.replace(/\+/g, "").trim();

  const handleClick = (event) => {
    const element = event.target;

    gsap.fromTo(
      element,
      { scale: 1 },
      {
        scale: 0.9,
        duration: 0.2,

        onComplete: () => {
          gsap.to(element, { scale: 1, duration: 0.2 });
        },
      }
    );

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
        className="font-playfair-display italic text-7xl text-deep-green hover:cursor-pointer  hover:text-opacity-70"
        onClick={handleClick}
      />
      {slice.image_a.url ? (
        <div className="w-full 950px:w-[40%] h-auto relative">
          <PrismicImage
            className=" image-1-trigger rounded-2xl w-full h-auto max-w-[90%] mx-auto 950px:max-w-none 950px:w-full "
            field={slice.image_a}
            imgixParams={{
              w: 400,
              h: 600,
              fit: "crop",
            }}
          />
          <SparkleBig className=" sparkle-big absolute hidden md:scale-90  950px:block top-2/4 -translate-y-2/4 -right-[30%] 2xl:-right-56 2xl:h-24" />
          <SparkleMedium className=" sparkle-medium absolute hidden 950px:block -top-8 h-12 -right-[26%] 2xl:-right-40" />
          <SparkleSmall className="sparkle-small absolute -top-16 right-12 950px:top-auto 950px:bottom-44 950px:-right-[22%] 2xl:bottom-0 2xl:-right-32  " />
        </div>
      ) : (
        <div className="w-full 950px:w-[40%] h-auto relative">
          <Image
            className=" rounded-2xl w-full h-full"
            src="/dummy_img.png"
            alt=""
            height={100}
            width={200}
          />
          <SparkleBig className=" sparkle-big absolute hidden 950px:block top-2/4 -translate-y-2/4 -right-[30%] 2xl:-right-56 2xl:h-24" />
          <SparkleMedium className=" sparkle-medium absolute hidden 950px:block -top-8 h-12 -right-[26%] 2xl:-right-40" />
          <SparkleSmall className="sparkle-small absolute bottom-44 right-12 950px:block 2xl:bottom-0 950px:-right-[22%] 2xl:-right-32" />
        </div>
      )}
    </>
  );

  if (isRight) {
    content = (
      <>
        {slice.image_b.url ? (
          <div className="w-full 950px:w-[40%] h-auto relative">
            <PrismicImage
              className="image-2-trigger rounded-2xl h-full w-full"
              field={slice.image_b}
              imgixParams={{
                w: 400,
                h: 600,
                fit: "crop",
              }}
            />
            <SparkleMedium className=" sparkle-medium absolute hidden 950px:block top-2/4 -translate-y-2/4 950px:-left-[28%] 2xl:-left-40" />
            <SparkleSmall className=" sparkle-small absolute -top-16 left-12 950px:top-0 2xl:top-1/4 -translate-y-2/4 950px:-left-[40%] 2xl:-left-44" />
          </div>
        ) : (
          <div className="w-full 950px:w-[40%] h-auto relative">
            <Image
              className=" image-trigger rounded-2xl h-full w-full"
              src="/dummy_img.png"
              alt=""
              height={200}
              width={200}
            />
            <SparkleMedium className=" sparkle-medium absolute hidden 950px:block top-2/4 -translate-y-2/4 950px:-left-[28%] 2xl:-left-40" />
            <SparkleSmall className=" sparkle-small absolute -top-16 left-12 950px:top-0 2xl:top-1/4 -translate-y-2/4 950px:-left-[40%] 2xl:-left-44" />
          </div>
        )}
        <RichText
          text={slice.text_b}
          className=" text-description font-playfair-display italic text-7xl text-deep-green flex justify-end hover:cursor-pointer hover:text-opacity-70"
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
