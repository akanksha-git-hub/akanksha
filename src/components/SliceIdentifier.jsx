import Image from "next/image";
import RichText from "./Texts/RichText";
import { PrismicImage } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export default function SliceIdentifier({
  text,
  className,
  hasSpider,
  isVisible,
}) {
  let Text = (
    <>
      <span className="h-[12px] w-[12px] rounded-full bg-deep-green"></span>
      <span>{text}</span>
    </>
  );

  return (
    <div className="relative">
      <div className={`border-b pb-3 border-deep-green ${className} `}>
        <RichText
          className="text-deep-green flex gap-1 font-inter font-bold items-center uppercase text-xl"
          text={Text}
        />
      </div>
      {isVisible && (
        <PrismicNextImage
          field={hasSpider}
          width={150}
          height={150}
          className="hidden xl:block absolute right-4 top-10 z-[-1]"
        />
      )}
    </div>
  );
}
