"use client";

import { useState, useEffect } from "react";
import MobileNavItems from "./MobileNavItems";
import Image from "next/image";
import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";

export default function StandaloneHamburgerMenu({
  header,
  header_link_items = [],
  uniqueIdentifier = [],
  drop_down_items = [],
 
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prevState) => !prevState);

  // Close the menu
  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scroll when the menu is open
    } else {
      document.body.style.overflow = ""; // Re-enable scroll
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="lg:hidden relative">
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="w-10 h-10 flex flex-col items-center justify-center relative z-50"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <div className="= flex items-center justify-center fixed">
            <div className="absolute w-8 h-[2px] bg-black rotate-45 transition-transform"></div>
            <div className="absolute w-8 h-[2px] bg-black -rotate-45 transition-transform"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-[2px] bg-black transition-all"></div>
            <div className="w-8 h-[2px] bg-black transition-all"></div>
          </div>
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-[#FBDA1D] border-b border-gray-300 transition-transform ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } overflow-hidden z-40 flex flex-col`}
      >
        {/* White Bar (Contains Logo & Close Button) */}
        <div className="w-full bg-white h-[5rem] flex items-center justify-between px-6 shadow-md fixed top-0 left-0 z-50">
       
          <Link
          href="/"
          className="relative h-[5rem] w-[8rem] lg:hidden block  z-100 "
        >
          <PrismicNextImage
            field={header.logo_image}
            alt=""
            className="h-full w-full"
            fill
          />
        </Link>

          {/* Close Button (Right Side) */}
         
        </div>

        {/* Top Asset (Band) */}
        <div className="absolute top-[5rem] left-0 w-full">
          <Image
            src="/nav-top.svg" // Replace with actual asset
            alt="Top Band"
            width={500}
            height={100}
            className="w-full object-cover"
          />
        </div>

        {/* Navigation Items */}
        {isOpen && (
          <div className="flex flex-col items-center justify-center px-6 py-10 mt-16">
            <MobileNavItems
              header_link_items={header_link_items}
              uniqueIdentifier={uniqueIdentifier}
              drop_down_items={drop_down_items}
              onClose={closeMenu}
            />
          </div>
        )}

        {/* Bottom Asset (Band) */}
        <div className="absolute bottom-0 left-0 w-full">
          <Image
            src="/nav-top.svg" // Replace with actual asset
            alt="Bottom Band"
            width={500}
            height={100}
            className="w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
