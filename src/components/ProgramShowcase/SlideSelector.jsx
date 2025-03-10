import React from "react";
import RichText from "../Texts/RichText";

export default function SlideSelector({
  name,
  program_name,
  short_content,
  trackIndex,
  index,
  onClick,
  className,
  isOptionB,
  date,
}) {
  return (
    <li
      onClick={onClick}
      className={`
      xl:border-t  xl:border-[#D7D7CD] xl:min-h-[10.8rem] overflow-hidden
      p-2 cursor-pointer transition-all  flex flex-col justify-center items-start
      ${trackIndex === index ? "opacity-100" : "opacity-55"} ${className}
    `}
    >
      {isOptionB && (
        <p className="font-ambit-semibold text-black uppercase">
          <span>
            {date.startMonth}
            {date.startYear}
          </span>
          &nbsp;-&nbsp;
          <span>
            {date.endMonth}
            {date.endYear}
          </span>
        </p>
      )}
      <div className="flex items-center justify-between  ">
        <RichText
          className="text-black max-w-[80]  text-4xl md:text-4xl xl:text-2xl font-ambit-regular"
          text={name}
        />
      </div>
      <RichText
        className="text-black font-ambit-regular w-[80%] 2xl:w-full text-sm 2xl:text-base "
        text={short_content}
      />
    </li>
  );
}
