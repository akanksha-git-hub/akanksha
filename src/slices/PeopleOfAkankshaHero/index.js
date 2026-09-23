import Button from "@/components/v2-components/buttons/button";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.PeopleOfAkankshaHeroSlice} PeopleOfAkankshaHeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PeopleOfAkankshaHeroSlice>} PeopleOfAkankshaHeroProps
 * @param {PeopleOfAkankshaHeroProps}
 */
const PeopleOfAkankshaHero = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full"
    >
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 py-16 md:px-10 lg:grid-cols-2 lg:gap-16 lg:px-12 lg:py-24">

        {/* Left Content */}
        <div className="max-w-[760px]">

          {/* Small Heading */}
          {slice.primary.small_heading && (
            <p className="mb-5 font-ambit-regular text-lg italic leading-tight text-black md:text-xl lg:text-2xl">
              {slice.primary.small_heading}
            </p>
          )}

          {/* Main Heading */}
          {slice.primary.heading && (
            <h1 className="max-w-[680px] font-ambit-semibold text-5xl leading-[0.95] md:w-[60%] tracking-[-0.035em] text-black md:text-6xl lg:text-7xl">
              {slice.primary.heading}
            </h1>
          )}

          {/* Description */}
          {slice.primary.description && (
            <div className="mt-8 max-w-[700px] font-ambit-regular text-base leading-7 w-[85%] text-black md:text-lg lg:text-xl lg:leading-8">
              <PrismicRichText
                field={slice.primary.description}
              />
            </div>
          )}

          {/* Button */}
          {slice.primary.link_1 && (
            <div className="mt-8">
              <Button
                prismicLink={slice.primary.link_1}
                
              >
                {slice.primary.link_1_text}
              </Button>
            </div>
          )}

        </div>

        {/* Hero Image */}
        {slice.primary.hero_image && (
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-[720px] overflow-hidden rounded-[20px]">
              <PrismicNextImage
                field={slice.primary.hero_image}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default PeopleOfAkankshaHero;  