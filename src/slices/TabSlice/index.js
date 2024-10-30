import TabContainer from "@/components/TabContainer";
import RichText from "@/components/Texts/RichText";
import Image from "next/image";

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
      <div className="w-fit relative">
        <RichText 
          text={slice.primary.title}
          className='text-deep-green font-ambit-regular text-5xl md:text-7xl text-left mt-28'
        />
        <Image 
          src='/sparkle_small.svg'
          alt=""
          height={60}
          width={60}
          className="absolute top-2/4 -translate-y-2/4 -right-0 md:-right-24"
        />
        <Image 
          src='/sparkle_med.svg'
          alt=""
          height={80}
          width={80}
          className="absolute bottom-24 right-12 md:-right-52"
        />
      </div>
      <TabContainer 
        slice={slice}
      />
    </section>
  );
};

export default TabSlice;
