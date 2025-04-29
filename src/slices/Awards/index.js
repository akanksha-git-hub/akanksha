import AwardsList from "@/components/AwardsList";

/**
 * @typedef {import("@prismicio/client").Content.AwardsSlice} AwardsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AwardsSlice>} AwardsProps
 * @param {AwardsProps}
 */
const Awards = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <AwardsList awards={slice.primary.awards} />
    </section>
  );
};

export default Awards;
