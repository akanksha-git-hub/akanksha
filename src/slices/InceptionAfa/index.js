"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicImage, PrismicRichText } from "@prismicio/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.InceptionAfaSlice} InceptionAfaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<InceptionAfaSlice>} InceptionAfaProps
 * @param {InceptionAfaProps}
 */
const InceptionAfa = ({ slice }) => {
  const sectionRef = useRef();
  const bgColor = slice.primary.bg_color || "#F6AC27";

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🔹 Background and curve fade-in (once)
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      })
        .from(".curve-mask", {
          y: -40,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
        })
        .from(".bg-grid", {
          opacity: 0,
          duration: 1,
        }, "-=0.8");

      // 🔹 Scroll-linked (scrub) animation for image and text box
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true,
        },
      })
        .from(".image-block", {
          x: -100,
          opacity: 0,
          ease: "power2.out",
        })
        .from(".text-box", {
          x: 100,
          opacity: 0,
          ease: "power2.out",
        }, "-=0.4");

      // 🔹 Infinite rotation for box assets
      gsap.to(".rotating-box", {
        rotate: 360,
        duration: 10,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".rotating-box-1", {
        rotate: -360,
        duration: 12,
        repeat: -1,
        ease: "none",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full mt-96 h-[1200px] md:h-[1100px] lg:h-[900px] overflow-hidden"
    >
      {/* 🔳 Curve Mask */}
      <div className="curves curve-mask" />

      {/* 🔳 Background Grid with dynamic Prismic color */}
      <div
        style={{ backgroundColor: bgColor }}
        className="absolute inset-0 -z-10 w-full 
        bg-[linear-gradient(to_right,#7a4e0e33_1px,transparent_1px),linear-gradient(to_bottom,#7a4e0e33_1px,transparent_1px)] 
        bg-[size:44px_78px] bg-grid"
      />

      {/* 🔳 Content Row */}
      <div className="flex justify-center items-center lg:justify-start lg:items-start flex-col-reverse lg:flex-row gap-6 mt-56">
        {/* Left Image */}
        <div className="image-block flex w-full lg:w-[50%] justify-center items-center mt-16">
          <PrismicImage
            field={slice.primary.asset}
            className="h-[300px] w-[300px] lg:h-[500px] lg:w-[500px]"
          />
        </div>

        {/* Text Box / Card */}
        <div className="text-box flex transform w-full lg:w-[50%] justify-start p-10 lg:max-h-[375px] max-w-[320px] md:max-w-[500px] items-start rotate-6 bg-white font-ambit-regular relative border-black border-2 rounded-xl">
          <div className="w-[70%] text-lg">
            <PrismicRichText field={slice.primary.info_description} />
          </div>
          <PrismicImage
            field={slice.primary.box_asset}
            className="absolute bottom-12 right-12 w-20 rotating-box"
          />
          <PrismicImage
            field={slice.primary.box_asset_small}
            className="absolute bottom-[130px] right-6 w-10 rotating-box-1"
          />
        </div>
      </div>
    </section>
  );
};

export default InceptionAfa;
