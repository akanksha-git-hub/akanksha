import { PrismicNextImage } from "@prismicio/next";
import PrimaryCTA from "./UI/Button/PrimaryCTA";
import { maxwidth } from "@/utils/helperClasses";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import Link from "next/link";
import NavItems from "./nav-items";
import HamburgerWrapper from "./HamburgerMenu/HamburgerWrapper";
import Hamburger from "./HamburgerMenu/Hamburger";
import HamburgerContent from "./HamburgerMenu/HamburgerContent";
import HamburgerIcon from "./HamburgerMenu/HamburgerIcon";

export default async function Header() {

  const header = await fetchPrismicSingleDocument("header");
  const { cta_link, cta_text, logo_image, header_link_items, drop_down_items } = header.data;

  return (
    <Hamburger>
      <header className="bg-cream px-6 py-2 border-b border-black relative">
        <div className={`flex items-center justify-between max-w-[2200px] mx-auto ${maxwidth}`}>
          <Link href="/" className="h-[2.7rem] w-[4.6rem]">
            <PrismicNextImage 
              field={logo_image}
              alt=""
              className="h-full w-full"
              height={200}
              width={200}
            />
          </Link>
          {/* MID-ITEMS */}
          <div className="flex items-center gap-12">
            <NavItems 
              header_link_items={header_link_items}
              drop_down_items={drop_down_items}
            />
            <div className="flex gap-4 lg:gap-0">
              <PrimaryCTA 
                link={cta_link}
                text={cta_text}
                className="!text-sm lg:text-xl font-inter"
              />
              <div 
                className='block lg:hidden'
              >
                <HamburgerIcon />
              </div>
            </div>
          </div>
        </div>
        <div 
          className={`
              absolute z-50 top-full left-0 w-full h-auto lg:hidden
            `}
        >
          <HamburgerContent>
            Hello there
          </HamburgerContent>
        </div>
      </header>
    </Hamburger>
  )
}
