import { PrismicNextImage } from "@prismicio/next";

export default function PartnerLogo({ image, className, imageClassName }) {
  return (
    <li className={`${className}`}>
      <PrismicNextImage height={100} alt="" width={100} className={`${imageClassName}`} field={image} />
    </li>
  )
}
