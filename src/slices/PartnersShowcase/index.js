import PartnerLogo from "@/components/PartnerLogo";
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";

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
      className="universal-padding "
    >
    <div className="mt-12 flex flex-col lg:flex-row items-center justify-between w-full ">
      <RichText 
        text={slice.primary.title}
        className="select-none text-deep-green font-ambit-regular text-6xl sm:text-6xl md:text-7xl w-full text-center lg:text-left flex items-center justify-center lg:w-[400px]"
      />
      {slice.primary.partner_logos.length > 0 && (
        <ul className="flex items-center justify-center sm:justify-center lg:justify-end flex-wrap gap-2 w-full lg:w-[60%] mt-12 lg:mt-0">
          {slice.primary.partner_logos.map(logo => (
            <PartnerLogo 
              imageClassName="h-full w-full object-contain"
              className="select-none !h-[100px] md:h-[80px] w-[30%] sm:w-[40%] md:w-[30%] lg:w-[40%] xl:w-[30%] border flex items-center justify-center border-[#DCDCDC]" 
              key={logo.partner_logo} 
              image={logo.partner_logo} 
            /> 
          ))}
        </ul>
      )}
      </div>
    </section>
    
    );
  }

  
  return (
    <>
  
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding  ">

        
         <SliceIdentifier text={slice.primary.slice_identifier} />
      
      <div className="mt-12 flex flex-col lg:flex-row items-center justify-between w-full ">
      <RichText 
        text={slice.primary.title}
        className="select-none text-deep-green font-ambit-regular text-6xl sm:text-6xl md:text-7xl w-full text-center lg:text-left flex items-center justify-center lg:w-[400px]"
      />
      {slice.primary.partner_logos.length > 0 && (
        <ul className="flex items-center justify-center sm:justify-center lg:justify-end flex-wrap gap-2 w-full lg:w-[60%] mt-12 lg:mt-0">
          {slice.primary.partner_logos.map(logo => (
            <PartnerLogo 
              imageClassName="h-full w-full object-contain"
              className="select-none !h-[100px] md:h-[80px] w-[30%] sm:w-[40%] md:w-[30%] lg:w-[40%] xl:w-[30%] border flex items-center justify-center border-[#DCDCDC]" 
              key={logo.partner_logo} 
              image={logo.partner_logo} 
            /> 
          ))}
        </ul>
      )}
      </div>
    </section>
    </>
  );
};

export default PartnersShowcase;