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
        <div className="mt-4 flex flex-col lg:flex-row items-center justify-between w-full ">
          <RichText
            text={slice.primary.title}
            className="select-none text-black font-ambit-regular text-6xl sm:text-6xl md:text-7xl w-full text-left flex   lg:w-[400px]"
          />
          {slice.primary.partner_logos.length > 0 && (
            <ul className="flex items-center justify-center sm:justify-center lg:justify-end flex-wrap gap-2 w-full lg:w-[80%] mt-12 lg:mt-0 ">
              {slice.primary.partner_logos.map((logo) => (
                <PartnerLogo
                  imageClassName="h-full w-full object-contain p-4"
                  className="  select-none !h-[140px] md:h-[100px] w-[100%]  md:w-[50%] lg:w-[50%] xl:w-[40%] border flex items-center justify-center border-[#DCDCDC]"
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
        className="universal-padding  "
      >
        <SliceIdentifier text={slice.primary.slice_identifier} />

        <div className="mt-12 flex flex-col lg:flex-row items-center justify-between w-full ">
          <RichText
            text={slice.primary.title}
            className="select-none text-black font-ambit-regular text-6xl sm:text-6xl md:text-7xl w-full  text-left flex items-center justify-center lg:w-[400px]"
          />
          {slice.primary.partner_logos.length > 0 && (
            <ul className="flex items-center justify-center sm:justify-center lg:justify-end flex-wrap gap-2 w-full lg:w-[80%]  mt-12 lg:mt-0">
              {slice.primary.partner_logos.map((logo) => (
                <PartnerLogo
                  imageClassName="h-full w-full object-contain p-4"
                  className="select-none !h-[140px] md:h-[100px] w-[100%] md:w-[50%] lg:w-[50%] xl:w-[40%] border flex items-center justify-center border-[#DCDCDC]"
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
