import React from "react";
import RichText from "../Texts/RichText";
import TextCTA from "../UI/Button/TextCTA";

export default function QuoteComponent({ quote, quote_by, storyLink }) {
  return (
    <div className="relative  rounded-lg rounded-tr-lg rounded-br-lg md:rounded-bl-none md:rounded-tl-none bg-[#58BCD4] p-8 w-full xl:w-[56%] flex flex-col items-start justify-between">
      <div className="absolute top-0 right-0 w-full h-[1.25rem]">
        <div className="relative h-full w-full">
          <Image src="/quote-side-up.png" alt="Top Shading" fill />
        </div>
      </div>
      <div className="mt-14">
        <RichText
          className="text-black text-2xl xl:text-3xl 2xl:text-4xl font-ambit-regular leading-[30px] xl:leading-[48px]"
          text={quote}
        />
        <RichText
          className="text-black text-lg xl:text-xl font-ambit-regular mt-6"
          text={quote_by}
        />
      </div>
      <div className="flex items-center justify-between w-full !mb-12">
        <TextCTA
          hasArrow
          className="font-inter text-sm xl:text-base"
          strokeColor="#000000"
          text="Read story"
          bgColor="bg-black"
          textColor="text-black"
        />
        <TextCTA
          hasUnderLine
          className="font-inter text-sm xl:text-base "
          bgColor="bg-black"
          text="Donate"
          textColor="text-black"
        />
        <div className="absolute  bottom-0 left-0  w-full h-[1.25rem]">
          <div className="relative h-full w-full">
            <Image src="/quote-side-down.png" alt="Top Shading" fill />
          </div>
        </div>
      </div>
    </div>
  );
}
