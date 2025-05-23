import SliceIdentifier from "@/components/SliceIdentifier";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.MapReachSlice} MapReachSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MapReachSlice>} MapReachProps
 * @param {MapReachProps}
 */
const MapReach = ({ slice }) => {
   const { show_identifier, slice_identifier } = slice.primary;
    
      const RenderIdentifier = () =>
        show_identifier && <SliceIdentifier text={slice_identifier} />;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mt-14"
    >
      <RenderIdentifier />

      <div className="flex flex-col justify-center relative mt-14">
        {/* Separate div for title alignment */}
        <div className="w-full px-4 md:px-0">
          <h1 className="text-3xl md:text-6xl font-ambit-regular text-left md:text-center">
            {slice.primary.title}
          </h1>
        </div>

        <div className="relative h-full w-full flex items-center justify-center mt-10">
          <PrismicNextImage
            height={1000}
            width={1000}
            field={slice.primary.image}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default MapReach;
