import { createContext, createRef, useContext, useRef } from "react"
import CardsShuffleItemContainer from "./CardsShuffleItemContainer";
import CardShuffleA from "./CardShuffleA";
import CardShuffleB from "./CardShuffleB";


const CardsShuffleContext = createContext({
    slice: [],
    lottieRefs: {}
});


export function useCardsShuffleContext() {

    const ctx = useContext(CardsShuffleContext);

    if(!ctx) throw new Error('Can only be used under <CardsShuffle>');

    return ctx;

}

export default function CardsShuffle({ children, slice, className, isLottie }) {

    // if component has Lottie
    let i = 0;
    let lottieItemsArray = [];
    let lottieRefs = useRef(lottieItemsArray);

    if(isLottie) {

        for(i; i<= slice.length; i++) {
            lottieItemsArray.push(i);
        }

        lottieRefs.current = lottieItemsArray.map(
            (ref, index) => lottieRefs.current[index] = createRef()
        )

    }



    const ctxValue = { slice, lottieRefs };


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
CardsShuffle.CardShuffleB = CardShuffleB;
