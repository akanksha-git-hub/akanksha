'use client'
import { PrismicNextImage } from '@prismicio/next'
import Link from 'next/link'
import { useHamburgerContext } from './HamburgerMenu/Hamburger'

export default function HeaderHomeLogo({ image }) {

    const { toggleMenu } = useHamburgerContext();

  return (
    <Link onClick={toggleMenu} href="/" className="h-[3.7rem] w-[6.6rem] lg:hidden">
        <PrismicNextImage 
            field={image}
            alt=""
            className="h-full w-full"
            height={200}
            width={200}
        />
    </Link>  
)
}
