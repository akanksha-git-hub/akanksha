import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { createClient } from "@prismicio/client";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import Image from "next/image";
import Boat from "@/assets/boat.svg";
import SunCrow from "@/assets/sun-crow.svg";

export default async function Page() {
  const page = await fetchPrismicSingleDocument("timeline");

  if (!page) return <p>No page data!</p>;

  return (
    <main className={`${maxwidth} relative`}>
      {/* <div className="orange-gradient absolute -top-28 left-0 h-96 w-full -z-10" /> */}
      <div className="flex flex-col items-center justify-center universal-padding">
        <RichText
          text={page.data.title}
          className="text-black font-ambit-regular  text-3xl md:text-6xl w-full 950px:w-[10ch] text-center mb-24 mt-6"
        />
        <TempFillImageComponent
          src={Boat}
          className="absolute top-[6%] left-0 lg:top-0 lg:left-[76%] h-24 w-24 lg:h-52 lg:w-52 -z-10"
        />
        <TempFillImageComponent
          src={SunCrow}
          className="absolute -top-10 right-6 lg:top-0 lg:left-[6%] h-24 w-24 lg:h-52 lg:w-52 -z-10"
        />
        <div className="text-black sm:text-xl 3xl:text-2xl font-ambit-regular text-base text-center w-full 950px:w-[90%] 950px:max-w-[1400px] relative">
          <PrismicRichText field={page.data.descriptions} />
        </div>
      </div>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}

function TempFillImageComponent({ src, className }) {
  /* 
      TempFillImageComponent div must have absolute class to be used in relative to any other parent div 
    */

  return (
    <div className={className}>
      <div className="relative h-full w-full">
        <Image src={src} fill alt="image" />
      </div>
    </div>
  );
} // TODO convert as required later

// export async function generateMetadata() {
//     const client = createClient();
//     const page = await client.getSingle("timeline");

//     return {
//       title: page.data.meta_title,
//       description: page.data.meta_description,
//     };
//   }
