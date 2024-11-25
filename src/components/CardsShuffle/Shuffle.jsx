'use client'
import CardsShuffle from './CardsShuffle';

export default function Shuffle({ slice }) {
  return (
    <CardsShuffle slice={slice}>
        <CardsShuffle.ItemContainer 
            itemsContainerClassName="card-container mx-auto"
            itemClassName='pers-cards'
            itemKeyFn={(item, index) => index}
        >
            {(item) => <CardsShuffle.CardShuffleA item={item} />}
        </CardsShuffle.ItemContainer>
    </CardsShuffle>
  )
}
