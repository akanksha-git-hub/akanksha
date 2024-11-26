'use client'

import useDebouncedResize from "@/hooks/useDebouncedResize"
import CardsTwoDesktop from "./CardsTwoDesktop";
import CardsTwoMobile from "./CardsTwoMobile";

export default function CardsTwoContainer({ data }) {

    const { width } = useDebouncedResize();

  return (
    <div className="mt-12">
        {
            width > 1000 ?
            <CardsTwoDesktop 
                data={data}
            />
            :
            <CardsTwoMobile 
                data={data}
            />
        }
    </div>
  )
}
