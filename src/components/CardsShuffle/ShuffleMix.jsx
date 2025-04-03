"use client";

import CardsShuffle from "./CardsShuffle";
import CardA from "@/components/v2-components/impact-card-shuffle/CardA";
import CardB from "@/components/v2-components/impact-card-shuffle/CardB";

export default function ShuffleMix({ slice, uniquePrefix = "shuffle-default" }) {
  return (
    <CardsShuffle slice={slice} uniquePrefix={uniquePrefix}>
      <CardsShuffle.ItemContainer
        itemsContainerClassName="card-container mx-auto"
        itemClassName="pers-cards"
        itemKeyFn={(item, index) => index}
        uniquePrefix={uniquePrefix}
      >
        {(item) => {
          switch (item.type) {
            case "impactcardshuffleone":
              return <CardA item={item} />;
            case "impactcardshuffletwo":
              return <CardB item={item} />;
            default:
              return null;
          }
        }}
      </CardsShuffle.ItemContainer>
    </CardsShuffle>
  );
}
