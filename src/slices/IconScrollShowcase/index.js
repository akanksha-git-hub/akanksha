'use client'
import IconScrollShowcaseHorizontal from "@/components/IconScrollShowcaseVariants/IconScrollShowcaseHorizontal";
import IconScrollShowcaseDefault from "@/components/IconScrollShowcaseVariants/IconScrollShowcaseDefault";
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";
import useDebouncedResize from "@/hooks/useDebouncedResize";

/**
 * @typedef {import("@prismicio/client").Content.IconScrollShowcaseSlice} IconScrollShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IconScrollShowcaseSlice>} IconScrollShowcaseProps
 * @param {IconScrollShowcaseProps}
 */
const IconScrollShowcase = ({ slice }) => {


  const { width } = useDebouncedResize();

  if(slice.variation === 'horizontalVariant') {
    return(
      <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <SliceIdentifier 
        text={slice.primary.slice_identifier}
      />
      <div className="mt-16 space-y-2 flex flex-col md:items-center md:justify-center">
        <RichText 
          text={slice.primary.small_title}
          className='font-ambit-regular text-2xl text-deep-green uppercase max-w-[30ch] md:text-center'
        />
        <RichText 
          text={slice.primary.main_title}
          className='font-ambit-regular text-6xl text-deep-green max-w-[40ch] md:text-center'
        />
      </div>
      {
        width > 1400 ?
        <IconScrollShowcaseHorizontal 
          data={slice.primary.items}
        /> 
        :
        <IconScrollShowcaseDefault 
          data={slice.primary.items}
        />
      }
    </section>
    )
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <IconScrollShowcaseDefault 
        data={slice.primary.items}
      />
    </section>
  );
};

export default IconScrollShowcase;
