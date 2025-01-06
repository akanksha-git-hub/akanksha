"use client";
import RichText from "@/components/Texts/RichText";
import SliceIdentifier from "@/components/SliceIdentifier";
import StoryCircle from "@/components/UI/Story/StoryCircle";
import { PrismicNextImage } from "@prismicio/next";
import { useState } from "react";
import Button from "@/components/v2-components/buttons/button";

/**
 * @typedef {import("@prismicio/client").Content.InitiativeShowcaseSlice} InitiativeShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<InitiativeShowcaseSlice>} InitiativeShowcaseProps
 * @param {InitiativeShowcaseProps}
 */
const InitiativeShowcase = ({ slice }) => {
  const [trackIndex, setTrackIndex] = useState({
    index: 0,
    title: slice.primary.initiative_content_a_title,
    summary: slice.primary.initiative_content_a_short_summary,
    image: slice.primary.initiative_content_a_image_b,
    description: slice.primary.initiative_content_a_description,
    bgColor: "bg-bright-yellow", // Default background color
  });

  const handleTrackIndex = (i) => {
    setTrackIndex((prevState) => {
      let title, summary, image, description, bgColor;

      switch (i) {
        case 0:
          title = slice.primary.initiative_content_a_title;
          summary = slice.primary.initiative_content_a_short_summary;
          image = slice.primary.initiative_content_a_image_b;
          description = slice.primary.initiative_content_a_description;
          bgColor = "bg-bright-yellow";
          break;
        case 1:
          title = slice.primary.initiative_content_b_title;
          summary = slice.primary.initiative_content_b_short_summary;
          image = slice.primary.initiative_content_b_image_b;
          description = slice.primary.initiative_content_b_description;
          bgColor = "bg-[#55BBD3]";
          break;
        case 2:
          title = slice.primary.initiative_content_c_title;
          summary = slice.primary.initiative_content_c_short_summary;
          image = slice.primary.initiative_content_c_image_b;
          description = slice.primary.initiative_content_c_description;
          bgColor = "bg-[#37473C]";
          break;
        default:
          break;
      }

      return {
        ...prevState,
        index: i,
        title,
        summary,
        image,
        description,
        bgColor,
      };
    });
  };

  let imageClassName =
    "relative h-[7rem] w-[7rem] sm:h-[10rem] sm:w-[10rem] lg:h-[16rem] lg:w-[16rem] 2xl:h-[20rem] 2xl:w-[20rem] 3xl:h-[25.3rem] 3xl:w-[25.3rem]";

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding"
    >
      <SliceIdentifier text={slice.primary.slice_identifier} />
      <div className="mt-12 flex flex-col xl:flex-row items-center justify-between">
        {/* Left Content */}
        <ul className="w-full gap-2 xl:gap-0 xl:w-[45%] flex flex-wrap items-center justify-center xl:flex-col xl:justify-normal">
          <StoryCircle
            currentIndex={trackIndex.index}
            index={0}
            height={500}
            width={500}
            className={`${imageClassName}`}
            onClick={() => handleTrackIndex(0)}
            image={slice.primary.initiative_content_a_image_a}
          />
          <ul className="flex gap-2">
            <StoryCircle
              currentIndex={trackIndex.index}
              index={1}
              height={500}
              width={500}
              className={`${imageClassName} xl:bottom-6`}
              onClick={() => handleTrackIndex(1)}
              image={slice.primary.initiative_content_b_image_a}
            />
            <StoryCircle
              currentIndex={trackIndex.index}
              index={2}
              height={500}
              width={500}
              className={`${imageClassName} xl:bottom-6`}
              onClick={() => handleTrackIndex(2)}
              image={slice.primary.initiative_content_c_image_a}
            />
          </ul>
        </ul>

        {/* Right Content */}
        <div className={`w-full mt-12 xl:mt-0 xl:w-2/4 rounded-sm p-6 lg:p-12 ${trackIndex.bgColor}`}>
          <RichText
            className={`font-ambit-regular text-4xl lg:text-5xl mb-4 ${
              trackIndex.index === 2 ? "text-white" : "text-deep-green"
            }`}
            text={trackIndex.title}
          />
          <RichText
            className={`font-ambit-regular text-3xl lg:text-5xl w-[80%] 3xl:w-[60%] ${
              trackIndex.index === 1 || trackIndex.index === 2  ? "text-bright-yellow" : "text-[#767632]"
            }`}
            text={trackIndex.summary}
          />
          <div className="h-[14rem] md:h-[18rem] lg:h-[24rem] xl:h-[16rem] 2xl:h-[20rem] 3xl:h-[28rem] w-full rounded-lg mt-6 sm:mt-12">
            <PrismicNextImage
              className="h-full w-full object-cover rounded-lg"
              field={trackIndex.image}
              alt=""
            />
          </div>
          <RichText
            className={`mt-6 sm:mt-12 font-inter text-lg sm:text-xl lg:text-2xl leading-[26px] sm:leading-[30px] w-full lg:w-[90%] ${
              trackIndex.index === 2 ? "text-white" : "text-deep-green"
            }`}
            text={trackIndex.description}
          />
          <div className="flex gap-2 mt-12 sm:mt-20 2xl:mt-32">
            <Button>Know More</Button>
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default InitiativeShowcase;
