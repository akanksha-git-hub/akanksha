'use client'
import CardFlip from "@/components/card-flip";
import TabContainer from "@/components/Tab/tab-container";

/**
 * @typedef {import("@prismicio/client").Content.PictureTabSliceSlice} PictureTabSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PictureTabSliceSlice>} PictureTabSliceProps
 * @param {PictureTabSliceProps}
 */
const PictureTabSlice = ({ slice }) => {

  const isTab = slice.primary.enable_tabs;

  const uniqueValues = slice.primary.tab_values.map(item => {
    const originalValue = item.value;
    const lowerCaseValue = item.value.toLowerCase();
    return { originalValue, lowerCaseValue }; 
  });

  
  return(
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col items-center justify-center"
    >
      {isTab ? 
        <TabContainer
          tabValues={uniqueValues}
          data={slice.primary.tab_content}
          RenderElement={CardFlip}
          className="flex flex-wrap gap-12 items-center justify-center mt-12"
        />
        :
        <ul className="flex flex-wrap gap-12 items-center justify-center">
          {slice.primary.tab_content.map((item, index) => <CardFlip key={index} i={index} item={item} />)}
        </ul>
      }
  </section>
  )
};

export default PictureTabSlice;
