/**
 * @typedef {import("@prismicio/client").Content.PeopleOfAkankshaIntroSlice} PeopleOfAkankshaIntroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PeopleOfAkankshaIntroSlice>} PeopleOfAkankshaIntroProps
 * @param {PeopleOfAkankshaIntroProps}
 */
const PeopleOfAkankshaIntro = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full"
    >
      <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-16 text-center md:px-10 md:pb-20 md:pt-20 lg:px-12">
        <div className="mx-auto max-w-[900px]">

          {slice.primary.small_heading && (
            <p className="font-ambit-regular text-lg text-black sm:text-xl">
              {slice.primary.small_heading}
            </p>
          )}

          {slice.primary.heading && (
            <h2 className="mt-4 font-ambit-regular text-4xl leading-[1.05] text-black sm:text-5xl lg:text-7xl">
              {slice.primary.heading}
            </h2>
          )}

          {slice.primary.description && (
            <p className="mx-auto mt-6 max-w-[800px] font-ambit-regular text-base leading-7 text-black sm:text-lg md:w-[80%]">
              {slice.primary.description}
            </p>
          )}

        </div>
      </div>
    </section>
  );
};

export default PeopleOfAkankshaIntro;