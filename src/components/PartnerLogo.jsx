import { PrismicNextImage } from "@prismicio/next";

export default function PartnerLogo({ image, className, imageClassName }) {
  return (
    <li className={`${className}`}>
      <PrismicNextImage height={300} alt="" width={300} className={`${imageClassName}`} field={image} />
    </li>
  )
}
