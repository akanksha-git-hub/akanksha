import ResourcesCard from "@/components/Resources/ResourcesCard";

/**
 * @typedef {import("@prismicio/client").Content.BlogRecentsSlice} BlogRecentsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BlogRecentsSlice>} BlogRecentsProps
 * @param {BlogRecentsProps}
 */
const BlogRecents = ({ slice, context }) => {

  if(slice.variation === 'default') {
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
  }

  if(slice.variation === 'tagVariation') {
    return(
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
              {(item) => <ResourcesCard.ItemB item={item} />}
            </ResourcesCard.ItemsContainer>
            <ResourcesCard.PaginationContainer />
          </ResourcesCard>
        </section>
      )}
      </>
    )
  }

};

export default BlogRecents;
