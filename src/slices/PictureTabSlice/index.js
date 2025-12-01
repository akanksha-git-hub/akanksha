'use client';

import CardFlip from "@/components/card-flip";
import TabContainer from "@/components/Tab/tab-container";
import RichTextRenderer from "@/components/v2-components/RichTextRenderer";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.PictureTabSliceSlice} PictureTabSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PictureTabSliceSlice>} PictureTabSliceProps
 * @param {PictureTabSliceProps}
 */
const PictureTabSlice = ({ slice, context }) => {


  const isSchoolLeaders = context?.id === "school-leaders"; 
  const isTeam = context?.id === "the-team"; 
 


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
      ) : (<>
           {slice?.primary?.heading?.length > 0 && (
  <RichTextRenderer field={slice.primary.heading} className="flex items-center justify-center text-black   text-3xl md:text-6xl   !mt-24 !mb-12 " />
)}
        <ul className="flex flex-wrap gap-12 items-center justify-center">
    
          {slice.primary.tab_content.map((item, index) => (
            <CardFlip 
              key={index} 
              i={index} 
              item={item} 
              isSchoolLeaders={isSchoolLeaders} 
              isTeam = {isTeam}
            />
          ))}
        </ul>
        </>
      )}
    </section>
  );
};

export default PictureTabSlice;
