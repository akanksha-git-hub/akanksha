"use client"
import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";
import { maxwidth } from "@/utils/helperClasses";
import NavItems from "@/components/nav-items";
import Button from "../buttons/button";
import HeaderDropDown from "./header-drop-down";
import Header from "./header";


export default function HeaderMain({ header }) {

  
    const uniqueIdentifier = [...new Set(header.drop_down_items.map(item => {
      const originalCaseValue = item.identifier;
      const lowerCaseValue = originalCaseValue.toLowerCase();
      return lowerCaseValue;
    }))];


    return(
        <Header className={`${maxwidth} bg-white`}>
            <Header.Container className="flex items-center justify-between px-6 py-4 relative">
               <HeaderDropDown 
                    uniqueIdentifier={uniqueIdentifier}
                    drop_down_items={header.drop_down_items}
               />
                <Header.Logo>
                    <Link href="/" className="relative h-[3.7rem] w-[8.6rem] hidden lg:block">
                        <PrismicNextImage 
                            field={header.logo_image}
                            alt=""
                            className="h-full w-full"
                            fill
                        />
                    </Link> 
                </Header.Logo>
                <Header.NavList>
                    <NavItems 
                        uniqueIdentifier={uniqueIdentifier}
                        header_link_items={header.header_link_items}
                    />
                </Header.NavList>
                <Header.CTA>
                    <Button
                        prismicLink={header.cta_link}
                    >
                        {header.cta_text}
                    </Button>
                </Header.CTA>
            </Header.Container>
        </Header>
    )

}