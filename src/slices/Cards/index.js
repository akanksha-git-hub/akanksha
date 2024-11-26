import CardsContainer from "@/components/Cards/CardsContainer";
import CardsTwoContainer from "@/components/Cards/CardsTwoContainer";
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";

/**
 * @typedef {import("@prismicio/client").Content.CardsSlice} CardsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CardsSlice>} CardsProps
 * @param {CardsProps}
 */
const Cards = ({ slice }) => {

  let cards = [];

  if(slice.variation === 'default') {
    cards = [
      {
        title: slice.primary.card_a_title,
        desc: slice.primary.card_a_description,
        image: slice.primary.card_a_image
      },
      {
        title: slice.primary.card_b_title,
        desc: slice.primary.card_b_description,
        image: slice.primary.card_b_image
      },
      {
        title: slice.primary.card_c_title,
        desc: slice.primary.card_c_description,
        image: slice.primary.card_c_image
      }
    ];
  }

  if(slice.variation === "optionB") {
    cards = [
      {
        title: slice.primary.card_a_title,
        rich_text: slice.primary.card_a_richtext,
        image: slice.primary.card_a_image
      },
      {
        title: slice.primary.card_b_title,
        rich_text: slice.primary.card_b_richtext,
        image: slice.primary.card_b_image
      },
    ]
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <SliceIdentifier 
        text={slice.primary.slice_identifier}
        className='mb-16'
      />
      <div className="flex flex-col md:items-center md:justify-center space-y-2">
        <RichText 
          text={slice.primary.title}
          className='text-deep-green font-ambit-regular text-5xl md:text-center'
        />
        <RichText 
          text={slice.primary.description}
          className='text-deep-green font-ambit-regular text-xl md:text-center max-w-[50ch]'
        />
      </div>
      {slice.variation === "default" && (
        <CardsContainer 
          cards={cards}
        />
      )}
      {slice.variation === "optionB" && (
        <CardsTwoContainer 
          data={cards}
        />
      )}
    </section>
  );
};

export default Cards;
