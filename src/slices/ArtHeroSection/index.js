"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import CTABtn from "@/components/afa/CTABtn";
import ProductCard from "@/components/afa/ProductCard";
import TapeTag from "@/components/afa/TapeTag";
import { PrismicImage } from "@prismicio/react";

const ArtHeroSection = ({ slice }) => {
  const heroRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.set(heroRef.current, { opacity: 1 });

      // 1️⃣ First: Top & Left image slide from top
      tl.from(".image-top", { y: -100, duration: 1 })
        .from(".image-left", { y: -100, duration: 1 }, "-=0.9");

      // 2️⃣ Heading & Description scale from 0
      tl.from(".heading", { scale: 0, duration: 0.8 }, "-=0.3")
        .from(".description", { scale: 0, duration: 0.8 }, "-=0.6");

      // 3️⃣ Other Prismic images slide from below with fade
      tl.from(".prismic-img", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
      }, "-=0.6");

      // 4️⃣ ProductCards slide in last
      tl.from(".product-card", { opacity: 0, y: 40, duration: 1 }, "-=0.6");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full opacity-0" ref={heroRef}>
      {/* ✅ Desktop layout */}
      <div className="hidden lg:block relative max-w-screen-xl mx-auto mt-8 mb-48">
        {/* Floating Product Card Left */}
        <div className="absolute -left-0 -bottom-[380px] z-10 product-card">
          <ProductCard
             image={slice.primary.sticker_image_3?.url}
            tagPosition="top-left"
            tagRotation={-20}
            tagScale={0.9}
            tagOffset={{ top: "-32px", left: "-55px" }}
            variant="image-only"
            cardRotation={-8}
            cardScale={0.7}
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center space-y-8">
          <h1 className="   text-5xl lg:text-8xl text-black font-ambit-regular md:w-[8ch] text-center heading">
            {slice.primary.heading}
          </h1>

          <p className="text-[1.35rem] text-black text-left w-[40%] font-ambit-regular description">
            {slice.primary.description}
          </p>
        </div>

      
        <PrismicImage field={slice.primary.bottom_single} className="absolute -bottom-16 left-96 w-12 z-10 prismic-img" />
        <PrismicImage field={slice.primary.bottom_image_set} className="absolute -bottom-64 right-[38%] w-80 z-10 prismic-img" />
        <PrismicImage field={slice.primary.right_image_2} className="absolute top-12 -right-28 w-96 z-10 prismic-img" />
        <PrismicImage field={slice.primary.right_image} className="absolute -top-12 right-44 w-48 z-10 image-left" />

        <PrismicImage field={slice.primary.top} className="absolute -top-12 right-[40%] w-8 z-10 prismic-img" />
        <PrismicImage field={slice.primary.left_image} className="absolute top-72 left-52 w-8 z-10 image-top" />

        {/* Floating Product Card Right */}
        <div className="absolute right-0 -bottom-[470px] z-10 product-card">
          <ProductCard
            image={
              slice.primary.sticker_image_1?.url }
            tagPosition="top-left"
            tagRotation={-20}
            tagScale={0.8}
            tagOffset={{ top: "-32px", left: "-55px" }}
            variant="image-only"
            cardRotation={12}
            cardScale={0.9}
          />
        </div>

        {/* Floating Product Card Left Top */}
        <div className="absolute -left-48 -top-12 z-10 product-card">
          <ProductCard
             image={
              slice.primary.sticker_image_2?.url}
            tagPosition="top-left"
            tagRotation={-20}
            tagScale={0.8}
            tagOffset={{ top: "-32px", left: "-55px" }}
            variant="image-only"
            cardRotation={0}
            cardScale={0.9}
          />
        </div>
      </div>

      {/*  Mobile layout */}
      <div className="block lg:hidden relative max-w-screen-xl mx-auto mt-8 mb-48 universal-padding">
        {/* Floating Product Card Left */}
        <div className="absolute -left-20 -bottom-[340px] md:-bottom-[380px] -z-10 product-card">
          <ProductCard
             image={slice.primary.sticker_image_3?.url}
            tagPosition="top-left"
            tagRotation={-20}
            tagScale={0.9}
            tagOffset={{ top: "-32px", left: "-55px" }}
            variant="image-only"
            cardRotation={-8}
            cardScale={0.6}
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center space-y-8">
          <h1 className="   text-5xl lg:text-8xl text-black font-ambit-regular md:w-[8ch] text-left md:text-center heading">
            {slice.primary.heading}
          </h1>

          <p className="text-[1.35rem] text-black text-left md:text-center  font-ambit-regular description">
            {slice.primary.description}
          </p>
        </div>

      
        <PrismicImage field={slice.primary.bottom_single} className="absolute -bottom-16 left-96 w-12 z-10 prismic-img" />
        <PrismicImage field={slice.primary.bottom_image_set} className="absolute md:block hidden  -bottom-64 right-[38%] w-80 z-10 prismic-img" />
        <PrismicImage field={slice.primary.right_image_2} className="absolute top-[30rem] md:top-12 -right-0 md:-right-52 w-44 md:w-96 z-10 prismic-img" />
        <PrismicImage field={slice.primary.right_image} className=" absolute -top-12 right-0 md:right-16 w-48 z-10 image-left" />

        <PrismicImage field={slice.primary.top} className="absolute -top-12 right-[40%] w-8 z-10 prismic-img" />
        <PrismicImage field={slice.primary.left_image} className="hidden md:block absolute top-96 left-52 w-8 z-10 image-top" />

        {/* Floating Product Card Right */}
        <div className="absolute -right-10 md:right-0 -bottom-[590px] md:-bottom-[550px] z-10 product-card">
          <ProductCard
            image={
              slice.primary.sticker_image_1?.url }
            tagPosition="top-left"
            tagRotation={-20}
            tagScale={0.8}
            tagOffset={{ top: "-32px", left: "-55px" }}
            variant="image-only"
            cardRotation={12}
            cardScale={0.7}
          />
        </div>

        {/* Floating Product Card Left Top */}
        <div className="hidden md:block  absolute -left-20 -top-44 z-10 product-card">
          <ProductCard
             image={
              slice.primary.sticker_image_2?.url}
            tagPosition="top-left"
            tagRotation={-20}
            tagScale={0.8}
            tagOffset={{ top: "-32px", left: "-55px" }}
            variant="image-only"
            cardRotation={-12}
            cardScale={0.4}
          />
        </div>
      </div>
    </section>
  );
};

export default ArtHeroSection;
