'use client'
import useDebouncedResize from "@/hooks/useDebouncedResize";
import CardsTwoDesktopB from "./CardsTwoDesktopB";
import CardsTwoMobileB from "./CardsTwoMobileB";

export default function CardsTwoContainerB({ data }) {

    const { width } = useDebouncedResize();

  return (
    <>
    {
        width > 1000 ?
        <CardsTwoDesktopB 
            data={data}
        />
        :
        <CardsTwoMobileB 
            data={data}
        />
    }
    </>
  )
}
