"use client";

import { useEffect, useState } from "react";
import { useSmoothScroller } from "../LenisScrollContext";
import { useHamburgerContext } from "./Hamburger";
import RichText from "../Texts/RichText";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";
import TextCTA from "../UI/Button/TextCTA";

export default function HamburgerContent({
  uniqueIdentifier,
  header_link_items,
  drop_down_items,
}) {
  const [openAccord, setOpenAccord] = useState(0);

  const { isOpen, toggleMenu } = useHamburgerContext();
  const { stopScroll, startScroll, lenisRef } = useSmoothScroller();

  const pathName = usePathname();
  const currentPath = pathName.split("/")[2];

  function toggleAccordion(index) {
    setOpenAccord((prevState) => (prevState === index ? null : index));
  }

  useEffect(() => {
    if (isOpen) {
      stopScroll();
      document.body.style.overflow = "hidden";
    } else {
      if (lenisRef) startScroll();
      document.body.style.overflow = "none";
    }
  }, [isOpen]);

  return (
    <div
      data-lenis-prevent
      className={`${isOpen ? "h-screen" : "h-0"} transition-all bg-cream overflow-hidden`}
    >
      {isOpen && (
        <div className={`transition-all h-auto overflow-y-scroll`}>
          {header_link_items.length > 0 && (
            <ul className="  lg:hidden flex items-end w-full flex-col space-y-4 h-auto overflow-y-scroll px-6 py-10">
              {uniqueIdentifier &&
                uniqueIdentifier.map((item, i) => {
                  const upper = item.split(" ");
                  const upperCaseValue = upper.map((item, i) => {
                    const firstLetter = item[0].toUpperCase();
                    const otherLetters = item.substring(1);
                    const finalWord = `${firstLetter}${otherLetters}`;
                    return finalWord;
                  });

                  let finalWord;

                  if (upperCaseValue.length > 1) {
                    finalWord = upperCaseValue.join(" ");
                  } else {
                    finalWord = upperCaseValue;
                  }
                  return header_link_items
                    .filter((filtered_item, _) => {
                      const lowerCaseText =
                        filtered_item.cta_text.toLowerCase();
                      const matchData = lowerCaseText === item;
                      return matchData;
                    })
                    .map((_, index) => {
                      let accordSymbolClassName = "accordion-plus";
                      let heightClassName = "in-active-height pb-0";

                      if (openAccord === i) {
                        accordSymbolClassName = "accordion-plus-rotate";
                        heightClassName = "active-height pb-4";
                      }

                      return (
                        <li key={index} className="relative w-full">
                          <div className="">
                            <div
                              onClick={() => toggleAccordion(i)}
                              className="flex items-center justify-end pb-2 cursor-pointer"
                            >
                              <RichText
                                text={finalWord}
                                className="text-deep-green text-xl font-ambit-semibold relative"
                              />
                              <span
                                className={`${accordSymbolClassName} relative bottom-[2px]`}
                              />
                            </div>
                            <div
                              className={`z-20 bg-cream flex flex-col items-end border-b border-[#E9E8DB] transition-all overflow-hidden ${heightClassName} pr-6`}
                            >
                              {drop_down_items
                                .filter((data) => {
                                  const lowerCaseValue = item.toLowerCase();
                                  const matchData =
                                    lowerCaseValue ===
                                    data.identifier.toLowerCase();
                                  return matchData;
                                })
                                .map((drop_down, i) => {
                                  const slug = drop_down.cta_link.slug;
                                  const isActive =
                                    slug.localeCompare(currentPath);

                                  function handleCloseMenu() {
                                    if (isActive) toggleMenu();
                                  }

                                  return (
                                    <p
                                      onClick={handleCloseMenu}
                                      key={i}
                                      className={`
                                                                mx-2 text-xl rounded-[10px] transition-all active:scale-95 hover:bg-white text-right flex items-end justify-end w-fit place-self-end
                                                                ${isActive === 0 && "bg-white"}
                                                            `}
                                    >
                                      <PrismicNextLink
                                        className="p-2"
                                        field={drop_down.cta_link}
                                      >
                                        <span className="text-deep-green text-base font-inter">
                                          {drop_down.cta_text}
                                        </span>
                                      </PrismicNextLink>
                                    </p>
                                  );
                                })}
                            </div>
                          </div>
                        </li>
                      );
                    });
                })}
              {/* No Drop-down */}
              <div className="w-full flex flex-col items-end space-y-4">
                {header_link_items
                  .filter((item) => !item.dropdown)
                  .map((item) => (
                    <PrismicNextLink
                      key={item.cta_text}
                      field={item.cta_link}
                      className="text-deep-green flex justify-end text-xl font-ambit-semibold relative cursor-pointer border-b border-[#E9E8DB] w-full"
                    >
                      {item.cta_text}
                    </PrismicNextLink>
                  ))}
              </div>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
