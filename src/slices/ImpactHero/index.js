import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.ImpactHeroSlice} ImpactHeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImpactHeroSlice>} ImpactHeroProps
 * @param {ImpactHeroProps}
 */
const ImpactHero = ({ slice }) => {
  if (slice.variation === "stats") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className=" "
      >
        <div className="w-[80%]  md:mx-auto  ">
          <div className=" flex flex-wrap md:justify-center justify-start w-full gap-4 xl:gap-8 ">
            {slice.primary.stats.map((stat, index) => (
              <div key={index} className="flex flex-col md:items-center  py-2">
                <p className="text-5xl md:text-6xl font-ambit-regular">{stat.number}</p>
                <p className="text-xl md:text-2xl font-ambit-regular mt-2 md:w-[10ch] w-[8ch] text-left md:text-center  ">
                  {stat.field}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding mt-0 "
    >
      {/* Left Butterfly Image */}
      <PrismicNextImage
        field={slice.primary.left_image}
        alt=""
        className="absolute top-40  left-52 w-40 h-40 hidden xl:block"
      />
      {/* Right Butterfly Image */}
      <PrismicNextImage
        field={slice.primary.right_image}
        alt=""
        className="absolute top-16 right-72 w-28 h-28 hidden xl:block"
      />
      <div className=" mt-4 ">
        <div className="w-full  md:text-center text-start ">
          {/* Title */}
          <h1 className="text-3xl md:text-6xl font-ambit-regular text-black  md:mx-auto  mx-0 ">
            {slice.primary.title}
          </h1>
          <p className="text-[1.35rem] font-ambit-regular text-black md:mx-auto w-full xl:w-[45ch]  mt-14">
            {slice.primary.editable_description}
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. */}
          </p>

          {/* <div className="mt-24 flex flex-wrap md:justify-center justify-start w-full  gap-12">
            {slice.primary.stats.map((stat, index) => (
              <div key={index} className="flex flex-col md:items-center py-2">
                <p className="text-5xl font-ambit-regular">{stat.number}</p>
                <p className="text-lg font-ambit-regular mt-2 ">{stat.field}</p>
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ImpactHero;
