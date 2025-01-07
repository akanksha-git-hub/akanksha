'use client'
import { PrismicNextImage } from '@prismicio/next'
export default function StoryCircle({ index, onClick, image, currentIndex, className, height, width }) {
  const activeColors = [
    'bg-bright-yellow', // Bright yellow for the first story
    'bg-[#55BBD3]',      // Blue for the second story
    'bg-[#F6AC27]',    // Deep Green for the third story
  ];
  return (
    <li 
    className={`${className} ${
      currentIndex === index
        ? `${activeColors[index]} ` // Apply active story class + custom active color
        : 'in-active-story'                   // Default inactive story class
    } cursor-pointer rounded-full flex items-center justify-center transition-all duration-300`}
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
