import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.ImpactHeroSlice} ImpactHeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImpactHeroSlice>} ImpactHeroProps
 * @param {ImpactHeroProps}
 */
const ImpactHero = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding mt-0"
    >
      {/* Left Butterfly Image */}
      <PrismicNextImage
        field={slice.primary.left_image}
        className="absolute top-96  left-52 w-40 h-40 hidden xl:block"
      />
      {/* Right Butterfly Image */}
      <PrismicNextImage
        field={slice.primary.right_image}
        className="absolute top-40 right-96 w-32 h-32 hidden xl:block"
      />
      <div className="w-[80%] mt-12 mx-auto ">
        <div className="w-full  md:text-center text-start">
          {/* Title */}
          <h1 className="md:text-9xl text-8xl font-ambit-regular text-[#333333] md:mx-auto w-[5ch] mx-0 ">
            {slice.primary.title}
          </h1>

          <div className="mt-24 flex flex-wrap md:justify-center justify-start w-full ">
            {slice.primary.stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col md:items-center py-2 px-8"
              >
                <p className="text-5xl font-ambit-regular">{stat.number}</p>
                <p className="text-lg font-ambit-regular mt-2 ">{stat.field}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactHero;