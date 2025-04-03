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
    className="uiversal-padding mt-16 ">
 <div className="relative w-full max-w-3xl h-64 mx-auto ">
  
  <div className="absolute top-4 left-4 w-12 h-12">
    <PrismicImage
      field={slice.primary.quote_image}
      className="w-full h-full object-contain"
    />
  </div>

  
  <div className="flex items-center justify-center h-full px-6 text-center">
    <p className="text-[1.35rem] font-ambit-regular">
      {slice.primary.quote}
    </p>
  </div>

  
  <div className="absolute bottom-4 right-4 w-12 h-12 transform scale-y-[-1] scale-x-[-1]">
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
