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
            className={`${maxwidth} universal-padding relative`}
        >
            <div className="absolute top-0 left-0 h-[90%] -z-10">
                <Image 
                    src='/contact-bg.svg'
                    alt="image"
                    className="w-full h-full object-contain"
                    height={1400}
                    width={600 * 2.6}
                />
            </div>
            <div className="bg-bright-yellow absolute top-0 right-0 w-full h-[1000px] md:h-[660px] -z-20" />
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