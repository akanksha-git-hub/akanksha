import ResourcesCard from "@/components/Resources/ResourcesCard";

/**
 * @typedef {import("@prismicio/client").Content.BlogRecentsSlice} BlogRecentsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BlogRecentsSlice>} BlogRecentsProps
 * @param {BlogRecentsProps}
 */
const BlogRecents = ({ slice, context }) => {
  return (
    <>
    {!context || context === "recent" && (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        id="recent"
      >
        <ResourcesCard slice={slice}>
          <ResourcesCard.Eyebrow 
            className='mb-12' 
          />
          <ResourcesCard.ItemsContainer itemKeyFn={(item) => item.date}>
            {(item) => <ResourcesCard.ItemA item={item} />}
          </ResourcesCard.ItemsContainer>
          <ResourcesCard.PaginationContainer />
        </ResourcesCard>
      </section>
    )}
    </>
  );
};

export default BlogRecents;
