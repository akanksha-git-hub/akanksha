"use client";

import { createContext, useContext, useState } from "react";
import HamburgerIcon from "./HamburgerIcon";
import HamburgerContent from "./HamburgerContent";

const HamburgerContext = createContext();

export function useHamburgerContext() {
  const ctx = useContext(HamburgerContext);

  if (!ctx)
    throw new Error("Hamburger context must be used inside <Hamburger>");

  return ctx;
}

export default function Hamburger({ children, className }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((prevState) => !prevState);
  }

  const ctxValues = {
    toggleMenu,
    isOpen,
  };

  return (
    <HamburgerContext.Provider value={ctxValues}>
      <div className={className}>{children}</div>
    </HamburgerContext.Provider>
  );
}

Hamburger.Icon = HamburgerIcon;
Hamburger.Content = HamburgerContent;
