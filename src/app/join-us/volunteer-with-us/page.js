import IconScrollShowcase from "@/components/icon-scroll-showcase";
import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { maxwidth } from "@/utils/helperClasses";

export default async function Page() {

    const page = await fetchPrismicSingleDocument('volunteer_with_us');
    if(!page) return <p>No page</p>

    return(
        <main className={`${maxwidth} universal-padding mt-24`}>
            <RichText 
                text={page.data.title}
                className='flex md:justify-center text-deep-green font-ambit-regular text-5xl md:text-7xl mb-4 sm:mb-12'
            />
            <RichText 
                text={page.data.sub_title}
                className='text-deep-green font-ambit-regular flex text-left md:justify-center md:text-center text-xl md:text-3xl'
            />
            <IconScrollShowcase 
                data={page.data.items}
            />
        </main>
    )

}