'use client'
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { useSliceContext } from "./ClientSliceZoneContext";
import { useTagContext } from "../Tags/Tags";

export default function ClientSliceZoneItem({className}) {

    const { slices } = useSliceContext();
    const { activeTag } = useTagContext();

  return (

    <div className={className}>
      <SliceZone 
        components={components}
        slices={slices} 
        context={activeTag}
      />
    </div>

  )
}
