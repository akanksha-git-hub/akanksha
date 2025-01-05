import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
/**
 * @typedef {import("@prismicio/client").Content.ImpactShuffleSlice} ImpactShuffleSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImpactShuffleSlice>} ImpactShuffleProps
 * @param {ImpactShuffleProps}
 */
import ShuffleMix from '@/components/CardsShuffle/ShuffleMix';

const ImpactShuffle = async ({ slice }) => {
  const cardA = await fetchPrismicSingleDocument("impactcardshuffleone");
  const cardB = await fetchPrismicSingleDocument("impactcardshuffletwo");

  if (!cardA || !cardB) {
    console.error("Error fetching data: cardA or cardB is missing");
    return <p>No data found</p>;
  }

  const data = [cardA, cardB];
  console.log("Data passed to ShuffleMix:", data); // Debug log

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative"
    >
      <div className="text-center universal-padding">
        <h1 className="text-5xl md:text-8xl font-ambit-regular text-[#333333] md:mx-auto md:w-[8ch] w-[5ch]">
          {slice.primary.title}
        </h1>
        <p className="font-ambit text-2xl font-ambit-regular mt-4">
          {slice.primary.small_title}
        </p>
      </div>
      <div className="mt-8">
        <ShuffleMix slice={data} />
      </div>
    </section>
  );
};

export default ImpactShuffle;
