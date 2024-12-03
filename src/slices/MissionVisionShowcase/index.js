'use client';
import { useState } from "react";
import SparkleContainer from "@/components/Sparkles/sparkle-container";
import RichText from "@/components/Texts/RichText";

/**
 * @typedef {import("@prismicio/client").Content.MissionVisionShowcaseSlice} MissionVisionShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MissionVisionShowcaseSlice>} MissionVisionShowcaseProps
 * @param {MissionVisionShowcaseProps}
 */
const MissionVisionShowcase = ({ slice }) => {
  
  const initialTitle = "The "+`${slice.primary.text_a}` || "Default Mission Title";
  const initialDescription = slice.primary.mission_description || "Default Mission Description";

  const [activeContent, setActiveContent] = useState({
    title: initialTitle,
    description: initialDescription,
  });

  const handleContentChange = (title, description) => {
    setActiveContent({ title, description });
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding my-12 950px:my-24"
    >
      <SparkleContainer onContentChange={handleContentChange}
        slice={slice.primary}
      />
      <div className="mt-12 space-y-2 flex flex-col 950px:items-center 950px:justify-center">
        <RichText 
          className='text-left 950px:text-center uppercase text-xl font-ambit-regular text-deep-green'
          text={activeContent.title}
        />
        <RichText 
          className='text-left 950px:text-center text-deep-green font-ambit-regular text-2xl 950px:text-4xl w-full 950px:w-[80%]'
          text={activeContent.description}
        />
      </div>
    </section>
  );
};

export default MissionVisionShowcase;
