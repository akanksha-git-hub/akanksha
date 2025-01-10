'use client'
import useDebouncedResize from "@/hooks/useDebouncedResize";
import CardsTwoDesktopC from "./CardsTwoDesktopC";
import CardsTwoMobileC from "./CardsTwoMobileC";

export default function CardsTwoContainerC({ cards }) {

    const { width } = useDebouncedResize();

  return (
    <>
    {
        width > 1400 ?
        <CardsTwoDesktopC
            cards={cards}
        />
        :
        <CardsTwoMobileC
            cards={cards}
        />
    }
    </>
  )
}
