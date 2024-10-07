'use client'
import { PrismicNextImage } from '@prismicio/next'
export default function StoryCircle({ index, onClick, image, currentIndex, className, height, width }) {
  return (
    <li 
      className={`${className} ${currentIndex === index ? 'active-story' : 'in-active-story'} cursor-pointer rounded-full flex items-center justify-center`} 
      onClick={() => onClick(index)}
    >
      <PrismicNextImage 
        field={image}
        className="cover-object rounded-full"
        height={height} 
        width={width} 
        alt=""
      />
    </li>
  )
}
