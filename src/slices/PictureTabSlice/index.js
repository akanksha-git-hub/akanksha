'use client';

import CardFlip from "@/components/card-flip";
import TabContainer from "@/components/Tab/tab-container";

/**
 * @typedef {import("@prismicio/client").Content.PictureTabSliceSlice} PictureTabSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PictureTabSliceSlice>} PictureTabSliceProps
 * @param {PictureTabSliceProps}
 */
const PictureTabSlice = ({ slice, context }) => {


  const isSchoolLeaders = context?.id === "school-leaders"; // ✅ Extract the boolean value


  const isTab = slice.primary.enable_tabs;
  let uniqueValues;

  if (isTab) {
    uniqueValues = slice.primary.tab_values.map((item) => ({
      originalValue: item.value,
      lowerCaseValue: item.value.toLowerCase(),
    }));
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      {isTab ? (
        <TabContainer
          tabValues={uniqueValues}
          data={slice.primary.tab_content}
          RenderElement={(props) => <CardFlip {...props} isSchoolLeaders={isSchoolLeaders} />} 
          className="flex flex-wrap gap-12 items-center justify-center mt-12"
        />
      ) : (
        <ul className="flex flex-wrap gap-12 items-center justify-center">
          {slice.primary.tab_content.map((item, index) => (
            <CardFlip 
              key={index} 
              i={index} 
              item={item} 
              isSchoolLeaders={isSchoolLeaders} 
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default PictureTabSlice;
