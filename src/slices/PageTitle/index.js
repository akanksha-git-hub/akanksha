import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.PageTitleSlice} PageTitleSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PageTitleSlice>} PageTitleProps
 * @param {PageTitleProps}
 */
const PageTitle = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex flex-col items-center"
    >
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
      <div className="flex flex-col items-center universal-padding !pt-0 space-y-8">
        <RichText 
          text={slice.primary.title}
          className='text-deep-green font-ambit-regular text-7xl text-left md:text-center'
        />
        <div
          className="text-deep-green font-ambit-regular text-lg text-left md:text-center w-full 2xl:w-[120ch]"
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