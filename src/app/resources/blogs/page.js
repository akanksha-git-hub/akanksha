import ClientSliceZoneContext from "@/components/ClientSliceZone/ClientSliceZoneContext";
import ClientSliceZoneItem from "@/components/ClientSliceZone/ClientSliceZoneItem";
import TagsContextWrapper from "@/components/Tags/TagsContextWrapper";
import TagsItems from "@/components/Tags/TagsItems";
import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { maxwidth } from "@/utils/helperClasses";


export default async function Page() {

    const page = await fetchPrismicSingleDocument('blog_showcase_page');
    if(!page) return <p>No page data!</p>;

    return(
        <main 
            className={`${maxwidth} universal-padding bg-off-white`}
        >   
            <div>
                <RichText 
                    text={page.data.title}
                    className={`text-deep-green font-ambit-regular text-7xl text-left md:text-center w-full pt-24`}
                />
                <RichText 
                    text={page.data.description}
                    className='font-ambit-regular text-left md:text-center text-deep-green text-base md:text-lg md:leading-7 w-[90%] md:w-[70%] md:mx-auto mt-6'
                />
            </div>
            <TagsContextWrapper className='mt-12'>
                <TagsItems
                    tags={page.data.categories}
                />
                <ClientSliceZoneContext 
                    slices={page.data.slices}
                    >
                    <ClientSliceZoneItem 
                        className='mt-12 space-y-12'
                    />
                </ClientSliceZoneContext>
            </TagsContextWrapper>
        </main>
    )

}