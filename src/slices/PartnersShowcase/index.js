'use client';

import PartnerLogo from "@/components/PartnerLogo";
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";
import MarqueeTypeA from "@/components/Marquee/MarqueeTypeA/MarqueeTypeA";

/**
 * @typedef {import("@prismicio/client").Content.PartnersShowcaseSlice} PartnersShowcaseSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PartnersShowcaseSlice>} PartnersShowcaseProps
 * @param {PartnersShowcaseProps} 
 */
const PartnersShowcase = ({ slice }) => {
  if (slice.variation === "withOutSliceIdentifier") {
    return (
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="universal-padding"
      >
        <div className="mt-4 flex flex-col lg:flex-row items-center justify-between w-full">
        
          {slice.primary.partner_logos.length > 0 && (
            <>
              <MarqueeTypeA 
                items={slice.primary.partner_logos}
                direction='marquee-items-slide-left'
              />
            
            </>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className=""
    >
          <div className="universal-padding">
              <SliceIdentifier 
                text={slice.primary.slice_identifier}
              />
            </div>

      <div className="mt-12 flex flex-col lg:flex-row items-center justify-between w-full">
        <RichText
          text={slice.primary.title}
          className="select-none text-black font-ambit-regular text-6xl sm:text-6xl md:text-7xl w-full text-left flex lg:w-[400px]"
        />
        {slice.primary.partner_logos.length > 0 && (
          <>
           
            <MarqueeTypeA 
              items={slice.primary.partner_logos}
              direction='marquee-items-slide-right'
            />
           
          </>
        )}
      </div>
    </section>
  );
};

export default PartnersShowcase;