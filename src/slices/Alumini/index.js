'use client'
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
  const [activeSection, setActiveSection] = useState("fulltime");
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding  mt-96 lg:px-44 "
    >
      <h1 className="font-ambit-regular text-5xl md:text-6xl lg:text-8xl text-center ">
        {slice.primary.heading}
      </h1>
      <div className="flex flex-col xl:flex-row bg-[#ECF0F1] rounded-lg p-16 mt-8 xl:h-[600px]">
        <div className="flex-1 flex flex-col justify-between  ">
          <h1 className="font-ambit-regular text-3xl md:text-6xl lg:text-8xl w-[2ch] ">
            {slice.primary.card1_heading}
          </h1>
          <p className="font-ambit-regular md:text-3xl w-[24ch] mt-auto">
            {slice.primary.card1_descriptiion}
          </p>
        </div>
        {/* Pass Percentage  section*/}
        <div className=" flex-1  flex flex-col xl:items-end justify-start mt-4 xl:mt-0">
          <div className="bg-[#FBDA1D] w-full h-[80px] md:h-[140px] flex items-center justify-around rounded-full md:w-[60%] transition-all md:hover:h-[260px] md:group-hover:py-6  hover:flex-col group">
            {/* Text */}
            <p className=" md:text-lg lg:text-2xl font-ambit-regular md:group-hover:translate-y-[-1px] md:group-hover:text-3xl md:group-hover:mb-2">
              {slice.primary.year_1}
            </p>

            {/* Percentage and Image */}
            <div className="relative flex items-center justify-center space-x-3">
              <div className="flex items-center">
                <p className="text-xl lg:text-2xl font-ambit-regular md:group-hover:text-7xl  md:group-hover:font-ambit-semibold   md:group-hover:-mt-2 inline-flex">
                  {slice.primary.year_1_percentage}
                </p>

                <Image
                  src="/hover-3.png"
                  alt="Hovered Image"
                  width={16}
                  height={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity  w-3 h-6 md:w-4 md:h-12 ml-2 md:-mt-8 md:ml-2"
                />
              </div>
            </div>
          </div>

          {/* Yellow Section */}
          <div className="bg-[#F6AC27] w-full h-[80px] md:h-[140px] flex items-center justify-around rounded-full md:w-[60%] transition-all hover:h-[260px] hover:py-6 hover:flex-col group">
            {/* Text */}
            <p className="text-xl lg:text-3xl font-ambit-regular group-hover:translate-y-[-1px] group-hover:text-3xl group-hover:mb-2">
              {slice.primary.year_2}
            </p>

            {/* Percentage and Image */}
            <div className="relative flex items-center justify-center space-x-3">
              <div className="flex items-center">
                <p className="text-xl lg:text-3xl font-ambit-regular group-hover:text-5xl md:group-hover:text-8xl group-hover:font-ambit-semibold group-hover:-mt-8   md:group-hover:-mt-2 inline-flex">
                  {slice.primary.year_2_percentage}
                </p>

                <Image
                  src="/hover-3.png"
                  alt="Hovered Image"
                  width={16}
                  height={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity  -mt-8 ml-2"
                />
              </div>
            </div>
          </div>

          {/* Blue Section */}
          <div className="bg-[#58BCD4] w-full h-[80px] md:h-[140px] flex items-center justify-around rounded-full md:w-[60%] transition-all hover:h-[260px] hover:py-6 hover:flex-col group ">
            {/* Text */}
            <p className="text-xl lg:text-3xl font-ambit-regular group-hover:translate-y-[-1px] group-hover:text-3xl group-hover:mb-2">
              {slice.primary.year_3}
            </p>

            {/* Percentage and Image */}
            <div className="relative flex items-center justify-center space-x-3">
              <div className="flex items-center">
                <p className="text-xl lg:text-3xl font-ambit-regular group-hover:text-5xl md:group-hover:text-8xl md:group-hover:-mt-2 group-hover:-mt-8  inline-flex">
                  {slice.primary.year_3_percentage}
                </p>

                <Image
                  src="/hover-3.png"
                  alt=""
                  width={16}
                  height={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 -mt-8 ml-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

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

          {/* Image Section */}
          <div className="flex flex-wrap justify-around gap-4 mt-4">
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
          </div>
        </div>

        {/* Percentage Section */}
        <div className="flex-1 w-full h-[300px] lg:h-[600px] bg-white  flex flex-col justify-between p-4">
          <div>
            {/* Fulltime Percentage Section */}
            <div
              className={`flex flex-col mt-4 ${
                activeSection === "fulltime"
                  ? "hover:border-solid bg-[#FBDA1D] w-full"
                  : "border border-black border-dashed w-[80%] xl:w-[75%]"
              } transition-all duration-300`}
              onMouseEnter={() => setActiveSection("fulltime")}
            >
              <div className="flex justify-start items-center h-[80px] xl:h-[120px] p-4 space-x-2">
                <p className="font-ambit-regular text-5xl xl:text-8xl">
                  {slice.primary.card3_fulltime_percentage}
                </p>
                <p className="font-ambit-regular text-xl xl:text-3xl">
                  {slice.primary.card3_fulltime_title}
                </p>
              </div>
            </div>

            {/* Parttime Percentage Section */}
            <div
              className={`flex flex-col mt-4 ${
                activeSection === "parttime"
                  ? "hover:border-solid bg-[#FBDA1D] w-full"
                  : "border border-black border-dashed w-[80%] xl:w-[75%]"
              } transition-all duration-300`}
              onMouseEnter={() => setActiveSection("parttime")}
            >
              <div className="flex justify-start items-center h-[80px] xl:h-[120px] p-4 space-x-2">
                <p className="font-ambit-regular text-5xl xl:text-8xl">
                  {slice.primary.card3_parttime_percentage}
                </p>
                <p className="font-ambit-regular text-xl xl:text-3xl">
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
