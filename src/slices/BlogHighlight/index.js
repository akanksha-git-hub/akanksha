/**
 * @typedef {import("@prismicio/client").Content.BlogHighlightSlice} BlogHighlightSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BlogHighlightSlice>} BlogHighlightProps
 * @param {BlogHighlightProps}
 */
const BlogHighlight = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for blog_highlight (variation: {slice.variation})
      Slices
    </section>
  );
};

export default BlogHighlight;
