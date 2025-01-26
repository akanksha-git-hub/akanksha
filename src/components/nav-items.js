import TextCTA from "./UI/Button/TextCTA";
import NavItemDropDownText from "./v2-components/header/nav-item-dropdown-text";
import { useHeaderDropDownContext } from "./v2-components/header/header";

export default function NavItems({
  header_link_items = [],
  uniqueIdentifier = [],
}) {
  const { setDropdownId } = useHeaderDropDownContext();

  const capitalizeWords = (text) =>
    text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

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
        <ul className="hidden lg:flex items-center w-full justify-between ">
          {/* Left Section: First half of dropdown items */}
          <div className="flex items-center gap-8">
            {leftDropdownItems.map((item) => (
              <li key={item.cta_text} className="relative group">
                <div className="drop-down">
                  <NavItemDropDownText
                    text={capitalizeWords(item.cta_text)}
                    className="text-deep-green text-lg font-inter relative cursor-pointer"
                    onClick={() => setDropdownId(item.cta_text.toLowerCase())}
                  />
                </div>
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
                <div className="drop-down">
                  <NavItemDropDownText
                    text={capitalizeWords(item.cta_text)}
                    className="text-deep-green text-lg font-inter relative cursor-pointer"
                    onClick={() => setDropdownId(item.cta_text.toLowerCase())}
                  />
                </div>
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
