'use client'
import ResourcesCard from "@/components/Resources/ResourcesCard";

/**
 * @typedef {import("@prismicio/client").Content.BlogCategoryItemsSlice} BlogCategoryItemsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BlogCategoryItemsSlice>} BlogCategoryItemsProps
 * @param {BlogCategoryItemsProps}
 */
const BlogCategoryItems = ({ slice, context }) => {

  let identifier = slice.primary.category_identifier.split(" ").join('').toLowerCase();

  if(slice.variation === 'default') {

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
            <ResourcesCard.PaginationContainer />
          </ResourcesCard>
      </section>
      )}
      </>
    );

  }

  if(slice.variation === 'filmsVariation') {

    return(
      <>
      {identifier === context && (
        <section
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
          className="mt-24"
          id={identifier}
        >
          <ResourcesCard slice={slice}>
            <ResourcesCard.Eyebrow 
              isFilter
              className='mb-12' 
            />
            <ResourcesCard.ItemsContainer 
              itemKeyFn={(item) => item.date}
              isFilter 
            >
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

export default BlogCategoryItems;
