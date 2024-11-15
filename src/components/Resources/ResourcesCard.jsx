'use client'

import { createContext, useContext, useState } from "react"
import ResourcesEyebrow from "./ResourcesEyebrow";
import ResourcesCardItemsContainer from "./ResourcesCardItemsContainer";
import ResourcesCardItemA from "./ResourcesCardItemA";

const ResourceCardContext = createContext();

export function useResourcesCardContext () {
  const ctx = useContext(ResourceCardContext);

  if(!ctx) throw new Error('Can only be used under <ResourcesCardWrapper>');

  return ctx;

}

export default function ResourcesCard({ children, slice, className }) {

  const [trackPagination, setTrackPagination] = useState(null);

  const ctxValues = { slice }

  return (
    <ResourceCardContext.Provider value={ctxValues}>
      <ul className={`${className} space-y-12`}>
        {children}
      </ul>
    </ResourceCardContext.Provider>
  )
}

ResourcesCard.Eyebrow = ResourcesEyebrow;
ResourcesCard.ItemsContainer = ResourcesCardItemsContainer;
ResourcesCard.ItemA = ResourcesCardItemA;





