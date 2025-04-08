"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PrismicImage, PrismicRichText } from "@prismicio/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * @typedef {import("@prismicio/client").Content.InceptionAfaSlice} InceptionAfaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<InceptionAfaSlice>} InceptionAfaProps
 * @param {InceptionAfaProps}
 */
const InceptionAfa = ({ slice }) => {
  const sectionRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ✨ Animate wave + background (non-scrub, on enter)
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      })
        .from(".curve-mask", { y: -40, opacity: 0, duration: 1.2, ease: "power2.out" })
        .from(".bg-grid", { opacity: 0, duration: 1 }, "-=0.8");

      // ✨ Animate image + text with scroll scrub
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom bottom", // End a bit earlier
          scrub: true,
        },
      })
        .from(".image-block", { x: -100, opacity: 0 })
        .from(".text-box", { x: 100, opacity: 0, rotate: 2 }, "-=0.6");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full mt-96 h-[900px] overflow-hidden">
      {/* 🔳 Wave Mask */}
      <div className="curves curve-mask" />

      {/* 🔳 Background Grid */}
      <div className="absolute inset-0 -z-10 w-full bg-[#F6AC27] bg-[linear-gradient(to_right,#7a4e0e33_1px,transparent_1px),linear-gradient(to_bottom,#7a4e0e33_1px,transparent_1px)] bg-[size:44px_78px] bg-grid" />

      <div className="flex flex-row gap-6 mt-56">
        {/* 🖼️ Left Image */}
        <div className="flex w-[50%] justify-center items-center image-block">
          <PrismicImage field={slice.primary.asset} className="h-[500px] w-[500px]" />
        </div>

        {/* 💬 Right Text Box */}
        <div className="flex w-[50%] justify-start p-10 max-h-[375px] max-w-[500px] items-start rotate-6 bg-white font-ambit-regular relative border-black border-2 rounded-xl text-box">
          <div className="w-[70%] text-lg">
            <PrismicRichText field={slice.primary.info_description} />
          </div>
          <PrismicImage field={slice.primary.box_asset} className="absolute bottom-12 right-12 w-20" />
        </div>
      </div>
    </section>
  );
};

export default InceptionAfa;
