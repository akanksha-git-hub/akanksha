"use client";

import { useState, useEffect } from "react";
import MobileNavItems from "./MobileNavItems";
import Image from "next/image";

export default function StandaloneHamburgerMenu({
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

    // Clean up
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className=" lg:hidden relative">
      {/* Hamburger Icon */}
      <button
        onClick={toggleMenu}
        className="w-10 h-10 flex flex-col items-center justify-center relative z-50"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <div className="= flex items-center justify-center  fixed">
            <div className="absolute w-8 h-[2px] bg-black rotate-45 transition-transform "></div>
            <div className="absolute w-8 h-[2px] bg-black -rotate-45 transition-transform"></div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            {/* Two horizontal lines */}
            <div className="w-8 h-[2px] bg-black transition-all"></div>
            <div className="w-8 h-[2px] bg-black transition-all"></div>
          </div>
        )}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-[#FBDA1D] border-b border-gray-300 transition-transform ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } overflow-hidden z-40`}
      >
        {isOpen && (
          <div className="flex flex-col items-center justify-center px-6 py-10 ">
            {/* Top Asset */}
            {/* <div className="  w-full">
              <Image
                src="/nav-top.svg"
                alt="Top Asset"
                layout="fill"
                objectFit="contain"
              />
            </div> */}
            <MobileNavItems
              header_link_items={header_link_items}
              uniqueIdentifier={uniqueIdentifier}
              drop_down_items={drop_down_items}
              onClose={closeMenu} // Pass the closeMenu function here
            />
          </div>
        )}
      </div>
    </div>
  );
}
