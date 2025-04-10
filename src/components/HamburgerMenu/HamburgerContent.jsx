"use client";

import { useEffect, useState } from "react";
import { useSmoothScroller } from "../LenisScrollContext";
import { useHamburgerContext } from "./Hamburger";
import RichText from "../Texts/RichText";
import { PrismicNextLink } from "@prismicio/next";
import { usePathname } from "next/navigation";

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

  // ✅ Fix: Avoid `document is not defined` in SSR
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (isOpen) {
        stopScroll?.();
        document.body.style.overflow = "hidden";
      } else {
        startScroll?.();
        document.body.style.overflow = "";
      }

      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, stopScroll, startScroll]);

  return (
    <div
      data-lenis-prevent
      className={`${isOpen ? "h-screen" : "h-0"} transition-all bg-cream overflow-hidden`}
    >
      {isOpen && (
        <div className={`transition-all h-auto overflow-y-scroll`}>
          {header_link_items.length > 0 && (
            <ul className="lg:hidden flex items-end w-full flex-col space-y-4 h-auto overflow-y-scroll px-6 py-10">
              {uniqueIdentifier &&
                uniqueIdentifier.map((item, i) => {
                  const upper = item.split(" ");
                  const upperCaseValue = upper.map((word) => {
                    return word[0].toUpperCase() + word.slice(1);
                  });

                  const finalWord = upperCaseValue.join(" ");

                  return header_link_items
                    .filter((filtered_item) => {
                      return filtered_item.cta_text.toLowerCase() === item;
                    })
                    .map((_, index) => {
                      const isExpanded = openAccord === i;

                      return (
                        <li key={index} className="relative w-full">
                          <div>
                            <div
                              onClick={() => toggleAccordion(i)}
                              className="flex items-center justify-end pb-2 cursor-pointer"
                            >
                              <RichText
                                text={finalWord}
                                className="text-deep-green text-xl font-ambit-semibold relative"
                              />
                              <span
                                className={`${
                                  isExpanded
                                    ? "accordion-plus-rotate"
                                    : "accordion-plus"
                                } relative bottom-[2px]`}
                              />
                            </div>

                            <div
                              className={`z-20 bg-cream flex flex-col items-end border-b border-[#E9E8DB] transition-all overflow-hidden ${
                                isExpanded ? "active-height pb-4" : "in-active-height pb-0"
                              } pr-6`}
                            >
                              {drop_down_items
                                .filter((data) => {
                                  return data.identifier.toLowerCase() === item.toLowerCase();
                                })
                                .map((drop_down, i) => {
                                  const slug = drop_down.cta_link.slug;
                                  const isActive = slug === currentPath;

                                  const handleCloseMenu = () => {
                                    if (isActive) toggleMenu();
                                  };

                                  return (
                                    <p
                                      onClick={handleCloseMenu}
                                      key={i}
                                      className={`mx-2 text-xl rounded-[10px] transition-all active:scale-95 hover:bg-white text-right flex items-end justify-end w-fit place-self-end ${
                                        isActive && "bg-white"
                                      }`}
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

              {/* No Drop-down Items */}
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
