'use client'

import useDebouncedResize from "@/hooks/useDebouncedResize"
import CardsThreeDesktop from "./CardsThreeDesktop";
import CardsThreeMobile from "./CardsThreeMobile";

export default function CardsContainer({ cards }) {

    const { width } = useDebouncedResize();

  return (
    <>
    {
        width > 100 ?
        <CardsThreeDesktop 
            cards={cards}
        />
        :
        <CardsThreeMobile 
            cards={cards}
        />
    }
    </>
  )
}
