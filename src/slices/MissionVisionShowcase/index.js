"use client";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import RichText from "@/components/Texts/RichText";
import { PrismicImage } from "@prismicio/react";

import ButterflyLineA from "@/assets/butterfly-line-A.svg";
import ButterflyLineB from "@/assets/butterfly-line-B.svg";
import ButterFlyA from "@/assets/butterfly-A.svg";
import ButterFlyB from "@/assets/butterfly-B.svg";
import RichTextRenderer from "@/components/v2-components/RichTextRenderer";

gsap.registerPlugin(ScrollTrigger);

const MissionVisionShowcase = ({ slice }) => {
  const [activeComponent, setActiveComponent] = useState("mission");

  const handleContentChange = (component) => setActiveComponent(component);

  // Re-run the gsap animation when the activeComponent changes
  useEffect(() => {
    gsap.fromTo(
      ".description-container",
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power3.out" }
    );
  }, [activeComponent]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding mt-8 950px:my-8"
    >
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {/* Header: Side-by-Side Tabs */}
        <div className="flex justify-left items-center space-x-2">
          <button
            onClick={() => handleContentChange("mission")}
            className={`text-4xl md:text-5xl font-ambit-regular text-black transition-all ${
              activeComponent === "mission"
                ? "underline underline-offset-4"
                : "opacity-60 hover:opacity-80"
            }`}
          >
            Mission
          </button>

          {/* Comma in its own span, so it won't inherit the underline/hover styles */}
          <span className="text-4xl md:text-5xl font-ambit-regular text-black">
            ,
          </span>

          <button
            onClick={() => handleContentChange("vision")}
            className={`text-4xl md:text-5xl font-ambit-regular text-black transition-all ${
              activeComponent === "vision"
                ? "underline underline-offset-4"
                : "opacity-60 hover:opacity-80"
            }`}
          >
            Vision
          </button>
        </div>

        {/* Image: Only one image based on the active component */}
        <div className="mt-6 w-[80%] relative">
          <MobileSparkleImage
            slice={slice.primary}
            activeComponent={activeComponent}
            onClick={() => handleContentChange(activeComponent)}
          />
        </div>

        {/* Description */}
       <div className="description-container mt-8">
  <RichTextRenderer
    className="text-left text-xl text-black font-ambit-regular"
    field={
      activeComponent === "mission"
        ? slice.primary.mission_description_new
        : slice.primary.vision_description_new
    }
  />
</div>
        <div className="absolute top-40 -right-36 transform -translate-x-1/2  pointer-events-none">
          <Image
            src={ButterFlyA}
            alt="Decorative butterfly"
            width={160}
            height={160}
          />
        </div>
      </div>

      {/* Large Layout  */}
      <div className="hidden lg:block">
        {/* Mission & Vision Toggle */}
        <div className="flex flex-col items-center justify-center space-y-8 950px:space-y-3">
          <SparkleText
            slice={slice.primary}
            isRight={false}
            isActive={activeComponent === "mission"}
            onClick={() => handleContentChange("mission")}
          />
          <SparkleText
            slice={slice.primary}
            isRight={true}
            isActive={activeComponent === "vision"}
            onClick={() => handleContentChange("vision")}
          />
        </div>

        {/* Description */}
        <div className="description-container mt-12 space-y-2 flex flex-col 950px:items-center 950px:justify-center">
         <RichTextRenderer
  className="text-left 950px:text-center text-base text-black font-ambit-regular sm:text-xl 950px:text-2xl w-full 950px:w-[80%]"
  field={
    activeComponent === "mission"
      ? slice.primary.mission_description_new
      : slice.primary.vision_description_new
  }
/>

        </div>
      </div>
    </section>
  );
};

export default MissionVisionShowcase;

/* 
  MobileSparkleImage Component 
  Renders only the image corresponding to the selected tab.
*/
const MobileSparkleImage = ({ slice, activeComponent, onClick }) => {
  const imageField =
    activeComponent === "mission" ? slice.image_a : slice.image_b;
  return (
    <>
      {imageField?.url ? (
        <PrismicImage
          className="rounded-2xl w-full h-auto transition-all cursor-pointer mx-auto"
          onClick={onClick}
          field={imageField}
          imgixParams={{ w: 400, h: 750, fit: "crop" }}
        />
      ) : (
        <Image
          className="rounded-2xl w-full h-full transition-all cursor-pointer"
          src="/dummy_img.png"
          alt="Placeholder"
          height={200}
          width={200}
          onClick={onClick}
        />
      )}
    </>
  );
};

/* Sparkle Text Component for large screens */
const SparkleText = ({ slice, isRight, isActive, onClick }) => {
  const imageField = isRight ? slice.image_b : slice.image_a;
  const text = isRight ? slice.text_b : slice.text_a;

  return (
    <div
      className={`flex 950px:flex-row 950px:justify-center 950px:items-center w-full gap-8 ${
        isRight ? "flex-col-reverse 950px:flex-row-reverse" : "flex-col"
      }`}
    >
      {/* Title */}
      <RichText
        text={text}
        className={`text-description font-ambit-regular text-7xl text-black flex justify-end transition-all cursor-pointer ${
          isActive ? "opacity-100 underline" : "opacity-50 hover:opacity-80"
        }`}
        onClick={onClick}
      />

      {/* Image */}
      <div className="w-full 950px:w-[40%] h-auto relative">
        {imageField?.url ? (
          <PrismicImage
            className={`rounded-2xl w-full h-auto max-w-[90%] mx-auto 950px:max-w-none 950px:w-full transition-all cursor-pointer ${
              isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
            }`}
            onClick={onClick}
            field={imageField}
            imgixParams={{ w: 400, h: 720, fit: "crop" }}
          />
        ) : (
          <Image
            className={`rounded-2xl w-full h-full transition-all ${
              isActive ? "opacity-100" : "opacity-50 hover:opacity-80"
            }`}
            src="/dummy_img.png"
            alt="Placeholder"
            height={200}
            width={200}
          />
        )}
        {isRight ? <DecorativeImagesRight /> : <DecorativeImagesLeft />}
      </div>
    </div>
  );
};

// Decorative Images Components
const DecorativeImagesLeft = () => (
  <TempFillImageComponent
    src={ButterflyLineA}
    className="absolute -bottom-40 -z-10 -left-24 h-80 w-80"
  />
);

const DecorativeImagesRight = () => (
  <>
    <TempFillImageComponent
      src={ButterFlyA}
      className="absolute -z-10 -top-20 md:-bottom-4 md:-left-20 950px:-left-60 h-24 w-24 950px:h-52 950px:w-52"
    />
    <TempFillImageComponent
      src={ButterFlyB}
      className="absolute -z-10 -top-40 sm:-right-20 md:-right-[140%] xl:-right-[80%] h-24 w-24 950px:h-52 950px:w-52"
    />
    <TempFillImageComponent
      src={ButterflyLineB}
      className="absolute -top-0 -right-20 md:-right-[78%] block md:hidden xl:block 2xl:-right-[65%] -z-10 h-32 w-32"
    />
  </>
);

// Temp Image Component
const TempFillImageComponent = ({ src, className }) => (
  <div className={className}>
    <div className="relative h-full w-full">
      <Image src={src} fill alt="Decorative element" />
    </div>
  </div>
);
