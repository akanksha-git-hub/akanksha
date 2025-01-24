"use client";
import { useHamburgerContext } from "./Hamburger";

export default function HamburgerIcon() {
  const { toggleMenu, isOpen } = useHamburgerContext();

  return (
    <div
      onClick={toggleMenu}
      className="w-14 h-full flex flex-col items-center justify-center cursor-pointer relative lg:hidden"
    >
      <div
        className={`hb-icon ${isOpen ? "hb-icon-active" : "hb-icon-inactive"}`}
      />
      <div
        className={`hb-icon ${isOpen ? "hb-icon-active" : "hb-icon-inactive"}`}
      />
    </div>
  );
}
