'use client'
import CardsShuffle from './CardsShuffle';

export default function Shuffle({ slice }) {
  return (
    <CardsShuffle slice={slice}>
        <CardsShuffle.ItemContainer 
            itemsContainerClassName="card-container mx-auto"
            itemClassName="bg-deep-green pers-cards p-8 rounded-[10px]"
            itemKeyFn={(item, index) => index}
        >
            {(item, index) => <CardsShuffle.CardShuffleA item={item} index={index} />}
        </CardsShuffle.ItemContainer>
    </CardsShuffle>
  )
}
