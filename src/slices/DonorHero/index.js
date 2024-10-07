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
        title={slice.primary.title}
        prismicTexts={texts}
        image={slice.primary.points_image} 
      />
    </section>
  );
};

export default DonorHero;
