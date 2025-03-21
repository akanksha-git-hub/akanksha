'use client'
import { PrismicNextImage } from '@prismicio/next'
export default function StoryCircle({ index, onClick, image, currentIndex, className, height, width }) {
  const activeColors = [
    'bg-none', // Bright yellow for the first story

  ];
  return (
    <li 
    className={`${className} ${
      currentIndex === index
        ? `${activeColors[index]} ` // Apply active story class + custom active color
        : 'in-active-story'                   // Default inactive story class
    } cursor-pointer rounded-full  flex items-center justify-center transition-all duration-300 scale-75 md:scale-105 xl:scale-100    `}
    onClick={() => onClick(index)}
    >
      <PrismicNextImage 
        field={image}
        className="cover-object rounded-full "
        height={height} 
        width={width} 
        alt=""
      />
    </li>
  )
}
