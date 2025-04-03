import { PrismicImage } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.QuoteSlice} QuoteSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<QuoteSlice>} QuoteProps
 * @param {QuoteProps}
 */
const Quote = ({ slice }) => {
  return (
    <section
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
    className="uiversal-padding mt-20"
  >
    <div className="relative w-full max-w-3xl  lg:min-h-[250px] mx-auto  bg-white p-6 sm:p-10 flex items-center justify-center text-center">
      
      {/* Top quote icon */}
      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 w-6 h-6 sm:w-12 sm:h-12">
        <PrismicImage
          field={slice.primary.quote_image}
          className="w-full h-full object-contain"
        />
      </div>
  
      {/* Centered Text */}
      <p className="text-[1.1rem] sm:text-[1.35rem] font-ambit-regular px-4 sm:px-6">
        {slice.primary.quote}
      </p>
  
      {/* Bottom quote icon */}
      <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-6 h-6 sm:w-12 sm:h-12 transform scale-y-[-1] scale-x-[-1]">
        <PrismicImage
          field={slice.primary.quote_image}
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  </section>
  
  
  );
};

export default Quote;
