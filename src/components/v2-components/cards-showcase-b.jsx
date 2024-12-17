import Image from "next/image";
import SliceIdentifier from "../SliceIdentifier";
import RichText from "../Texts/RichText";
import Button from "./buttons/button";
import { PrismicNextImage } from "@prismicio/next";
import PencilShading from "@/assets/shading-side.svg";

function CardShowcaseBCard({ item }) {
  return (
    <li
      className="
                    bg-[#ECF0F1] transition-all hover:bg-v2-yellow
                overflow-hidden  pt-6 group relative h-full"
      // key={i}
    >
      <div className="absolute top-0 left-0 h-full w-4">
        <div className="relative h-full w-full z-10">
          <Image src={PencilShading} alt="image" className="" fill />
        </div>
      </div>
      <div className=" pl-8 grid space-y-2">
        <div>
          <RichText
            text={item.big_text}
            className="font-ambit-regular text-deep-green text-7xl"
          />
          <RichText
            text={item.small_text}
            className="font-ambit-regular text-deep-green text-3xl"
          />
        </div>
        <div className="transition-all opacity-0 group-hover:opacity-100">
          <Button prismicLink={item.cta_link}>{item.cta_text}</Button>
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-48 mt-4 overflow-hidden relative group">
        <div
          className="
      relative w-full h-full 
      opacity-0 transform translate-y-48 
      transition-all duration-500 
      group-hover:opacity-100 group-hover:translate-y-0"
        >
          <PrismicNextImage field={item.image} className="object-cover" fill />
        </div>
      </div>
    </li>
  );
}

export default function CardsShowcaseB({ data }) {
  return (
    <div className="universal-padding space-y-20">
      <SliceIdentifier text={data.slice_identifier} />
      <ul className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-6 md:px-24">
        {data.items.map((item, i) => (
          <CardShowcaseBCard key={i} item={item} />
        ))}
      </ul>
    </div>
  );
}
