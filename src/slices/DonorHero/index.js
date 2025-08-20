import ScrollText from "@/components/ScrollText";

/**
 * @typedef {import("@prismicio/client").Content.DonorHeroSlice} DonorHeroSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<DonorHeroSlice>} DonorHeroProps
 * @param {DonorHeroProps}
 */
const DonorHero = ({ slice }) => {

  let texts = slice.primary.points;

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding mb-64"
    >
      <ScrollText 
      asset_1 = {slice.primary.asset_1}
      asset_2 = {slice.primary.asset_2}
        title={slice.primary.title_new}
        prismicTexts={texts}
        
      />
    </section>
  );
};

export default DonorHero;
