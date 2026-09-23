import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.StoryImageSlice} StoryImageSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StoryImageSlice>} StoryImageProps
 * @param {StoryImageProps}
 */

const StoryImage = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full"
    >
      <div className="my-10 w-full md:my-14">
        <PrismicNextImage
          field={slice.primary.image}
          className="h-auto w-full rounded-[18px] object-cover"
        />
      </div>
    </section>
  );
};

export default StoryImage;