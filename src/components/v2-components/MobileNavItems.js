import { useState, useRef } from "react";
import TextCTA from "../UI/Button/TextCTA";
import DropdownToggleMobile from "../DropdownToggleMobile";
import { useHeaderDropDownContext } from "../v2-components/header/header";

export default function MobileNavItems({
  header_link_items = [],
  uniqueIdentifier = [],
  drop_down_items = [],
  onClose,
}) {
  const { setDropdownId } = useHeaderDropDownContext();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownToggle = (id) => {
    const newActive = activeDropdown === id ? null : id; // Toggle active dropdown
    setActiveDropdown(newActive);
    setDropdownId(newActive); // Update dropdown context for the arrow rotation
  };

  // Split dropdown identifiers into two halves
  const midpoint = Math.ceil(uniqueIdentifier.length / 2);
  const firstHalf = uniqueIdentifier.slice(0, midpoint);
  const secondHalf = uniqueIdentifier.slice(midpoint);

  const renderDropdownItems = (identifiers) => {
    return identifiers.map((identifier, index) => {
      const isActive = activeDropdown === identifier;
      const dropdownContentRef = useRef(null);

      return (
        <li
          key={index}
          className="w-full flex flex-col items-end justify-center"
        >
          {/* Dropdown Toggle */}
          <DropdownToggleMobile
            text={identifier}
            isActive={isActive}
            onClick={() => handleDropdownToggle(identifier)}
          />

          {/* Dropdown Content */}
          <div
            ref={dropdownContentRef}
            className={`overflow-hidden transition-all duration-300 ease-in-out w-full`}
            style={{
              maxHeight: isActive
                ? `${dropdownContentRef.current?.scrollHeight}px`
                : "0px",
              opacity: isActive ? 1 : 0,
            }}
          >
            <ul className="ml-4 mt-2 space-y-2 text-right border-r-2 border-gray-300 pr-4">
              {/* Add vertical line on the right side */}
              {drop_down_items
                .filter((item) => item.identifier.toLowerCase() === identifier)
                .map((dropdown, subIndex) => (
                  <li
                    key={subIndex}
                    className="text-right w-full flex flex-col items-end"
                  >
                    <TextCTA
                      className="text-deep-green text-lg font-light hover:opacity-75 transition-all"
                      text={dropdown.cta_text}
                      link={dropdown.cta_link}
                      onClick={onClose} // Close menu when dropdown item is clicked
                    />
                  </li>
                ))}
            </ul>
          </div>
        </li>
      );
    });
  };

  return (
    <ul className="flex flex-col items-end justify-center w-full h-full space-y-6 mt-10">
      {/* First Half of Dropdown Items */}
      {renderDropdownItems(firstHalf)}

      {/* Non-Dropdown Items */}
      {header_link_items
        .filter((item) => !item.dropdown)
        .map((item, index) => (
          <li key={index} className="text-lg text-right">
            <TextCTA
              className="text-black text-xl font-inter hover:opacity-55 transition-all active:scale-95"
              text={item.cta_text}
              link={item.cta_link}
              onClick={onClose} // Close menu when link is clicked
            />
          </li>
        ))}

      {/* Second Half of Dropdown Items */}
      {renderDropdownItems(secondHalf)}
    </ul>
  );
}
