import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import PrimaryCTA from "./UI/Button/PrimaryCTA";
import { maxwidth } from "@/utils/helperClasses";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import Link from "next/link";
import NavItems from "./nav-items";

export default async function Header() {

  const header = await fetchPrismicSingleDocument("header");
  const { cta_link, cta_text, logo_image, header_link_items, drop_down_items } = header.data;

  return (
    <header className="bg-cream px-6 py-2 border-b border-black">
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
        {/* MID-ITEMS LATER */}
        <div className="flex items-center gap-12">
          <NavItems 
            header_link_items={header_link_items}
            drop_down_items={drop_down_items}
          />
          <div>
            <PrimaryCTA 
              link={cta_link}
              text={cta_text}
              className="font-inter"
            />
          </div>
        </div>
      </div>
    </header>
  )
}
