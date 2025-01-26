import Image from "next/image";
import { useHeaderDropDownContext } from "../components/v2-components/header/header";

export default function DropdownToggleMobile({ text, isActive, onClick }) {
  const targetText = text.toLowerCase();
  const {
    dropDownState: { id, isActive: globalIsActive },
  } = useHeaderDropDownContext();

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 group text-black text-xl font-inter cursor-pointer hover:opacity-95 active:scale-95 transition-all"
    >
      <span className="capitalize">{text}</span> {/* Capitalize first letter */}
      {/* Arrow Icon */}
      <span
        className={`relative h-4 w-3 transition-transform ${
          id === targetText && globalIsActive ? "rotate-180" : ""
        }`}
      >
        <Image src="/newArrow.svg" fill alt="arrow" />
      </span>
    </button>
  );
}
