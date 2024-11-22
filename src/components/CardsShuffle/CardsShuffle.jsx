import CardShuffle from "@/slices/CardShuffle";
import { createContext, useContext, useRef } from "react"
import CardsShuffleItemContainer from "./CardsShuffleItemContainer";
import CardShuffleA from "./CardShuffleA";


const CardsShuffleContext = createContext({
    slice: []
});


export function useCardsShuffleContext() {

    const ctx = useContext(CardsShuffleContext);

    if(!ctx) throw new Error('Can only be used under <CardsShuffle>');

    return ctx;

}

export default function CardsShuffle({ children, slice, className }) {

    const ctxValue = { slice };

  return (
    <CardsShuffleContext.Provider value={ctxValue}>
        <div className={className}>
            {children}
        </div>
    </CardsShuffleContext.Provider>
  )
}

CardsShuffle.ItemContainer = CardsShuffleItemContainer;
CardsShuffle.CardShuffleA = CardShuffleA;
