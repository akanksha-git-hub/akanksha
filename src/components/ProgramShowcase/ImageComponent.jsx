import { PrismicNextImage } from '@prismicio/next'

export default function ImageComponent({ image }) {
  return (
    <div className="h-[30vh] md:h-[32.4rem] w-full xl:w-[42%]">
      <PrismicNextImage 
        field={image}
        height={500}
        width={500}
        alt=""
        className="object-cover w-full h-full rounded-lg md:rounded-br-none md:rounded-tr-none md:rounded-bl-lg md:rounded-tl-lg"
      />
  </div>  
)}
