import React from 'react'
import { useResourcesCardContext } from './ResourcesCard'

export default function ResourcesCardItemsContainer({ children, itemKeyFn}) {

  const { slice } = useResourcesCardContext();

  let shaveSlice = slice.primary.card_items;

  if(shaveSlice.length > 3) shaveSlice = slice.primary.card_items.slice(0, 12);

  return (
    <>
      {shaveSlice.map(item => (
        <li key={itemKeyFn(item)}>
          {children(item)}
        </li>
      ))}
    </>
  )
}
