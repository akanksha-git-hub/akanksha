import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
/**
 * @typedef {import("@prismicio/client").Content.ImpactShuffleSlice} ImpactShuffleSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImpactShuffleSlice>} ImpactShuffleProps
 * @param {ImpactShuffleProps}
 */
import ShuffleMix from "@/components/CardsShuffle/ShuffleMix";
import ShuffleMixVariation from "@/components/CardsShuffle/ShuffleMixVariation"; // ✅ Import variation

const ImpactShuffle = async ({ slice }) => {
  const cardA = await fetchPrismicSingleDocument("impactcardshuffleone");
  const cardB = await fetchPrismicSingleDocument("impactcardshuffletwo");
  const cardC = await fetchPrismicSingleDocument("horizontalcardd");
  const cardD = await fetchPrismicSingleDocument("horizontal_scroll_card_c");
  const thirdCard = await fetchPrismicSingleDocument("thirdcard10th");
  const thirdCard12th = await fetchPrismicSingleDocument("thirdcard12th");

  if (!cardA || !cardB || !cardC || !cardD || !thirdCard) {
    console.error("Error fetching one or more card data");
    return <p>No data found</p>;
  }

  // Variation Handling
  let data = [];
  let uniquePrefix = "shuffle-default";
  let RenderComponent = ShuffleMix;

  switch (slice.variation) {
    case "impactShuffle1":
      data = [cardC, cardD, thirdCard12th];
      uniquePrefix = "shuffle-2";
      RenderComponent = ShuffleMixVariation; // ✅ Use variation component
      break;
    case "default":
    default:
      data = [cardA, cardB, thirdCard];
      uniquePrefix = "shuffle-1";
      RenderComponent = ShuffleMix;
      break;
  }

  return (
    <section
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
    className={`relative ${slice.variation === "impactShuffle1" ? "mt-64" : ""}`}
  >
  
      <div className="text-center universal-padding">
        <h1 className="text-3xl md:text-6xl font-ambit-regular text-black md:mx-auto md:w-[8ch] w-[5ch]">
          {slice.primary.title}
        </h1>
        <p className="font-ambit text-2xl md:text-4xl font-ambit-regular mt-8">
          {slice.primary.small_title}
        </p>
      </div>

      <div className="mt-0">
        <RenderComponent slice={data} uniquePrefix={uniquePrefix} />
      </div>
    </section>
  );
};

export default ImpactShuffle;
