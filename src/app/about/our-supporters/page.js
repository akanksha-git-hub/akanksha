import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { createClient } from "@prismicio/client";
import { SliceZone } from "@prismicio/react";
import Image from "next/image";

export default async function Page() {
  const page = await fetchPrismicSingleDocument("ourdonors");
  if (!page) return <p>No page data!</p>;

  return (
    <main className={`${maxwidth} universal-padding`}>
      <div className="relative ">
        <RichText
          className="text-black font-ambit-regular text-center text-5xl md:text-7xl mt-2 mb-16"
          text={page.data.title}
        />
        {/* <Image 
                    src='/sparkle_small.svg'
                    alt=""
                    height={30}
                    width={30}
                    className="absolute -right-12 md:-right-24 top-1/4 -translate-x-2/4"
                />
                <Image 
                    src='/sparkle_med.svg'
                    alt=""
                    height={100}
                    width={100}
                    className="absolute -right-44 md:-right-80 bottom-12 -translate-x-2/4"
                /> */}
      </div>
      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}

// export async function generateMetadata() {
//     const client = createClient();
//     const page = await client.getSingle("ourdonors");

//     return {
//       title: page.data.meta_title,
//       description: page.data.meta_description,
//     };
//   }
