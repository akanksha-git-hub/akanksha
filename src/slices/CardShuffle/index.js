import Shuffle from "@/components/CardsShuffle/Shuffle";
import ShuffleB from "@/components/CardsShuffle/ShuffleB";
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";

/**
 * @typedef {import("@prismicio/client").Content.CardShuffleSlice} CardShuffleSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CardShuffleSlice>} CardShuffleProps
 * @param {CardShuffleProps}
 */
const CardShuffle = ({ slice, context }) => {
  const { addPadding } = context;

  return (
    <>
      {slice.variation === "wihoutSliceIdentifierAndHead" && (
        <div className="lg:-mt-32 -mt-64">
          <Shuffle slice={slice.primary.items} className />
        </div>
      )}
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className="mb-64"
      >
        <div className={`${addPadding ? "universal-padding" : " "}`}>
          {slice.primary.slice_identifier && (
            <SliceIdentifier text={slice.primary.slice_identifier} />
          )}
        </div>
        <div className="font-ambit-regular mt-12 space-y-4">
          {slice.primary.heading_small && (
            <RichText
              text={slice.primary.heading_small}
              className="text-black text-3xl text-center flex items-center justify-center"
            />
          )}
          {slice.primary.heading_big && (
            <RichText
              text={slice.primary.heading_big}
              className="text-black  text-6xl text-center mx-auto max-w-[36ch]"
            />
          )}
        </div>
        {slice.variation === "default" && (
          <Shuffle slice={slice.primary.items} />
        )}
        {slice.variation === "optionB" && (
          <ShuffleB slice={slice.primary.items} />
        )}
      </section>
    </>
  );
};

export default CardShuffle;
