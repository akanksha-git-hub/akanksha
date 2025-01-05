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
            {(item, index) => <CardsShuffle.CardShuffleA item={item} index={index} />}
        </CardsShuffle.ItemContainer>
    </CardsShuffle>
  )
}
