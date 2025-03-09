import { PrismicNextImage } from "@prismicio/next";

export default function PartnerLogo({ image, className, imageClassName }) {
  return (
    <li className={`${className}`}>
      <PrismicNextImage height={600} alt="" width={600} className={`${imageClassName}`} field={image} />
    </li>
  )
}
