"use client";
import { PrismicNextImage } from "@prismicio/next";
import classes from "./story-circle.module.css";

export default function StoryCircle({
  index,
  onClick,
  image,
  currentIndex,
  className,
}) {
  return (
    <li
      onClick={() => onClick(index)}
      className={`${className} circle-display w-fit cursor-pointer rounded-full flex items-center justify-center transition-all active:scale-95 hover:opacity-95`}
    >
      <div className="relative rounded-full h-full w-full">
        {/* Adjusted SVG container positioning */}
        <div className="absolute -top-[17px] -left-[29px] flex items-center justify-center h-[150%] w-[150%]">
          <svg className={`${classes["circle__svg"]} h-full w-full`}>
            <circle
              cx="60"
              cy="60"
              r="48"
              className={`circle__progress circle__progress--fill ${
                currentIndex === index ? classes["active-progress"] : ""
              }`}
              style={{ strokeLinecap: "butt" }}
            ></circle>
          </svg>
        </div>

        {/* Story Image */}
        <PrismicNextImage
          field={image}
          className="cover-object rounded-full h-full w-full"
          fill
          alt=""
        />
      </div>
    </li>
  );
}
