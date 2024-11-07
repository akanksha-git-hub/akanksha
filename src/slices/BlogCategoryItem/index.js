/**
 * @typedef {import("@prismicio/client").Content.BlogCategoryItemSlice} BlogCategoryItemSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BlogCategoryItemSlice>} BlogCategoryItemProps
 * @param {BlogCategoryItemProps}
 */
const BlogCategoryItem = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for blog_category_item (variation: {slice.variation}
      ) Slices
    </section>
  );
};

export default BlogCategoryItem;
