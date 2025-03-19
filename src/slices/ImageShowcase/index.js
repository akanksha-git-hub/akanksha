import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.ImageShowcaseSlice} ImageShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImageShowcaseSlice>} ImageShowcaseProps
 * @param {ImageShowcaseProps}
 */
const ImageShowcase = ({ slice }) => {
  const images = slice.primary.images;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-14"
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((item, index) => (
          <div
            key={index}
            className="flex justify-center items-center border w-full aspect-square"
          >
            <PrismicNextImage
              className="object-contain w-[70%] h-[70%]"
              field={item.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImageShowcase;
