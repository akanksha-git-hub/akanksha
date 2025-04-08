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

      // 1️⃣ First: Top & Left image slide from top (no fade)
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
    <section className="w-full" ref={heroRef}>
      {/* ✅ Desktop & Tablet layout */}
      <div className="hidden md:block relative max-w-screen-xl mx-auto mt-8 mb-48">
        {/* Floating Product Card Left */}
        <div className="absolute left-12 -bottom-72 z-10 product-card">
          <ProductCard
            image="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80"
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
          <h1 className="text-5xl lg:text-8xl text-black font-ambit-regular md:w-[8ch] text-center heading">
            {slice.primary.heading}
          </h1>

          <p className="text-[1.35rem] text-black text-left w-[40%] font-ambit-regular description">
            {slice.primary.description}
          </p>
        </div>

        {/* Positioned Prismic Images */}
        <PrismicImage field={slice.primary.bottom_single} className="absolute -bottom-16 left-96 w-12 z-10 prismic-img" />
        <PrismicImage field={slice.primary.bottom_image_set} className="absolute -bottom-64 right-[38%] w-80 z-10 prismic-img" />
        <PrismicImage field={slice.primary.right_image_2} className="absolute top-12 -right-28 w-96 z-10 prismic-img" />
        <PrismicImage field={slice.primary.right_image} className="absolute -top-12 right-44 w-48 z-10 image-left" />
        
        {/* These two come first */}
        <PrismicImage field={slice.primary.top} className="absolute -top-12 right-[40%] w-8 z-10 prismic-img " />
        <PrismicImage field={slice.primary.left_image} className="absolute top-72 left-52 w-8 z-10 image-top " />

        {/* Floating Product Card Right */}
        <div className="absolute right-0 -bottom-[580px] z-10 product-card">
          <ProductCard
            image="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80"
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
            image="https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=600&q=80"
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

      {/* ✅ Mobile layout */}
      <div className="block md:hidden px-6 py-12 space-y-6">
        <h1 className="text-4xl text-black font-ambit-regular text-center leading-tight heading">
          Art for Akanksha
        </h1>

        <p className="text-base text-black font-ambit-regular leading-relaxed description">
          Art for Akankshas mission is to provide a powerful art education that empowers children to express themselves through visual storytelling.
        </p>
      </div>
    </section>
  );
};

export default ArtHeroSection;
