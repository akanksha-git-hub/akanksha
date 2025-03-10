import React from 'react'
import { PrismicNextImage } from '@prismicio/next'

function HeadingAndDescription({ heading, description, iconField }) {
  // Check if we have a valid Prismic image
  const hasIcon = !!iconField?.url

  return (
    <div className="flex flex-col gap-4">
      {/* Row containing either the image icon or a black box, plus heading */}
      <div className="flex items-center gap-4">
        {hasIcon ? (
          // If we have an icon, display it
          <div className="relative w-14 h-14 md:w-20 md:h-20">
            <PrismicNextImage
              field={iconField}
              fill
              style={{ objectFit: 'contain' }}
              alt={iconField?.alt || 'Icon'}
            />
          </div>
        ) : (
          // Otherwise, fall back to a black circle
          <div className="h-10 w-10 md:h-16 md:w-16 rounded-full bg-black" />
        )}

        <h1 className="font-ambit-regular text-black text-5xl md:text-7xl">
          {heading}
        </h1>
      </div>

      <p className="font-ambit-regular text-black text-[1.35rem] lg:text-left">
        {description}
      </p>
    </div>
  )
}

export default HeadingAndDescription
