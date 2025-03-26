"use client";

import { useState } from "react";
import SliceIdentifier from "@/components/SliceIdentifier";
import TestimonialSingle from "@/components/Testimonials/testimonial-single";
import RichText from "@/components/Texts/RichText";
import SwiperArrow from "@/components/UI/SwiperArrow";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";

/** ✅ Moved out */
const RenderIdentifier = ({ show, text }) => {
  if (!show) return null;
  return <SliceIdentifier text={text} />;
};

/**
 * @typedef {import("@prismicio/client").Content.TestimonialSlice} TestimonialSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TestimonialSlice>} TestimonialProps
 * @param {TestimonialProps}
 */
const Testimonial = ({ slice, context }) => {
  const { show_identifier, slice_identifier } = slice.primary;
  const { addPadding } = context;
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = slice.primary.content;
  const length = testimonials.length;

  const nextTestimonial = () => {
    if (activeIndex < testimonials.length - 1) {
      setActiveIndex((prev) => prev + 1);
    }
  };

  const prevTestimonial = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  if (slice.variation === "optionC") {
    return (
      <section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
        <RenderIdentifier show={show_identifier} text={slice_identifier} />

        <div className="min-h-[800px] relative flex flex-col items-center justify-center">
          <div className="single-test-bg absolute top-[60%] -translate-y-2/4 left-2/4 -translate-x-2/4 h-[400px] rounded-full w-full" />
          <div className="bg-white py-4 px-4 scale-75 lg:scale-100 lg:px-8 rounded-[20px] min-h-[28rem] w-[350px] lg:max-w-[24rem] relative bottom-24 -left-12 sm:-left-24 lg:-left-52 -rotate-[2deg] z-20">
            <div className="min-h-[28rem] flex flex-col justify-between">
              <div>
                <Image src="/quote.svg" alt="" height={80} width={80} />
                <RichText
                  text={slice.primary.quote}
                  className="font-ambit-regular text-4xl text-deep-green mt-12"
                />
              </div>
              <p className="flex w-[50%] sm:w-full">
                <span className="text-deep-green font-ambit-regular text-lg">
                  {slice.primary.name}
                </span>
                ,<br />
                <span className="text-[#9DA59F] font-ambit-regular text-lg">
                  {slice.primary.designation}
                </span>
              </p>
            </div>
          </div>
          <div className="scale-50 sm:scale-75 lg:scale-100 w-[350px] lg:max-w-[24rem] h-[32rem] absolute left-[53%] -translate-x-1/4 top-[30%] rotate-[4deg] z-20">
            <PrismicNextImage
              field={slice.primary.image}
              alt=""
              className="h-full w-full object-cover rounded-[20px]"
            />
          </div>
        </div>
      </section>
    );
  }

  if (slice.variation === "optionD") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={`${addPadding ? "universal-padding" : ""} mt-16`}
      >
        <RenderIdentifier show={show_identifier} text={slice_identifier} />

        <h1 className="text-7xl text-center font-ambit-regular w-[8ch] mx-auto">
          {slice.primary.title}
        </h1>

        <div className="min-h-[800px] relative flex flex-col items-center justify-center">
          <div className="single-test-bg absolute top-[60%] -translate-y-2/4 left-2/4 -translate-x-2/4 h-[400px] rounded-full w-full" />

          <div className="bg-white py-4 px-4 scale-75 lg:scale-100 lg:px-8 rounded-[20px] min-h-[28rem] w-[350px] lg:max-w-[24rem] relative bottom-24 -left-12 sm:-left-24 lg:-left-52 -rotate-[2deg] z-20">
            <PrismicNextImage
              field={slice.primary.asset}
              alt=""
              height={80}
              width={80}
              className="absolute bottom-[18%] left-1/2 transform -translate-x-1/2 w-full"
            />

            <div className="min-h-[28rem] flex flex-col justify-between">
              <div>
                <Image src="/quotes-new.png" alt="" height={80} width={80} />
                <RichText
                  text={slice.primary.quote}
                  className="font-ambit-regular text-4xl text-deep-green mt-12"
                />
              </div>
              <p className="flex w-[50%] sm:w-full">
                <span className="text-deep-green font-ambit-regular text-lg">
                  {slice.primary.name}
                </span>
                ,<br />
                <span className="text-[#9DA59F] font-ambit-regular text-lg">
                  {slice.primary.designation}
                </span>
              </p>
            </div>
          </div>

          <div className="scale-50 sm:scale-75 lg:scale-100 w-[350px] lg:max-w-[24rem] h-[32rem] absolute left-[53%] -translate-x-1/4 top-[30%] rotate-[4deg] z-20">
            <PrismicNextImage
              field={slice.primary.image}
              alt=""
              className="h-full w-full object-cover rounded-[20px]"
            />
          </div>
        </div>
      </section>
    );
  }

  if (slice.variation === "testimonialMultiple") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={`${addPadding ? "universal-padding" : ""} mt-16`}
      >
        <RenderIdentifier show={show_identifier} text={slice_identifier} />

        <h1 className="text-5xl md:text-7xl text-left md:text-center font-ambit-regular md:w-[8ch] md:mx-auto mt-12">
          {slice.primary.title}
        </h1>

        <div className="min-h-[600px] md:min-h-[800px] relative flex flex-col items-center justify-center">
          <div className="single-test-bg absolute top-[60%] -translate-y-2/4 left-2/4 -translate-x-2/4 h-[400px] rounded-full w-full" />

          <div className="bg-white py-4 px-4 scale-75 lg:scale-100 lg:px-8 rounded-[20px] min-h-[28rem] w-[350px] lg:max-w-[24rem] relative bottom-24 -left-12 sm:-left-24 lg:-left-52 -rotate-[2deg] z-20">
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
              <p className="flex sm:w-full">
                <span className="text-black font-ambit-regular text-lg w-[72%]">
                  {testimonials[activeIndex].name}
                </span>
              </p>
            </div>
          </div>

          <div className="scale-50 sm:scale-75 lg:scale-100 w-[350px] lg:max-w-[24rem] h-[32rem] absolute left-[50%] -translate-x-1/4 top-[30%] rotate-[4deg] z-20">
            <PrismicNextImage
              field={testimonials[activeIndex].image}
              alt=""
              className="h-full w-full object-cover rounded-[20px]"
            />
          </div>
        </div>

        {length > 1 && (
          <div className="flex gap-2 items-center justify-center mt-4">
            <SwiperArrow
              strokeColor="#37473C"
              className="rotate-180"
              onClick={prevTestimonial}
              isDisabled={activeIndex === 0}
            />
            <SwiperArrow
              strokeColor="#37473C"
              onClick={nextTestimonial}
              isDisabled={activeIndex === testimonials.length - 1}
            />
          </div>
        )}
      </section>
    );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding"
    >
      <RenderIdentifier show={show_identifier} text={slice_identifier} />
      {slice.variation === "single" && <TestimonialSingle slice={slice} />}
    </section>
  );
};

export default Testimonial;
