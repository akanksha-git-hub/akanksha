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

  // Create a ref for each dropdown item
  const dropdownRefs = useRef(uniqueIdentifier.map(() => null));

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

      return (
        <li
          key={index}
          className="w-full flex flex-col items-start justify-center"
        >
          {/* Dropdown Toggle */}
          <DropdownToggleMobile
            text={identifier}
            isActive={isActive}
            onClick={() => handleDropdownToggle(identifier)}
          />

          {/* Dropdown Content */}
          <div
            ref={(el) => (dropdownRefs.current[index] = el)}
            className={`overflow-hidden transition-all duration-300 ease-in-out w-full`}
            style={{
              maxHeight: isActive
                ? `1000px`
                : "0px",
              opacity: isActive ? 1 : 0,
            }}
          >
            <ul className="ml-4 mt-2 space-y-2 text-left border-l-2 border-gray-600 pl-4">
              {/* Add vertical line on the right side */}
              {drop_down_items
                .filter((item) => item.identifier.toLowerCase() === identifier)
                .map((dropdown, subIndex) => (
                  <li
                    key={subIndex}
                    className="text-left w-full flex flex-col items-start"
                  >
                    <TextCTA
                      className="text-black text-lg font-light hover:opacity-75 transition-all"
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
    <ul className="flex flex-col items-start justify-center w-full h-full space-y-6 mt-10">
      {/* First Half of Dropdown Items */}
      {renderDropdownItems(firstHalf)}

      {/* Non-Dropdown Items */}
      {header_link_items
        .filter((item) => !item.dropdown)
        .map((item, index) => (
          <li key={index} className="  text-lg text-left">
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
