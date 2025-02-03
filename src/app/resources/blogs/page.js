import ClientSliceZoneContext from "@/components/ClientSliceZone/ClientSliceZoneContext";
import ClientSliceZoneItem from "@/components/ClientSliceZone/ClientSliceZoneItem";
import TagsContextWrapper from "@/components/Tags/TagsContextWrapper";
import TagsItems from "@/components/Tags/TagsItems";
import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { maxwidth } from "@/utils/helperClasses";
import { PrismicNextImage } from "@prismicio/next";

export default async function Page() {
  const page = await fetchPrismicSingleDocument("blog_showcase_page");
  if (!page) return <p>No page data!</p>;

  return (
    <main className={`${maxwidth} universal-padding `}>
    < div className="flex flex-row justify-center items-center  ">
                            {/* Left Image */}
                            <PrismicNextImage 
                                field={page.data.left_image} 
                                alt="Left Image"
                                className="hidden xl:block md:w-60 " // Adjust size as needed
                            />
                            <div className="flex flex-col items-center text-black">
                     <RichText 
                         text={page.data.title}
                         className={` font-ambit-regular text-7xl md:w-[12ch] text-left md:text-center  pt-24`}
                     />
                     <RichText 
                         text={page.data.description}
                         className='font-ambit-regular text-left md:text-center  text-base md:text-lg md:leading-7 w-[90%] md:w-[80%] md:mx-auto mt-6'
                     />
                     </div>
                 <PrismicNextImage
                              field={page.data.right_image} 
                              alt="Right Image"
                              className="hidden xl:block md:w-40  " 
                          />
                      </div>
      <TagsContextWrapper className="mt-12">
        <TagsItems tags={page.data.categories} />
        <ClientSliceZoneContext slices={page.data.slices}>
          <ClientSliceZoneItem className="mt-12 space-y-12" />
        </ClientSliceZoneContext>
      </TagsContextWrapper>
    </main>
  );
}
