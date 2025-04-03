"use client";

import CardsShuffle from "./CardsShuffle";
import CardsShuffleItemContainer from "./CardsShuffleItemContainer";
import HorizontalScrollCardC from "../v2-components/horizontal-scroll/horizontal-scroll-card-C";
import HorizontalScrollCardD from "../v2-components/horizontal-scroll/horizontal-scroll-card-D";

export default function ShuffleMixVariation({ slice, uniquePrefix = "shuffle-variation" }) {
  return (
    <CardsShuffle slice={slice} uniquePrefix={uniquePrefix}>
      <CardsShuffleItemContainer
        itemsContainerClassName="card-container mx-auto"
        itemClassName="pers-cards"
        itemKeyFn={(item, index) => index}
        uniquePrefix={uniquePrefix} // 🔥 important
      >
        {(item) => {
          switch (item.type) {
            case "horizontal_scroll_card_c":
              return <HorizontalScrollCardC item={item} />;
            case "horizontalcardd":
              return <HorizontalScrollCardD item={item} />;
            default:
              return null;
          }
        }}
      </CardsShuffleItemContainer>
    </CardsShuffle>
  );
}
