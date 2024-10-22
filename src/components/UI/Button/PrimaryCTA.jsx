'use client'
import { PrismicLink } from '@prismicio/react'

export default function PrimaryCTA({ link, className, text, ...props }) {

  return (
    <PrismicLink
      field={link}  
    >
      <p
        // type='button'
        className={
          `bg-deep-green text-cream border border-black transition-all hover:bg-bright-yellow hover:text-deep-green hover:scale-95
          hover:border-black hover:border-solid
          w-fit text-sm rounded-full py-3 px-8 ${className}`}
        {...props}
      >
        {text}
      </p>
    </PrismicLink>
  )
}
