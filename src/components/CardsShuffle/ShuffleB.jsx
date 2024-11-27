'use client'
import CardsShuffle from "./CardsShuffle";

export default function ShuffleB({ slice }) {
  return (
    <CardsShuffle 
        slice={slice}
        isLottie
    >
        <CardsShuffle.ItemContainer
            isLottie
            itemsContainerClassName="card-container mx-auto"
            itemClassName='pers-cards'
            itemKeyFn={(item, index) => index}            
        >
            {(item, index) => <CardsShuffle.CardShuffleB item={item} index={index} />}
        </CardsShuffle.ItemContainer>
    </CardsShuffle>
  )
}
