import SliceIdentifier from "@/components/SliceIdentifier";
import MixedText from "@/components/Texts/MixedText";
import RichText from "@/components/Texts/RichText";
import { spanPosition } from "@/utils/helperClasses";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.PageTitleSlice} PageTitleSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PageTitleSlice>} PageTitleProps
 * @param {PageTitleProps}
 */
const PageTitle = ({ slice }) => {


  if(slice.variation === 'optionC') {

    return(
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="my-12 space-y-16"
      >
        <SliceIdentifier 
          text={slice.primary.slice_identifier}
        />
        <div className="space-y-6">
          <MixedText 
            index={5}
            texts={slice.primary.title}
            className='font-ambit-regular text-deep-green text-5xl text-left md:text-center max-w-[40ch] mx-auto md:justify-center'
            spanPosition='top-2 sm:top-[6px]'
          />
          <RichText 
            text={slice.primary.description}
            className='font-ambit-regular text-deep-green text-lg md:text-center max-w-[80ch] mx-auto'
          />
        </div>
      </section>
    )

  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={`flex flex-col items-center ${slice.variation === 'default' && ('universal-padding mt-24')}`}
    >
      {slice.variation === 'sparkle' && (
        <div 
          className="flex items-center justify-center w-full md:w-[50vw] max-w-[650px] relative left-0 md:left-16"
        >
          <PrismicNextImage 
            field={slice.primary.image}
            height={100}
            width={100}
            className="h-full w-full"
          />
        </div>
      )}
      <div className={`flex flex-col items-center ${slice.variation === 'sparkle' && ('universal-padding')} !pt-0 space-y-8`}>
        <RichText 
          text={slice.primary.title}
          className={`text-deep-green font-ambit-regular text-7xl ${slice.variation === 'sparkle' ? 'text-left' : 'text-center'} md:text-center w-full sm:w-[70%]`}
        />
        <div
          className={`text-deep-green font-ambit-regular text-lg text-left md:text-center ${slice.variation === 'default' ? 'w-full lg:w-[70%] xl:w-[70ch]' : 'w-full lg:w-[80%] 3xl:w-[110ch]'}`}
        >
          <PrismicRichText 
            field={slice.primary.description}
          />
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
