import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";

export default async function Page() {
  const page = await fetchPrismicSingleDocument("award");

  if (!page) return <p>No page data!</p>;

  return (
    <main className={`${maxwidth} universal-padding `   }>
 

      {/* Side assets + award list */}
      <div className="relative flex flex-row items-center justify-center mt-8">
        {/* Left Image */}
        {page.data.left_asset?.url && (
          <img
            src={page.data.left_asset.url}
            alt={page.data.left_asset.alt || "Left asset"}
            className="w-32 md:w-48 object-contain"
          />
          
        )}
          <h1 className="text-3xl md:text-7xl font-ambit-regular w-[15ch] text-center ">
        <PrismicRichText field={page.data.heading} />
      </h1>
         {page.data.right_asset?.url && (
          <img
            src={page.data.right_asset.url}
            alt={page.data.right_asset.alt || "Right asset"}
            className="w-32 md:w-48 object-contain"
          />
        )}
      </div>

      <SliceZone slices={page.data.slices} components={components} />
    </main>
  );
}
