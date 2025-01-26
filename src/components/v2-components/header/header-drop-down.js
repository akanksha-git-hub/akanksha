"use client";

import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { useHeaderDropDownContext } from "./header";
import Image from "next/image";
import PencilShading from "@/assets/pencil-shading.svg";
import Arrow from "@/assets/yellow-arrow.svg";
import { useState } from "react";

export default function HeaderDropDown({ drop_down_items, uniqueIdentifier }) {
  const {
    dropDownState: { id, isActive },
    setDropdownId,
  } = useHeaderDropDownContext();

  // State for small screen accordion
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (item) => {
    setActiveAccordion((prev) => (prev === item ? null : item));
  };

  return (
    <>
      {/* Large screens dropdown */}
      {uniqueIdentifier.map((item) => (
        <div
          className={`${
            id === item && isActive ? "active-height" : "in-active-height"
          } absolute top-full left-0 w-full z-50 bg-white overflow-hidden hidden lg:block`}
          key={item}
        >
          <div className="p-8 w-full h-full border-t border-b border-[#B3B3B3]">
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-2">
              {drop_down_items
                .filter((data) => {
                  const matchData =
                    item.toLowerCase() === data.identifier.toLowerCase();
                  return matchData;
                })
                .map((drop_down, i) => {
                  return (
                    <li className="group relative" key={i}>
                      <div className="transition-all rounded flex flex-col relative z-[1]">
                        <PrismicNextLink
                          field={drop_down.cta_link}
                          className="h-full w-full"
                          onClick={() => setDropdownId(null)}
                        >
                          <div className="w-full relative right-0 bottom-0 min-h-[260px] rounded bg-[#D9D9D9] group-hover:right-[4px] group-hover:bottom-1 transition-all">
                            <PrismicNextImage
                              field={drop_down.image}
                              alt=""
                              className="object-cover w-full h-full rounded"
                              fill // Ensure it covers the container completely
                            />
                          </div>
                          <p className="mt-2 flex flex-col">
                            <span className="text-black group-hover:text-v2-orange text-base font-inter">
                              {drop_down.cta_text}
                            </span>
                            <span className="h-4 w-6 relative opacity-0 group-hover:opacity-100 transition-all">
                              <Image alt="arrow" src={Arrow} fill />
                            </span>
                          </p>
                        </PrismicNextLink>
                      </div>
                      <div className="w-full h-[86%] absolute top-0 left-0 overflow-hidden opacity-0 group-hover:opacity-100 z-[0] custom-bezier pointer-events-none">
                        <div className="h-full w-full relative">
                          <Image
                            alt="pencil-shading"
                            className="object-cover border"
                            src={PencilShading}
                            fill
                            quality={100}
                          />
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      ))}

      {/* Small screens accordion */}
      {/* <div className="lg:hidden">
        {uniqueIdentifier.map((item) => (
          <div key={item} className="border-b border-[#B3B3B3]">
            <button
              className="w-full text-left px-4 py-2 text-black font-inter"
              onClick={() => toggleAccordion(item)}
            >
              {item}
            </button>
            {activeAccordion === item && (
              <div className="p-4 bg-white">
                <ul className="space-y-4">
                  {drop_down_items
                    .filter(
                      (data) =>
                        data.identifier.toLowerCase() === item.toLowerCase()
                    )
                    .map((drop_down, i) => (
                      <li key={i}>
                        <PrismicNextLink
                          field={drop_down.cta_link}
                          className="block text-v2-orange hover:underline"
                        >
                          {drop_down.cta_text}
                        </PrismicNextLink>
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div> */}
    </>
  );
}
