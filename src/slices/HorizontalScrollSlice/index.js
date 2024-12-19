import HorizontalScroll from "@/components/v2-components/horizontal-scroll/horizontal-scroll";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";

/**
 * @typedef {import("@prismicio/client").Content.HorizontalScrollSliceSlice} HorizontalScrollSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HorizontalScrollSliceSlice>} HorizontalScrollSliceProps
 * @param {HorizontalScrollSliceProps}
 */
const HorizontalScrollSlice = async ({ slice }) => {

  const cardA = (await fetchPrismicSingleDocument("horizontal_scroll_card_a")).data;
  const cardB = (await fetchPrismicSingleDocument("horizontal_scroll_card_b")).data;
  const cardC = (await fetchPrismicSingleDocument("horizontal_scroll_card_c")).data;

  if(!cardA || cardB || cardC) return <p>No data found</p>;

  const data = [
    cardA,
    cardB,
    cardC
  ];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >

      {/* Render title, image above h-scroll component */}

      {/*  */}

      <HorizontalScroll 
        data={data}
      />
    </section>
  );
};

export default HorizontalScrollSlice;
