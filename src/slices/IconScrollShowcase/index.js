'use client'
import IconScrollShowcaseHorizontal from "@/components/IconScrollShowcaseVariants/IconScrollShowcaseHorizontal";
import IconScrollShowcaseDefault from "@/components/IconScrollShowcaseVariants/IconScrollShowcaseDefault";
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";
import useDebouncedResize from "@/hooks/useDebouncedResize";
import IconScrollShowcaseDefaultV2 from "@/components/IconScrollShowcaseVariants/IconScrollShowcaseDefaultV2";
import IconScrollShowcaseModernV2 from "@/components/IconScrollShowcaseVariants/IconScrollShowcaseModernV2";
import Button from "@/components/v2-components/buttons/button";

/**
 * @typedef {import("@prismicio/client").Content.IconScrollShowcaseSlice} IconScrollShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IconScrollShowcaseSlice>} IconScrollShowcaseProps
 * @param {IconScrollShowcaseProps}
 */
const IconScrollShowcase = ({ slice }) => {
  const { show_identifier, slice_identifier } = slice.primary;
    
      const RenderIdentifier = () =>
        show_identifier && <SliceIdentifier text={slice_identifier} />;


  const { width } = useDebouncedResize();

  if(slice.variation === 'horizontalVariant') {
    return(
      <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <RenderIdentifier />
      <div className="mt-16 space-y-2 flex flex-col md:items-center md:justify-center">
        <RichText 
          text={slice.primary.small_title}
          className='font-ambit-regular text-2xl text-black uppercase max-w-[30ch] md:text-center'
        />
        <RichText 
          text={slice.primary.main_title}
          className='font-ambit-regular text-6xl text-black max-w-[40ch] md:text-center'
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
  if(slice.variation === 'modern') {
    return(
      <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    className="mt-16">
      <RenderIdentifier />
     
       
        <RichText 
          text={slice.primary.main_title}
          className='font-ambit-regular text-3xl md:text-6xl   text-black md:max-w-[40%] md:text-start mt-16'
        />
      
      {
        width > 1200 ?
        <IconScrollShowcaseModernV2
          data={slice.primary.items}
        /> 
        :
        <IconScrollShowcaseDefaultV2 
          data={slice.primary.items}
        />
      }
    </section>
    )
  }
  if (slice.variation === 'modernWithButton') {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="mt-16 flex flex-col items-center "
      >
        <RenderIdentifier />
        {/* Render Different Components Based on Screen Size */}
        {width > 1200 ? (
          <IconScrollShowcaseModernV2 data={slice.primary.items} />
        ) : (
          <IconScrollShowcaseDefaultV2 data={slice.primary.items} />
        )}
  
        
        <Button prismicLink={slice.primary.cta_link}>
          {slice.primary.cta_text}
        </Button>
      </section>
    );
  }
  


  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <RenderIdentifier />
      <IconScrollShowcaseDefault 
        data={slice.primary.items}
      />
    </section>
  );
};

export default IconScrollShowcase;
