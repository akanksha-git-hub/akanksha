import Shuffle from "@/components/CardsShuffle/Shuffle";
import ShuffleB from "@/components/CardsShuffle/ShuffleB";
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";

/**
 * @typedef {import("@prismicio/client").Content.CardShuffleSlice} CardShuffleSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CardShuffleSlice>} CardShuffleProps
 * @param {CardShuffleProps}
 */
const CardShuffle = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="mb-64"
    >
      <SliceIdentifier 
        text={slice.primary.slice_identifier}
      />
      <div className="font-ambit-regular mt-12 space-y-4">
        <RichText 
          text={slice.primary.heading_small}
          className='text-deep-green text-3xl text-center flex items-center justify-center'
          />
        <RichText 
          text={slice.primary.heading_big}
          className='text-deep-green text-6xl text-center mx-auto max-w-[36ch]'
        />
      </div>
      {slice.variation === "default" && (
        <Shuffle 
          slice={slice.primary.items}
        />
      )}
      {slice.variation === "optionB" && (
        <ShuffleB 
          slice={slice.primary.items}
        />
      )}
    </section>
  );
};

export default CardShuffle;
