import HorizontalScroll from "@/components/v2-components/horizontal-scroll/horizontal-scroll";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { PrismicImage } from "@prismicio/react";

/**
 * @typedef {import("@prismicio/client").Content.HorizontalScrollSliceSlice} HorizontalScrollSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HorizontalScrollSliceSlice>} HorizontalScrollSliceProps
 * @param {HorizontalScrollSliceProps}
 */
const HorizontalScrollSlice = async ({ slice }) => {
  const cardA = await fetchPrismicSingleDocument("horizontal_scroll_card_a");
  const cardB = await fetchPrismicSingleDocument("horizontal_scroll_card_b");
  const cardC = await fetchPrismicSingleDocument("horizontal_scroll_card_c");
  if (!cardA || !cardB || !cardC) return <p>No data found</p>;

  const data = [cardA, cardB, cardC];

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative "
    >
      <div className="relative flex flex-col items-center text-center universal-padding ">
        <h1 className="text-8xl font-ambit-regular">{slice.primary.title}</h1>

        <p className="font-ambit text-3xl font-ambit-regular mt-4">
          {slice.primary.small_title}
        </p>
      </div>

      <div className="relative h-[160px] mb-12">
        <PrismicImage
          field={slice.primary.image}
          alt={slice.primary.image.alt || "Image"}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 max-w-[850px] "
        />
      </div>
      <HorizontalScroll data={data} />
    </section>
  );
};

export default HorizontalScrollSlice;
