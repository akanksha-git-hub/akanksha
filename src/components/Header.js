import { PrismicNextImage } from "@prismicio/next";
import PrimaryCTA from "./UI/Button/PrimaryCTA";
import { maxwidth } from "@/utils/helperClasses";
import TextCTA from "./UI/Button/TextCTA";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import Link from "next/link";

export default async function Header() {

  const header = await fetchPrismicSingleDocument("header");
  const { cta_link, cta_text, logo_image, header_link_items } = header.data;
  

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
          {header_link_items.length > 0 && (
            <ul className="hidden lg:flex items-center gap-8">
              {header_link_items.map(item => <TextCTA className="text-deep-green text-base font-inter hover:opacity-55 transition-all active:scale-95" key={item.cta_text} text={item.cta_text} link={item.cta_link} />)}
            </ul>
          )}
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
