import ContactTabComponent from "@/components/Contact/ContactTabComponent";
import TabContainer from "@/components/Tab/tab-container";
import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { maxwidth } from "@/utils/helperClasses";
import Image from "next/image";


export default async function Page() {

    const page = await fetchPrismicSingleDocument("contact");

    if(!page) return <p>No page data!</p>;



    return(
        <main
            className={`${maxwidth} contact-bg universal-padding relative`}
        >
            <div>
                <RichText 
                    text={page.data.title}
                    className={`text-deep-green font-ambit-regular text-7xl text-left md:text-center w-full pt-24`}
                />
                <RichText 
                    text={page.data.sub_title}
                    className='font-ambit-regular text-left md:text-center text-deep-green text-base md:text-lg md:leading-7 w-[90%] md:w-[70%] md:mx-auto mt-6'
                />
            </div>
            <div className="mb-32">
                <ContactTabComponent 
                    data={page.data.location_items}
                />
            </div>
        </main>
    )


}