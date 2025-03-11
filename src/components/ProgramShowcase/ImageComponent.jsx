import { PrismicNextImage } from '@prismicio/next'

export default function ImageComponent({ image, className }) {
  return (
    <div className={`h-[30vh] md:h-[36rem] ${className}`}>
      <PrismicNextImage 
        field={image}
        height={1200}
        width={1200}
        quality={100}
        alt=""
        className="object-cover w-full h-full rounded-lg md:rounded-br-none md:rounded-tr-none md:rounded-bl-lg md:rounded-tl-lg"
      />
  </div>  
)}
