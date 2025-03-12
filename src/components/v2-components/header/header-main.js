"use client";
import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";
import { maxwidth } from "@/utils/helperClasses";
import NavItems from "@/components/nav-items";
import Button from "../buttons/button";
import HeaderDropDown from "./header-drop-down";
import Header from "./header";
import StandaloneHamburgerMenu from "../StandaloneHamburgerMenu";

export default function HeaderMain({ header }) {
  const uniqueIdentifier = [
    ...new Set(
      header.drop_down_items.map((item) => {
        const originalCaseValue = item.identifier;
        const lowerCaseValue = originalCaseValue.toLowerCase();
        return lowerCaseValue;
      })
    ),
  ];

  return (
    <Header className={`${maxwidth} bg-white`}>
      <Header.Container className="flex items-center  justify-between px-6  py-2 relative  ">
        {/* <HeaderDropDown
          uniqueIdentifier={uniqueIdentifier}
          drop_down_items={header.drop_down_items}
        /> */}
        <Header.Logo>
          <Link
            href="/"
            className="relative h-[4rem] w-[7.4rem] hidden lg:block"
          >
            <PrismicNextImage
              field={header.logo_image}
              alt=""
              className="h-full w-full"
              fill
            />
          </Link>
        </Header.Logo>

        <Link
          href="/"
          className="relative h-[3.8rem] w-[8rem] lg:hidden block  -ml-14  "
        >
          <PrismicNextImage
            field={header.logo_image}
            alt=""
            className="h-full w-full"
            fill
          />
        </Link>

        <Header.NavList>
          <NavItems
            uniqueIdentifier={uniqueIdentifier}
            header_link_items={header.header_link_items}
            drop_down_items={header.drop_down_items}
          />
        </Header.NavList>
        <Header.CTA>
          <Button prismicLink={header.cta_link}>{header.cta_text}</Button>
        </Header.CTA>
        <div className="lg:hidden -ml-8 ">
          <StandaloneHamburgerMenu
            header_link_items={header.header_link_items}
            uniqueIdentifier={uniqueIdentifier}
            drop_down_items={header.drop_down_items}
            header={header}
          />
        </div>
      </Header.Container>
    </Header>
  );
}
