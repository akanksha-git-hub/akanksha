import CardsContainer from "@/components/Cards/CardsContainer";
import CardsTwoContainer from "@/components/Cards/CardsTwoContainer";
import CardsTwoContainerB from "@/components/Cards/CardsTwoContainerB";
import CardsTwoContainerC from "@/components/Cards/CardsTwoContainerC";
import SliceIdentifier from "@/components/SliceIdentifier";
import RichText from "@/components/Texts/RichText";
import { PrismicNextImage } from "@prismicio/next";
import Image from "next/image";

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

  if(slice.variation === "optionC") {
    cards = [
      {
        title: slice.primary.card_a_title,
        desc: slice.primary.card_a_description
      },
      {
        title: slice.primary.card_b_title,
        desc: slice.primary.card_b_description
      },
    ]
  }
  if(slice.variation === "optionD") {
    cards = [
      {
        title: slice.primary.card_a_title,
        desc: slice.primary.card_a_description,
        left_asset: slice.primary.left_asset,
        left_shading : slice.primary.left_shading,
        sparkles_left :slice.primary.sparkles_left,
        card_image : slice.primary.card_a_image,
       
      },
      {
        title: slice.primary.card_b_title,
        desc: slice.primary.card_b_description,
        right_asset: slice.primary.left_asset,
        right_shading : slice.primary.left_shading,
        sparkles_right : slice.primary.sparkles_right,
        card_image : slice.primary.card_b_image,
      },
    ]
  }
  if (slice.variation === "withUnderline") {
    
  cards = [
    {
      title: slice.primary.card_a_title,
      desc: slice.primary.card_a_description,
      sparkles_left: slice.primary.sparkles_left,
      left_shading: slice.primary.left_shading,
      card_image: slice.primary.card_a_image,
      left_asset: slice.primary.left_asset,
    },
    {
      title: slice.primary.card_b_title,
      desc: slice.primary.card_b_description,
      sparkles_right: slice.primary.sparkles_right,
      right_shading: slice.primary.left_shading,
      card_image: slice.primary.card_b_image,
      right_asset: slice.primary.left_asset,
    },
  ];
  }

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="relative mt-16"
    >
      <SliceIdentifier text={slice.primary.slice_identifier}  />

      {slice.variation !== "withUnderline" && (
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between space-y-2 xl:space-y-0 xl:space-x-4 mt-8 md:mt-12">
          <RichText
            text={slice.primary.title}
            className="text-black font-ambit-regular text-6xl text-left xl:text-center mt-8"
          />
          <RichText
            text={slice.primary.description}
            className="text-black font-ambit-regular text-[1.35rem] md:text-left max-w-[50ch]  pt-8 "
          />
        </div>
      )}

      {slice.variation === "withUnderline" && (
        <div className="flex flex-col xl:flex-row items-center space-y-6">
          {/* Title and Description on the Left */}
          <div className="w-full xl:w-[50%] space-y-6">
            <RichText
              text={slice.primary.title}
              className="text-black font-ambit-regular text-8xl text-left  xl:text-center"
            />
            <Image
  src="/underline-orange.svg"
  height={20}
  width={20}
  alt=""
  className="w-[80%]  md:w-[80%] lg:w-[50%] xl:w-full mt-4"
  style={{
    filter:
      "brightness(0) saturate(100%) invert(54%) sepia(100%) saturate(900%) hue-rotate(-10deg) brightness(100%) contrast(95%)",
  }}
/>

            <RichText
              text={slice.primary.description}
              className="text-black font-ambit-regular text-xl"
            />
          </div>

          {/* Cards on the Right */}
          <div className="w-full xl:w-[100%]">
            <CardsTwoContainerC cards={cards} />
          </div>
        </div>
      )}

      {slice.variation === "default" && <CardsContainer cards={cards} />}
      {slice.variation === "optionB" && <CardsTwoContainer data={cards} />}
      {slice.variation === "optionC" && <CardsTwoContainerB data={cards} />}
      {slice.variation === "optionD" && <CardsTwoContainerB data={cards} />}
    </section>
  );
};

export default Cards;
