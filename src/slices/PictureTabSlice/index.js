'use client'

import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.PictureTabSliceSlice} PictureTabSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PictureTabSliceSlice>} PictureTabSliceProps
 * @param {PictureTabSliceProps}
 */
const PictureTabSlice = ({ slice }) => {

  const isTab = slice.primary.enable_tabs;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex items-center justify-center"
    >
      <ul className="flex flex-wrap gap-12 items-center justify-center">
        {slice.primary.tab_content.map((item, i) => {
        return(
          <li className="relative flex rounded-xl w-full h-[500px] md:h-[598px] md:w-[420px] flip-card" key={i}>
            <span className="h-full w-full rounded-xl flip-card-inner relative">
              <PrismicNextImage 
                field={item.image}
                className="h-full w-full object-cover flip-image rounded-xl"
                height={1000}
                width={1000}
              />
              <div className="green-gradient-B absolute top-0 left-0 h-full w-full rounded-xl" />
            </span>
            <p className="flip-title flex flex-col text-center max-w-[90%] font-ambit-regular">
              <span className="text-3xl">{item.name}</span>
              <span className="text-lg">{item.position}</span>
            </p>
          </li>
        )})}
      </ul>
    </section>
  );
};

export default PictureTabSlice;
