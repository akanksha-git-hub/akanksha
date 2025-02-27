import { useState } from "react";
import Image from "next/image";
import SliceIdentifier from "../SliceIdentifier";
import RichText from "../Texts/RichText";
import Button from "./buttons/button";
import { PrismicNextImage } from "@prismicio/next";
import PencilShading from "@/assets/shading-side.svg";

function CardShowcaseBCard({ item, isHighlighted, onHover }) {
  return (
    <li
      className={`bg-[#ECF0F1] transition-all ${
        isHighlighted ? "bg-v2-yellow" : ""
      } pt-6 group relative h-full hidden md:block`} // Hidden on small screens
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      {isHighlighted && (
        <div className="absolute -z-10 top-1/3 h-full w-full orange-gradient"></div>
      )}

      <div className="absolute top-0 left-0 h-full w-5">
        <div className="relative h-full w-full z-10">
          <Image src={PencilShading} alt="image" className="" fill />
        </div>
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

function CardShowcaseBCardMobile({ item }) {
  return (
    <li className="bg-[#ECF0F1] pt-6 relative block md:hidden"> {/* Only visible on small screens */}
      <div className="pl-8 grid space-y-2">
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
        <div className="opacity-100">
          <Button prismicLink={item.cta_link}>{item.cta_text}</Button>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-60 mt-4 overflow-hidden relative">
        <div className="relative w-full h-full opacity-100 translate-y-0">
          <PrismicNextImage field={item.image} className="object-cover" fill />
        </div>
      </div>
    </li>
  );
}

export default function CardsShowcaseB({ data }) {
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  return (
    <div className="universal-padding space-y-20">
      <SliceIdentifier text={data.slice_identifier} />

      {/* Desktop Version */}
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 md:px-24 h-auto hidden md:grid">
        {data.items.map((item, i) => (
          <CardShowcaseBCard
            key={i}
            item={item}
            isHighlighted={highlightedIndex === i}
            onHover={() => setHighlightedIndex(i)}
          />
        ))}
      </ul>

      {/* Mobile Version */}
      <ul className="grid grid-cols-1 gap-6 md:px-24 h-auto block md:hidden">
        {data.items.map((item, i) => (
          <CardShowcaseBCardMobile key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}
