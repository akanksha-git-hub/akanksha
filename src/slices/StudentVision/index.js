"use client";
import { useState } from "react";
import SliceIdentifier from "@/components/SliceIdentifier";
import SwiperArrow from "@/components/UI/SwiperArrow";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.StudentVisionSlice} StudentVisionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StudentVisionSlice>} StudentVisionProps
 * @param {StudentVisionProps}
 */
const StudentVision = ({ slice }) => {
  const [trackIndex, setTrackIndex] = useState(0);

  // Navigation functions
  const swipePrev = () => {
    if (trackIndex > 0) {
      setTrackIndex(trackIndex - 1);
    }
  };

  const swipeNext = () => {
    if (trackIndex < slice.primary.description.length - 1) {
      setTrackIndex(trackIndex + 1);
    }
  };

  if (slice.variation === "withBgImage") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="universal-padding mt-8"
      >
        <SliceIdentifier text={slice.primary.slice_identifier} />

        <div className="flex flex-col justify-center items-center">
          <h1 className="mt-8 text-7xl font-ambit-regular">
            {slice.primary.title}
          </h1>

          <div className="relative h-full w-full flex items-center justify-center">
            <div className="">
              <PrismicNextImage
                field={slice.primary.bg_image}
                alt="bg-image"
                fill
                className="absolute top-0 left-0 -z-10"
              />
            </div>
            <PrismicNextImage
              height={500}
              width={500}
              field={slice.primary.image}
              alt=""
            />
          </div>
          {/* Display current description */}
          <p className="text-center w-[50%] font-ambit-regular mt-4">
            {slice.primary.description[trackIndex].desc}
          </p>

          {/* Navigation buttons */}
          <div className="flex gap-2 mt-4">
            <SwiperArrow
              strokeColor="#37473C"
              className="rotate-180"
              onClick={swipePrev}
              isDisabled={trackIndex === 0}
            />
            <SwiperArrow
              strokeColor="#37473C"
              onClick={swipeNext}
              isDisabled={
                trackIndex === slice.primary.description.length - 1
                  ? true
                  : false
              }
            />
          </div>
        </div>
      </section>
    );
  }
  if (slice.variation === "simple") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className=" mt-8"
      >
        <SliceIdentifier text={slice.primary.slice_identifier} />

        <div className="flex flex-col justify-center items-center relative">
          <h1 className="mt-8 text-7xl md:w-[10ch] font-ambit-regular">
            {slice.primary.title}
          </h1>
          <p className="md:text-center md:w-[40%] font-ambit-regular mt-4 text-left">
            {slice.primary.description}
          </p>
          <div className="">
            <PrismicNextImage
              field={slice.primary.asset_1}
              alt="left-asset"
              height={220}
              width={220}
              className=" absolute hidden md:block md:-right-[8%] md:top-[8%]  lg:top-[18%] lg:right-[12%] -z-10"
            />
          </div>
          <div className="">
            <PrismicNextImage
              field={slice.primary.asset_2}
              alt="right-asset"
              height={120}
              width={120}
              className=" absolute hidden md:block md:-right-[5%] md:top-[28%]  lg:top-[30%] lg:right-[6%] -z-10"
            />
          </div>
          <div className="relative h-full w-full flex items-center justify-center">
            {/* <div className="">
              <PrismicNextImage
                field={slice.primary.bg_image}
                alt="bg-image"
                fill
                className="absolute top-0 left-0 -z-10"
              />
            </div> */}
            <PrismicNextImage
              height={900}
              width={900}
              field={slice.primary.image}
              alt=""
            />
          </div>
          {/* Display current description */}
        </div>
      </section>
    );
  }
  if (slice.variation === "gallery") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className=" mt-8"
      >
        <SliceIdentifier text={slice.primary.slice_identifier} />
      </section>
    );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" mt-8"
    >
      <SliceIdentifier text={slice.primary.slice_identifier} />

      <div className="flex flex-col justify-center items-center">
        <h1 className="mt-8 text-7xl font-ambit-regular">
          {slice.primary.title}
        </h1>

        <PrismicNextImage
          height={800}
          width={800}
          field={slice.primary.image}
          alt=""
        />

        {/* Display current description */}
        <p className="text-center w-[50%] font-ambit-regular mt-4">
          {slice.primary.description[trackIndex].desc}
        </p>

        {/* Navigation buttons */}
        <div className="flex gap-2 mt-4">
          <SwiperArrow
            strokeColor="#37473C"
            className="rotate-180"
            onClick={swipePrev}
            isDisabled={trackIndex === 0}
          />
          <SwiperArrow
            strokeColor="#37473C"
            onClick={swipeNext}
            isDisabled={
              trackIndex === slice.primary.description.length - 1 ? true : false
            }
          />
        </div>
      </div>
    </section>
  );
};

export default StudentVision;
