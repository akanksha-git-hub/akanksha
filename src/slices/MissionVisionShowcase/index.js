"use client";
import { useEffect, useState } from "react";
import SparkleContainer from "@/components/Sparkles/sparkle-container";
import RichText from "@/components/Texts/RichText";
import gsap from "gsap";

const MissionVisionShowcase = ({ slice }) => {
  const initialTitle =
    "The " + `${slice.primary.text_a}` || "Default Mission Title";
  const initialDescription =
    slice.primary.mission_description || "Default Mission Description";

  // Initialize isActive to true for the initial content
  const [isActive, setIsActive] = useState(true);

  const handleContentChange = (title, description, component) => {
    setActiveContent({ title, description });
    // Keep isActive true after a click
    setIsActive(component);
  };

  const [activeContent, setActiveContent] = useState({
    title: initialTitle,
    description: initialDescription,
  });

  useEffect(() => {
    gsap.fromTo(
      ".description-container",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 2,
        ease: "power3.out",
      }
    );
  }, [activeContent]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding my-12 950px:my-24"
    >
      <SparkleContainer
        slice={slice.primary}
        isActive={isActive}
        onContentChange={handleContentChange}
      />
      <div className="description-container mt-12 space-y-2 flex flex-col 950px:items-center 950px:justify-center">
        <RichText
          className="text-left 950px:text-center text-deep-green font-ambit-regular text-2xl 950px:text-4xl w-full 950px:w-[80%]"
          text={activeContent.description}
        />
      </div>
    </section>
  );
};

export default MissionVisionShowcase;
