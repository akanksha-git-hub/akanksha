'use client'
import SliceIdentifier from "@/components/SliceIdentifier";
import MixedText from "@/components/Texts/MixedText";
import RichText from "@/components/Texts/RichText";
import PrimaryCTA from "@/components/UI/Button/PrimaryCTA";
import useDebouncedResize from "@/hooks/useDebouncedResize";
import { PrismicNextImage } from "@prismicio/next";
import { useState } from "react";


/**
 * @typedef {import("@prismicio/client").Content.TiltedCardsSlice} TiltedCardsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TiltedCardsSlice>} TiltedCardsProps
 * @param {TiltedCardsProps}
 */
const TiltedCards = ({ slice }) => {

  const tiltedCard = [
    {
      image: slice.primary.card_a_image,
      stat_number: slice.primary.card_a_stat_number,
      stat_description: slice.primary.card_a_stat_description
    },
    {
      image: slice.primary.card_b_image,
      stat_number: slice.primary.card_b_stat_number,
      stat_description: slice.primary.card_b_stat_description
    },
    {
      image: slice.primary.card_c_image,
      stat_number: slice.primary.card_c_stat_number,
      stat_description: slice.primary.card_c_stat_description
    },
  ];

  const [active, setActive] = useState(1);

  const handleMouseEnter = (i) => setActive(() => i);

  const { width } = useDebouncedResize();
  
  let sizeCheck = width > 1000;

  let cardAClassName = "1000pixel:absolute 1000pixel:-top-12 1000pixel:-left-[320px] xl:-left-[400px] 1000pixel:rotate-[-6deg]";
  let cardBClassName = "1000pixel:rotate-[4deg]";
  let cardCClassName = "1000pixel:absolute 1000pixel:-top-12 1000pixel:-right-[320px] xl:-right-[400px] 1000pixel:rotate-[-6deg]";

  const defaultVariation = slice.variation === 'default';
  const variationB = slice.variation === 'tiltedCardsB';
  const variationC = slice.variation === 'tiltedCardsNoTitle';

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="universal-padding mt-0 md:mt-12"
    >
      <SliceIdentifier 
        text={slice.primary.slice_identifier}
      />
      <div className="flex flex-col items-center justify-center mt-12">
        {variationB &&
          <div className="w-full">
            <RichText 
              text={slice.primary.title}
              className="text-deep-green font-ambit-regular text-7xl text-left w-full lg:w-[12ch] leading-[100%]"
            />
          </div>
        }
        {defaultVariation&& (
          <MixedText 
            index={1}
            texts={slice.primary.title}
            className="text-deep-green flex items-center justify-center font-ambit-regular text-7xl text-center w-full lg:w-[10ch]"
            spanPosition="top-2 sm:top-3"
          />
        )}
        {tiltedCard && (
          <ul className="mt-12 sm:mt-20 flex flex-wrap items-center justify-center gap-4 relative">
            {tiltedCard.map((item, index) => (
              <li 
                key={item.stat_number}
                onMouseEnter={() => handleMouseEnter(index)}
                className={`
                  p-2 grid place-items-center place-content-center w-full min-h-[300px] gap-12 sm:w-[300px] sm:min-h-[300px] xl:w-[350px] xl:min-h-[350px] 2xl:w-[380px] 2xl:h-[380px] rounded-xl custom-bezier
                  ${sizeCheck ? (`${active === index ? 'bg-bright-yellow z-20' : 'border border-deep-green z-10'}`) : 'bg-bright-yellow'}
                  ${(index === 0) && (cardAClassName)}
                  ${(index === 2) && (cardCClassName)}
                  ${(index === 1) && (cardBClassName)}
                `}
              >
                <div className="h-[80px] w-[80px] xl:h-[120px] xl:w-[120px] flex items-center justify-center bg-gray-400 border border-black rounded-full">
                  <PrismicNextImage 
                    field={item.image}
                    className="h-full w-full z-20 rounded-full object-cover"
                    height={100}
                    width={100}
                  />
                </div>
                <div className="grid place-items-center place-content-center space-y-3">
                  <RichText 
                    text={item.stat_number}
                    className="text-deep-green font-playfair-display text-6xl"
                  />
                  <RichText 
                    text={item.stat_description}
                    className="text-black font-ambit-regular text-xl text-center flex items-center justify-center"
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
        {variationC && ( <PrimaryCTA className='mt-16' link={slice.primary.cta_link} text={slice.primary.cta_text} />)}
      </div>
    </section>
  );
};

export default TiltedCards;
