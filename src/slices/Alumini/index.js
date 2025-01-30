"use client";
import Marquee from "@/components/Marquee";
import MarqueeTypeA from "@/components/Marquee/MarqueeTypeA/MarqueeTypeA";
import MarqueeNew from "@/components/MarqueeNew";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicImage } from "@prismicio/react";
import Image from "next/image";
import { useState } from "react";

/**
 * @typedef {import("@prismicio/client").Content.AluminiSlice} AluminiSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AluminiSlice>} AluminiProps
 * @param {AluminiProps}
 */

const Alumini = ({ slice }) => {
  const data = slice.primary.universities;

  const [activeSection, setActiveSection] = useState("fulltime");
  const [hoveredSection, setHoveredSection] = useState("year_1");
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding  "
    >
      <h1 className="font-ambit-regular text-5xl md:text-6xl lg:text-8xl text-center ">
        {slice.primary.heading}
      </h1>
      

      {/* Parent container for Alumni and Percentage sections */}
      <div className="flex flex-col xl:flex-row mt-8 lg:space-x-12">
        {/* Alumini Enrollment */}
        <div className="flex-1 bg-[#ECF0F1] rounded-lg p-12 md:mr-4 w-full h-[300px] lg:h-[600px] flex flex-col justify-between">
          {/* Card Heading */}
          <div>
            <h1 className="font-ambit-regular text-5xl md:text-6xl lg:text-8xl text-left">
              {slice.primary.card2_heading}
            </h1>
            <p className="font-ambit-regular text-lg md:text-xl  mt-12 w-[75%]">
              {slice.primary.card2_description}
            </p>
          </div>
          <div className="flex flex-wrap justify-around gap-4 mt-4">
            <MarqueeNew data={data} />
          </div>

          {/* Image Section */}
          {/* <div className="flex flex-wrap justify-around gap-4 mt-4">
            <PrismicNextImage
              field={slice.primary.card2_img1}
              alt=""
              className="max-w-[850px]"
            />
            <PrismicNextImage
              field={slice.primary.card2_img2}
              alt=""
              className="max-w-[850px]"
            />
            <PrismicNextImage
              field={slice.primary.card2_img3}
              alt=""
              className="max-w-[850px]"
            />
          </div> */}
        </div>

        {/* Percentage Section */}
        <div className="flex-1 w-full h-[300px] lg:h-[600px] bg-white flex flex-col justify-between p-4">
          <div>
            {/* Fulltime Percentage Section */}
            <div
              className={`flex flex-col mt-4 ${
                activeSection === "fulltime"
                  ? "border border-black bg-[#FBDA1D] w-full"
                  : "border border-black border-dashed w-[80%] xl:w-[75%]"
              } transition-all`}
            >
              <div className="flex justify-start items-center h-[80px] xl:h-[120px] p-4 space-x-2">
                <p className="font-ambit-regular text-5xl xl:text-8xl">
                  {slice.primary.card3_fulltime_percentage}
                </p>
                <p className="font-ambit-regular text-xl md: xl:text-3xl">
                  {slice.primary.card3_fulltime_title}
                </p>
              </div>
            </div>

            {/* Parttime Percentage Section */}
            <div
              className={`flex flex-col mt-4 ${
                activeSection === "parttime"
                  ? "border border-black bg-[#FBDA1D] w-full"
                  : "border border-black border-dashed w-[65%]  2xl:w-[65%]"
              } transition-all`}
            >
              <div className="flex justify-start items-center h-[80px] xl:h-[120px] p-4 space-x-2">
                <p className="font-ambit-regular text-5xl xl:text-8xl">
                  {slice.primary.card3_parttime_percentage}
                </p>
                <p className="font-ambit-regular text-xl  xl:text-3xl">
                  {slice.primary.card3_parttime_title}
                </p>
              </div>
            </div>
          </div>

          {/* Description at the Bottom */}
          <div>
            <p className="font-ambit-regular md:text-2xl xl:text-4xl xl:w-[90%] mt-4">
              {slice.primary.card3_description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Alumini;
