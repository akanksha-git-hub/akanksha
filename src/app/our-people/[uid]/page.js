import { notFound } from "next/navigation";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import RichText from "@/components/Texts/RichText";

export default async function Page({ params }) {
  const client = createClient();
  const page = await client
    .getByUID("our_people", params.uid)
    .catch(() => notFound());

  return (
    <main className={`${maxwidth} universal-padding space-y-12 mb-12`}>
      <RichText 
          text={page.data.title}
          className="flex items-center md:justify-center text-deep-green text-7xl mt-16"
      />
      <SliceZone slices={page.data.slices} components={components} />
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
