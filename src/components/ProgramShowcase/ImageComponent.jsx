import { PrismicNextImage } from '@prismicio/next'

export default function ImageComponent({ image }) {
  return (
    <div className="h-[30vh] md:h-[32.4rem] w-full xl:w-[34%]">
      <PrismicNextImage 
        field={image}
        height={500}
        width={500}
        alt=""
        className="object-cover w-full h-full rounded-lg"
      />
  </div>  
)}
