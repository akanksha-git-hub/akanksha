import TabContainer from "@/components/TabContainer";
import RichText from "@/components/Texts/RichText";

/**
 * @typedef {import("@prismicio/client").Content.TabSliceSlice} TabSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TabSliceSlice>} TabSliceProps
 * @param {TabSliceProps}
 */
const TabSlice = ({ slice }) => {

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <RichText 
        text={slice.primary.title}
        className='text-deep-green font-ambit-regular text-5xl md:text-7xl text-left mt-14'
      />
      <TabContainer 
        slice={slice}
      />
    </section>
  );
};

export default TabSlice;
