import BlogInfo from "@/components/BlogInfo";
import RichText from "@/components/Texts/RichText";
import { createClient } from "@/prismicio";
import { maxwidth } from "@/utils/helperClasses";
import { PrismicNextImage } from "@prismicio/next";
import { notFound } from "next/navigation";
import ResourcesCardItemSingle from "@/components/Resources/ResourcesCardItemSingle";
import PrimaryCTA from "@/components/UI/Button/PrimaryCTA";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import Button from "@/components/v2-components/buttons/button";

async function BlogData() {
  const showcasePage = await fetchPrismicSingleDocument("blog_showcase_page");
  if (!showcasePage)
    return <div className="universal-padding text-center">No data found</div>;

  const blogRecentsSlice = showcasePage.data.slices.find(
    (slice) => slice.slice_type === "blog_recents"
  );
  const blogCategoryItemsSlice = showcasePage.data.slices.find(
    (slice) => slice.slice_type === "blog_category_items"
  );

  const hasBlogRecents = blogRecentsSlice.primary.card_items.length > 0;
  const hasBlogCategoryItems =
    blogCategoryItemsSlice.primary.card_items.length > 0;

  const selectedSlice = hasBlogRecents
    ? blogRecentsSlice
    : hasBlogCategoryItems
      ? blogCategoryItemsSlice
      : null;

  let blogData;
  if (selectedSlice?.primary?.card_items?.length < 3) {
    blogData = selectedSlice.primary.card_items.slice(
      0,
      selectedSlice.primary.card_items.length
    );
  } else {
    blogData = selectedSlice.primary.card_items.slice(0, 3);
  }
  return (
    <>
      <div className="flex justify-start md:justify-end lg:justify-end pr-24">
        {/* <PrimaryCTA
          text={"View All"}
          href="/resources/blogs"
          className="!px-12 !py-2 "
        /> */}
        <Button href="/resources/blogs">View All</Button>
      </div>
      <div className="universal-padding flex flex-col space-y-12">
        <ResourcesCardItemSingle data={blogData} />
      </div>
    </>
  );
}

export default async function Page({ params }) {
  const client = createClient();
  const page = await client
    .getByUID("blog_child_page", params.uid)
    .catch(() => notFound());

  return (
    <>
      <main className={`${maxwidth} universal-padding bg-white`}>
        <div className="mt-12 space-y-4 flex flex-col items-center justify-center">
          <RichText
            text="October 20, 2024"
            className="font-ambit-semibold text-black text-3xl grid place-content-center"
          />
          <RichText
            text={page.data.title}
            className="font-ambit-regular text-black text-6xl text-center w-[90%] 2xl:w-[28ch] grid place-content-center mx-auto"
          />
          <div className="w-[50%] xl:w-[800px] h-auto !mt-12">
            <PrismicNextImage
              className="h-full w-full object-cover"
              field={page.data.image}
              alt=""
            />
          </div>
        </div>
      </main>
      <div className="mt-12 bg-off-white px-6">
        <BlogInfo data={page.data.items} />
      </div>

      <BlogData />
    </>
  );
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("blog_child_page");

  return pages.map((page) => {
    return { uid: page.uid };
  });
}
