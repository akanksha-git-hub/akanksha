'use client'
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
      className="universal-padding  mt-96 "
    >
      { console.log(slice.primary.universities)}
      <h1 className="font-ambit-regular text-5xl md:text-6xl lg:text-8xl text-center ">
        {slice.primary.heading}
      </h1>
      <div className="flex flex-col lg:flex-row bg-[#ECF0F1] rounded-lg p-8 mt-8 xl:max-h-[600px] w-full">

        <div className="w-[100%] lg:w-[50%] flex flex-col">
          <h1 className="font-ambit-regular text-[#37473C] text-3xl md:text-6xl lg:text-7xl xl:text-8xl w-[2ch] ">
            {slice.primary.card1_heading}
          </h1>
          <p className="font-ambit-regular text-lg  md:text-3xl w-[24ch] mt-auto">
            {slice.primary.card1_descriptiion}
          </p>
        </div>
        {/* Pass Percentage  section*/}
         <div className="w-[100%] lg:ml-auto lg:w-[35%] flex flex-col justify-center lg:items-end mt-8 lg:mt-0">
  {/* FBDA1D Section */}
  <div
    className={`bg-[#FBDA1D] flex items-center w-full justify-around rounded-full transition-all duration-150  ${
      hoveredSection === "year_1" ? "flex-col" : ""
    } group lg:p-10 p-6`}
    onMouseEnter={() => setHoveredSection("year_1")}
  >
    <p className="text-xl lg:text-3xl font-ambit-regular">
      {slice.primary.year_1}
    </p>
    <div className="pl-4 lg:pl-8 relative flex items-center justify-center space-x-3">
      <div className="flex items-center">
        <p
          className={` duration-150  ${
            hoveredSection === "year_1"
              ? "text-8xl font-ambit-semibold -mt-1"
              : "text-2xl lg:text-3xl"
          } font-ambit-regular`}
        >
          {slice.primary.year_1_percentage}
        </p>
        <Image
          src="/hover-3.png"
          alt="Hovered Image"
          width={16}
          height={16}
          className={`transition-opacity duration-150 linear w-3 h-6 md:w-4 md:h-12 ml-2 ${
            hoveredSection === "year_1" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  </div>

  {/* Orange Section */}
  <div
    className={`bg-[#F6AC27] flex items-center w-full justify-around rounded-full transition-all duration-150  ${
      hoveredSection === "year_2" ? "flex-col" : ""
    } group lg:p-10 p-6`}
    onMouseEnter={() => setHoveredSection("year_2")}
  >
    <p className="text-xl lg:text-3xl font-ambit-regular">
      {slice.primary.year_2}
    </p>
    <div className="pl-4 lg:pl-16 relative flex items-center justify-center space-x-3">
      <div className="flex items-center">
        <p
          className={`transition-all duration-150  ${
            hoveredSection === "year_2"
              ? "text-8xl font-ambit-semibold -mt-2"
              : "text-2xl lg:text-3xl"
          } font-ambit-regular`}
        >
          {slice.primary.year_2_percentage}
        </p>
        <Image
          src="/hover-3.png"
          alt="Hovered Image"
          width={16}
          height={16}
          className={`transition-opacity duration-150 linear w-3 h-6 md:w-4 md:h-12 ml-2 ${
            hoveredSection === "year_2" ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </div>
  </div>

  {/* Blue Section */}
  <div
    className={`bg-[#58BCD4] flex items-center w-full justify-around rounded-full transition-all duration-150  ${
      hoveredSection === "year_3" ? "flex-col" : ""
    } group lg:p-10 p-6`}
    onMouseEnter={() => setHoveredSection("year_3")}
  >
    <p className="text-xl lg:text-3xl font-ambit-regular">
      {slice.primary.year_3}
    </p>
    <div className="pl-4 lg:pl-16 relative flex items-center justify-center space-x-3">
      <div className="flex items-center">
        <p
          className={`transition-all  duration-150  ${
            hoveredSection === "year_3"
              ? "text-8xl font-ambit-semibold -mt-2 "
              : "text-2xl lg:text-3xl"
          } font-ambit-regular`}
        >
          {slice.primary.year_3_percentage}
        </p>
        <Image
          src="/hover-3.png"
          alt="Hovered Image"
          width={16}
          height={16}
          className={`transition-opacity duration-150 linear w-3 h-6 md:w-4 md:h-12 ml-2 ${
            hoveredSection === "year_3" ? "opacity-100" : "opacity-0"
          }`}
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
          <div className="flex flex-wrap justify-around gap-4 mt-4">
           <MarqueeNew 
                    data={data}
                    
                  />
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
        <p className="font-ambit-regular text-xl xl:text-3xl">
          {slice.primary.card3_fulltime_title}
        </p>
      </div>
    </div>

    {/* Parttime Percentage Section */}
    <div
      className={`flex flex-col mt-4 ${
        activeSection === "parttime"
          ? "border border-black bg-[#FBDA1D] w-full"
          : "border border-black border-dashed w-[80%] xl:w-[75%]"
      } transition-all`}
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
