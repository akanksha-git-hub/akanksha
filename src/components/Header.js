import PrimaryCTA from "./UI/Button/PrimaryCTA";
import { maxwidth } from "@/utils/helperClasses";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import NavItems from "./nav-items";
import Hamburger from "./HamburgerMenu/Hamburger";
import HamburgerContent from "./HamburgerMenu/HamburgerContent";
import HamburgerIcon from "./HamburgerMenu/HamburgerIcon";
import HeaderHomeLogo from "./HeaderHomeLogo";
import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";
import Button from "./v2-components/buttons/button";

export default async function Header() {

  const header = await fetchPrismicSingleDocument("header");
  const { cta_link, cta_text, logo_image, header_link_items, drop_down_items } = header.data;

  const uniqueIdentifier = [...new Set(drop_down_items.map(item => {
    const originalCaseValue = item.identifier;
    const lowerCaseValue = originalCaseValue.toLowerCase();
    return lowerCaseValue;
  }))];


  return (
    <Hamburger>
      <header className="px-6 py-4 relative">
        <div className={`flex items-center justify-between max-w-[2200px] mx-auto ${maxwidth}`}>
          <HeaderHomeLogo
            image={logo_image} 
          />
          <Link href="/" className="relative h-[3.7rem] w-[8.6rem] hidden lg:block">
            <PrismicNextImage 
                field={logo_image}
                alt=""
                className="h-full w-full"
                fill
            />
          </Link>  
          {/* MID-ITEMS */}
            <NavItems 
              uniqueIdentifier={uniqueIdentifier}
              header_link_items={header_link_items}
              drop_down_items={drop_down_items}
            />
            {/*  */}
            <div className="flex gap-4 lg:gap-0">
              <Button
                prismicLink={cta_link}
              >
                {cta_text}
              </Button>
              <div 
                className='block lg:hidden'
              >
                <HamburgerIcon />
              </div>
            </div>
        </div>
        <div 
          className={`
              absolute z-50 top-full left-0 w-full h-auto lg:hidden
            `}
        >
          <HamburgerContent 
            uniqueIdentifier={uniqueIdentifier}
            header_link_items={header_link_items}
            drop_down_items={drop_down_items}
          />
        </div>
      </header>
    </Hamburger>
  )
}
