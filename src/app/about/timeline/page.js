import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { PrismicRichText, SliceZone } from "@prismicio/react";

export default async function Page() {

    const page = await fetchPrismicSingleDocument('timeline');

    if(!page) return <p>No page data!</p>

    return(
        <main className={`${maxwidth} relative`}>
            <div className="orange-gradient absolute -top-28 left-0 h-96 w-full -z-10" />
            <div className="flex flex-col items-center justify-center my-12 universal-padding">
                <RichText 
                    text={page.data.title}
                    className='text-deep-green font-ambit-regular text-7xl w-full 950px:w-[10ch] text-center mb-24'
                />
                <div className="text-deep-green font-ambit-regular text-xl text-center w-full 950px:w-[90%] 950px:max-w-[1400px]">
                    <PrismicRichText 
                        field={page.data.descriptions}
                    />
                </div>
            </div>
            <SliceZone 
                slices={page.data.slices}
                components={components}
            />
        </main>
    )

}

export async function generateMetadata() {
    const client = createClient();
    const page = await client.getSingle("timeline");
  
    return {
      title: page.data.meta_title,
      description: page.data.meta_description,
    };
  }