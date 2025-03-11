import SliceIdentifier from "@/components/SliceIdentifier";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.MapReachSlice} MapReachSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MapReachSlice>} MapReachProps
 * @param {MapReachProps}
 */
const MapReach = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=" mt-14"
    >
      <SliceIdentifier text={slice.primary.slice_identifier}  />

      <div className="flex flex-col justify-center items-center relative mt-10  ">
        <h1 className="text-3xl md:text-6xl font-ambit-regular">{slice.primary.title}</h1>
       

        <div className="relative h-full w-full flex items-center justify-center mt-10 ">
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
