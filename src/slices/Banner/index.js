import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.BannerSlice} BannerSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BannerSlice>} BannerProps
 */

/**
 * @param {BannerProps}
 */
const Banner = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding"
    >
      
      <PrismicNextLink field={slice.primary.link}>
        <PrismicNextImage
          field={slice.primary.banner_image}
          className="w-full h-auto object-cover"
        />
      </PrismicNextLink>
    </section>
  );
};

export default Banner;