"use client";

import { useState, useEffect } from "react";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";
import CTABtn from "@/components/afa/CTABtn";
import { useSmoothScroller } from "@/components/LenisScrollContext";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.TestimonialSlice} TestimonialSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TestimonialSlice>} TestimonialProps
 * @param {TestimonialProps}
 */
const Testimonial = ({ slice, context }) => {
  const { addPadding } = context;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { stopScroll, startScroll } = useSmoothScroller();

  const testimonials = slice.primary.content;
  const length = testimonials.length;

  const nextTestimonial = () => {
    if (activeIndex < length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const prevTestimonial = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      if (isModalOpen) {
        const scrollY = window.scrollY;
        document.documentElement.style.setProperty("--scroll-y", `-${scrollY}px`);
        document.body.classList.add("modal-open");
        stopScroll();
      } else {
        const scrollY = document.documentElement.style.getPropertyValue("--scroll-y");
        document.body.classList.remove("modal-open");
        window.scrollTo(0, -parseInt(scrollY || "0"));
        startScroll();
      }

      return () => {
        startScroll();
        document.body.classList.remove("modal-open");
      };
    }
  }, [isModalOpen, stopScroll, startScroll]);

  if (slice.variation === "testimonialMultipleAfa") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={`${addPadding ? "universal-padding" : ""} relative mt-32`}
      >
        {/* Left Asset */}
        {slice.primary.left_asset?.url && (
          <div className="absolute left-0 bottom-[40%] h-[220px] w-[220px]">
            <PrismicNextImage
              field={slice.primary.left_asset}
              className="h-full w-full object-contain"
              alt=""
            />
          </div>
        )}

        {/* Right Asset */}
        {slice.primary.right_asset?.url && (
          <div className="absolute right-10 top-0 h-[120px] w-[120px]">
            <PrismicNextImage
              field={slice.primary.right_asset}
              className="h-full w-full object-contain"
              alt=""
            />
          </div>
        )}

        {/* Background */}
        <div className="curves curve-mask -mt-20" />
        <div className="absolute inset-0 -mt-20 -z-10 w-full bg-[#F4456E] bg-[linear-gradient(to_right,#7a4e0e33_1px,transparent_1px),linear-gradient(to_bottom,#7a4e0e33_1px,transparent_1px)] bg-[size:44px_78px] bg-grid" />

        {/* Title */}
        <h1 className="text-5xl md:text-7xl text-left md:text-center text-white font-ambit-regular md:mx-auto mt-12">
          {slice.primary.title}
        </h1>

        {/* Testimonial Block */}
        <div className="min-h-[600px] md:min-h-[800px] relative flex flex-col items-center justify-center">
          {/* Quote Box */}
          <div
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer bg-black py-4 px-4 scale-75 lg:scale-100 lg:px-8 rounded-[20px] min-h-[28rem] w-[350px] lg:max-w-[24rem] relative bottom-24 -left-12 sm:-left-24 lg:-left-60 -rotate-[2deg] z-20"
          >
            <div className="absolute bottom-2 left-1 bg-white w-full h-full rounded-[20px] border-2 border-black -z-10" />
            <PrismicNextImage
              field={testimonials[activeIndex].asset}
              alt=""
              height={80}
              width={80}
              className="absolute bottom-[22%] left-1/2 transform -translate-x-1/2 w-full"
            />
            <div className="min-h-[28rem] flex flex-col justify-between">
              <div>
                <Image src="/quotes-new.png" alt="" height={80} width={80} />
                <p className="font-ambit-regular text-2xl text-black mt-12">
                  {testimonials[activeIndex].quote}
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="scale-50 sm:scale-75 lg:scale-100 w-[350px] lg:max-w-[24rem] h-[32rem] absolute left-[50%] -translate-x-1/4 top-[30%] z-20">
            <PrismicNextImage
              field={testimonials[activeIndex].image}
              alt=""
              className="h-full w-full object-cover rounded-[20px]"
            />
          </div>
        </div>

        {/* Arrows */}
        {length > 1 && (
          <div className="flex gap-2 items-center justify-center mt-4 pb-10">
            <CTABtn variant="arrow-only" direction="left" onClick={prevTestimonial} />
            <CTABtn variant="arrow-only" direction="right" onClick={nextTestimonial} />
          </div>
        )}

        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm px-4 overflow-hidden"
            onClick={() => setIsModalOpen(false)}
          >
            <div
              className="relative bg-black p-6 rounded-[20px] w-[90%] max-w-2xl -rotate-[2deg] border-2 border-black"
              data-lenis-prevent
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute bottom-2 left-2 bg-white w-full h-full rounded-[20px] border-2 border-black -z-10" />
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-black text-xl font-bold z-50"
              >
                ✕
              </button>
              <div className="relative z-10 overflow-y-auto max-h-[70vh] pr-2 no-scrollbar">
                <h2 className="font-ambit-regular text-4xl text-black mb-6">
                  {`${testimonials[activeIndex].name}'s Story`}
                </h2>
                <div className="text-black font-ambit-regular text-lg whitespace-pre-line">
                  <PrismicRichText
                    field={
                      testimonials[activeIndex].full_story ||
                      testimonials[activeIndex].quote
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  }

  return null;
};

export default Testimonial;
