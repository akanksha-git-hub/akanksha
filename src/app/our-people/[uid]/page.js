import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import RichText from "@/components/Texts/RichText";
import Image from "next/image";
import { PrismicNextImage } from "@prismicio/next";

export default async function Page({ params }) {
  const client = createClient();
  const page = await client
    .getByUID("our_people", params.uid)
    .catch(() => notFound());
   
  return (
 
    
    <main className={`${maxwidth} universal-padding  mb-12 relative overflow-hidden`}>
 <div className="flex items-center justify-center gap-2 md:gap-10 mb-10">
  {/* Left Side Image */}
  {page.data.left_image?.url && (
    <PrismicNextImage 
      field={page.data.left_image}
      className="w-24 h-auto md:w-60"
    />
  )}

  {/* Title */}
  <RichText 
      text={page.data.title}
      className="flex items-center justify-center text-black   text-4xl
              sm:text-6xl  xl:text-7xl  3xl:text-8xl !mt-[5rem] !mb-12  "
    />

  {/* Right Side Image */}
  {page.data.right_image?.url && (
    <PrismicNextImage 
      field={page.data.right_image}
      className="w-24 h-auto md:w-60"
    />
  )}
</div>


    {/* Slice Content */}
    <SliceZone slices={page.data.slices} context = {{id: page.uid}} components={components} />
  </main>
  );
}

// export async function generateMetadata({ params }) {
//   const client = createClient();
//   const page = await client
//     .getByUID("our_people", params.uid)
//     .catch(() => notFound());

//   return {
//     title: page.data.meta_title,
//     description: page.data.meta_description,
//   };
// }

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("our_people");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
