import { PrismicLink } from '@prismicio/react'
import React from 'react'

export default function SecondaryCTA({ link, className, text, ...props }) {
  return (
    <PrismicLink
      field={link}  
    >
      <button 
        className={
          `bg-cream text-deep-green border border-deep-green transition-all hover:opacity-50 hover:scale-95
          w-fit text-sm rounded-full py-3 px-8 ${className}`}
          {...props}
      >
        <u>{text}</u>
      </button>
    </PrismicLink>
  )
}
