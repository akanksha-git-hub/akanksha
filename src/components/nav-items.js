"use client";

import { useState } from "react";
import TextCTA from "./UI/Button/TextCTA";
import NavItemDropDownText from "./v2-components/header/nav-item-dropdown-text";
import { useHeaderDropDownContext } from "./v2-components/header/header";
import { PrismicNextLink } from "@prismicio/next";

export default function NavItems({
  header_link_items = [],
  uniqueIdentifier = [],
  drop_down_items = [],
}) {
  const { setDropdownId } = useHeaderDropDownContext();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const capitalizeWords = (text) =>
    text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  const toggleDropdown = (item) => {
    setActiveDropdown((prev) => (prev === item ? null : item));
  };

  // Separate dropdown and non-dropdown items
  const dropdownItems = header_link_items.filter((item) => item.dropdown);
  const nonDropdownItems = header_link_items.filter((item) => !item.dropdown);

  // Split dropdown items into two halves
  const leftDropdownItems = dropdownItems.slice(
    0,
    Math.ceil(dropdownItems.length / 2)
  );
  const rightDropdownItems = dropdownItems.slice(
    Math.ceil(dropdownItems.length / 2)
  );

  return (
    <>
      {header_link_items.length > 0 ? (
        <ul className="hidden lg:flex items-start w-full justify-between">
          {/* Left Section: First half of dropdown items */}
          <div className="flex items-center gap-8">
            {leftDropdownItems.map((item) => (
              <li key={item.cta_text} className="relative group">
                <NavItemDropDownText
                  text={capitalizeWords(item.cta_text)}
                  className="text-deep-green text-lg font-inter cursor-pointer hover:opacity-75"
                  onClick={() => toggleDropdown(item.cta_text)}
                />
                {/* Dropdown Menu */}
                {activeDropdown === item.cta_text && (
                  <div className="absolute top-full mt-2 bg-white border rounded-lg border-gray-300 shadow-lg z-50 w-auto min-w-[200px]">
                    <ul className="py-2">
                      {drop_down_items
                        .filter(
                          (dropDown) =>
                            dropDown.identifier.toLowerCase() ===
                            item.cta_text.toLowerCase()
                        )
                        .map((dropDownItem, index) => (
                          <li key={index} className="w-full">
                            <PrismicNextLink
                              field={dropDownItem.cta_link}
                              className="block w-full px-4 py-2 text-lg text-black text-right hover:bg-gray-100 transition"
                              onClick={() => setDropdownId(null)}
                            >
                              {dropDownItem.cta_text}
                            </PrismicNextLink>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </div>

          {/* Middle Section: Non-dropdown items */}
          <div className="flex items-center gap-8 mx-8 justify-center">
            {nonDropdownItems.map((item) => (
              <TextCTA
                className="text-deep-green text-lg font-inter hover:opacity-55 transition-all active:scale-95"
                key={item.cta_text}
                text={item.cta_text}
                link={item.cta_link}
              />
            ))}
          </div>

          {/* Right Section: Second half of dropdown items */}
          <div className="flex items-center gap-8">
            {rightDropdownItems.map((item) => (
              <li key={item.cta_text} className="relative group">
                <NavItemDropDownText
                  text={capitalizeWords(item.cta_text)}
                  className="text-deep-green text-lg font-inter cursor-pointer hover:opacity-75"
                  onClick={() => toggleDropdown(item.cta_text)}
                />
                {/* Dropdown Menu */}
                {activeDropdown === item.cta_text && (
                  <div className="absolute top-full rounded-lg mt-2 bg-white border border-gray-300 shadow-lg z-50 w-auto min-w-[200px]">
                    <ul className="py-2">
                      {drop_down_items
                        .filter(
                          (dropDown) =>
                            dropDown.identifier.toLowerCase() ===
                            item.cta_text.toLowerCase()
                        )
                        .map((dropDownItem, index) => (
                          <li key={index} className="w-full">
                            <PrismicNextLink
                              field={dropDownItem.cta_link}
                              className="block w-full px-4 py-2 text-lg text-black text-right hover:bg-gray-100 transition"
                              onClick={() => setDropdownId(null)}
                            >
                              {dropDownItem.cta_text}
                            </PrismicNextLink>
                          </li>
                        ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </div>
        </ul>
      ) : (
        <p>No navigation items available.</p>
      )}
    </>
  );
}
