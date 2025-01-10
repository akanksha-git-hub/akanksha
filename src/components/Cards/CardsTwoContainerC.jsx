'use client'
import useDebouncedResize from "@/hooks/useDebouncedResize";
import CardsTwoDesktopC from "./CardsTwoDesktopC";
import CardsTwoMobileC from "./CardsTwoMobileC";

export default function CardsTwoContainerC({ data }) {

    const { width } = useDebouncedResize();

  return (
    <>
    {
        width > 1000 ?
        <CardsTwoDesktopC
            data={data}
        />
        :
        <CardsTwoMobileC
            data={data}
        />
    }
    </>
  )
}
