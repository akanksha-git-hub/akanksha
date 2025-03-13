import { useState, useEffect } from "react";
import Image from "next/image";
import SliceIdentifier from "../SliceIdentifier";
import RichText from "../Texts/RichText";
import Button from "./buttons/button";
import { PrismicNextImage } from "@prismicio/next";
import PencilShading from "@/assets/shading-side.svg";

// Mobile-like UI (always highlighted, no hover logic)
function CardShowcaseBCardMobile({ item }) {
  return (
    <li className="bg-v2-yellow pt-6 relative ">
      <div className="flex flex-row justify-between items-center px-8 ">
        <div className=" grid space-y-2">
          <div>
            <RichText
              text={item.big_text}
              className="font-ambit-regular text-black text-5xl"
            />
            <RichText
              text={item.small_text}
              className="font-ambit-regular text-black text-2xl"
            />
          </div>
        </div>
        <div>
          <Button prismicLink={item.cta_link}>{item.cta_text}</Button>
        </div>
      </div>
      <div className="flex justify-center items-center md:w-[65%] w-full h-64 md:h-80 mt-4 overflow-hidden relative  mx-auto">
        <PrismicNextImage
          field={item.image}
          className="absolute inset-0 m-auto object-cover"
          fill
        />
      </div>
    </li>
  );
}

// Desktop UI (hover highlight)
function CardShowcaseBCardDesktop({ item, isHighlighted, onHover }) {
  return (
    <li
      className={`bg-[#ECF0F1] transition-all ${
        isHighlighted ? "bg-v2-yellow" : ""
      } pt-6 group relative h-full`}
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      {/* Example: orange gradient overlay when highlighted */}

      <div className="absolute top-0 left-0 h-full w-5 z-10">
        <Image src={PencilShading} alt="image" fill />
      </div>
      <div className="pl-8 grid space-y-2">
        <div>
          <RichText
            text={item.big_text}
            className="font-ambit-regular text-black text-7xl"
          />
          <RichText
            text={item.small_text}
            className="font-ambit-regular text-black text-3xl"
          />
        </div>
        <div
          className={`transition-all ${
            isHighlighted ? "opacity-100" : "opacity-0"
          } group-hover:opacity-100`}
        >
          <Button prismicLink={item.cta_link}>{item.cta_text}</Button>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-80 mt-4 overflow-hidden relative group">
        <div
          className={`relative w-full h-full transform transition-all duration-500 ${
            isHighlighted
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-48"
          } group-hover:opacity-100 group-hover:translate-y-0`}
        >
          <PrismicNextImage field={item.image} className="object-cover" fill />
        </div>
      </div>
    </li>
  );
}

export default function CardsShowcaseB({ data }) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // "allowHover" = true if device truly supports hover (mouse); false if touch-only.
  const [allowHover, setAllowHover] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(hover: hover)");
      setAllowHover(mediaQuery.matches);

      const handleChange = (e) => {
        setAllowHover(e.matches);
      };
      mediaQuery.addEventListener("change", handleChange);

      return () => {
        mediaQuery.removeEventListener("change", handleChange);
      };
    }
  }, []);

  // If the device does NOT support hover (iPad, mobile, etc.):
  // treat it as the "mobile" experience with no hover effect.
  if (!allowHover) {
    return (
      <div className="universal-padding space-y-20">
        <SliceIdentifier text={data.slice_identifier} />
        <ul className="grid grid-cols-1 gap-6 h-auto">
          {data.items.map((item, i) => (
            <CardShowcaseBCardMobile key={i} item={item} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="universal-padding space-y-20">
      <SliceIdentifier text={data.slice_identifier} />
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 md:px-24 h-auto">
        {data.items.map((item, i) => (
          <CardShowcaseBCardDesktop
            key={i}
            item={item}
            isHighlighted={highlightedIndex === i}
            onHover={() => setHighlightedIndex(i)}
          />
        ))}
      </ul>
    </div>
  );
}
