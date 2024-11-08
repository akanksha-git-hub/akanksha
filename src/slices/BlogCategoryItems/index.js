'use client'

import RichText from "@/components/Texts/RichText";
import PrimaryCTA from "@/components/UI/Button/PrimaryCTA";

/**
 * @typedef {import("@prismicio/client").Content.BlogCategoryItemsSlice} BlogCategoryItemsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BlogCategoryItemsSlice>} BlogCategoryItemsProps
 * @param {BlogCategoryItemsProps}
 */
const BlogCategoryItems = ({ slice }) => {

  const identifier = slice.primary.category_identifier.split(" ").join('').toLowerCase();

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id={identifier}
      className="h-screen"
    >
      <div className="flex items-center justify-between">
        <RichText 
          text={slice.primary.title}
          className='text-deep-green font-ambit-semibold text-4xl w-[20ch]'
        />
        <PrimaryCTA 
          className='!py-2'
          text={slice.primary.cta_text}
        />
      </div>
    </section>
  );
};

export default BlogCategoryItems;
