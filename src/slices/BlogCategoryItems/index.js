'use client'
import ResourcesCard from "@/components/Resources/ResourcesCard";

/**
 * @typedef {import("@prismicio/client").Content.BlogCategoryItemsSlice} BlogCategoryItemsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BlogCategoryItemsSlice>} BlogCategoryItemsProps
 * @param {BlogCategoryItemsProps}
 */
const BlogCategoryItems = ({ slice, context }) => {

  const identifier = slice.primary.category_identifier.split(" ").join('').toLowerCase();

  return (
    <>
    {identifier === context && (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        id={identifier}
      >
        <ResourcesCard slice={slice}>
          <ResourcesCard.Eyebrow 
            className='mb-12' 
          />
          <ResourcesCard.ItemsContainer itemKeyFn={(item) => item.date}>
            {(item) => <ResourcesCard.ItemA item={item} />}
          </ResourcesCard.ItemsContainer>
        </ResourcesCard>
    </section>
    )}
    </>
  );
};

export default BlogCategoryItems;
