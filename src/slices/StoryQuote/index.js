/**
 * @typedef {import("@prismicio/client").Content.StoryQuoteSlice} StoryQuoteSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<StoryQuoteSlice>} StoryQuoteProps
 * @param {StoryQuoteProps}
 */

const StoryQuote = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full"
    >
      <div className="my-12 flex items-stretch gap-8 md:my-16 md:gap-10">

        {/* Vertical line */}

        <div className="w-[4px] shrink-0 bg-black" />

        {/* Quote */}

        <blockquote
          className="max-w-[900px] py-2 text-[32px] leading-[1.25] md:text-[38px] "
          style={{
            fontFamily:
              '"Brush Script MT", "Segoe Print", cursive',
            fontStyle: "italic",
          }}
        >
          {slice.primary.quote}
        </blockquote>

      </div>
    </section>
  );
};

export default StoryQuote;