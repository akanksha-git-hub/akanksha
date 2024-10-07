import Donation from "@/components/Donation";

/**
 * @typedef {import("@prismicio/client").Content.DonationSliceSlice} DonationSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<DonationSliceSlice>} DonationSliceProps
 * @param {DonationSliceProps}
 */
const DonationSlice = async ({ slice }) => {

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding"
    >
      <Donation />
    </section>
  );
};

export default DonationSlice;
