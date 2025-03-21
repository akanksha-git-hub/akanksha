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
  const { show_identifier, slice_identifier } = slice.primary;
    
      const RenderIdentifier = () =>
        show_identifier && <SliceIdentifier text={slice_identifier} />;

  return (
    <>
      {slice.variation === "wihoutSliceIdentifierAndHead" && (
        <div className="lg:-mt-32 -mt-64 ">
          <Shuffle slice={slice.primary.items} className />
        </div>
      )}
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className=" mb-56 lg:mb-64"
      >
        <div className={`${addPadding ? "universal-padding" : " "} `}>
          {slice.primary.slice_identifier && (
            <RenderIdentifier />
          )}
        </div>
        {(slice.primary.heading_small?.length > 0 ||
          slice.primary.heading_big?.length > 0) && (
          <div className="font-ambit-regular mt-12 space-y-4">
            {slice.primary.heading_small?.length > 0 && (
              <RichText
                text={slice.primary.heading_small}
                className="text-black text-3xl text-center flex items-center justify-center"
              />
            )}
            {slice.primary.heading_big?.length > 0 && (
              <RichText
                text={slice.primary.heading_big}
                className="text-black text-6xl text-center mx-auto max-w-[36ch]"
              />
            )}
          </div>
        )}

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
