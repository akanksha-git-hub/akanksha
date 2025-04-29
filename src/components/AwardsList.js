import { PrismicRichText } from "@prismicio/react";
import { PrismicNextLink } from "@prismicio/next";
import Image from "next/image";

export default function AwardsList({ awards = [] }) {
  if (!awards || awards.length === 0) return null;

  return (
    <div className="flex flex-col w-full max-w-7xl mx-auto gap-y-2 mt-8">
      {awards.map((item, index) => (
        <PrismicNextLink
          key={index}
          field={item.award_link}
          className="group border border-black p-8 transition-all hover:bg-transparent md:hover:bg-[#FBDA1D] relative overflow-hidden"
        >
          <div className="text-left md:text-2xl text-black font-ambit-semibold z-10 relative">
            <PrismicRichText field={item.award_name} />
          </div>

          {/* SVG shading only visible on hover (desktop only) */}
          <div className="absolute bottom-0 left-0 w-full opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <Image
              src="/awards_shading.svg"
              alt="Shading"
              width={500}
              height={100}
              className="w-full h-[12px] object-fill"
            />
          </div>
        </PrismicNextLink>
      ))}
    </div>
  );
}
