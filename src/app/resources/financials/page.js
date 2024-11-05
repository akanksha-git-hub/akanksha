import FinancialsAccordion from "@/components/financials-accordion";
import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { maxwidth } from "@/utils/helperClasses";
import Image from "next/image";


export default async function Page() {

    const page = await fetchPrismicSingleDocument('financials');

    if(!page) return <p>No page data</p>;


    return(
        <main
            className={`${maxwidth} universal-padding`}
        >
            <div className="relative w-fit md:mx-auto">
                <RichText 
                    text={page.data.title}
                    className={`text-deep-green font-ambit-regular text-7xl text-left md:text-center w-full pt-24`}
                />
                <RichText 
                    text={page.data.description}
                    className='font-ambit-regular text-left md:text-center text-deep-green text-base md:text-lg md:leading-7 w-[90%] md:w-[80%] md:mx-auto mt-6'
                />
                {/* <Image 
                    className="absolute -top-[11px] left-[2%]"
                    height={60}
                    width={60}
                    src='/triangle.svg'
                    alt="triangle"
                />
                <Image 
                    className="absolute -top-[75px] right-0"
                    height={144}
                    width={144}
                    src='/triangle.svg'
                    alt="triangle"
                />
                <Image 
                    className="absolute top-[106%] md:top-full left-[20%]"
                    height={24}
                    width={24}
                    src='/triangle.svg'
                    alt="triangle"
                /> */}
            </div>
            <div className="mt-12">
                    <FinancialsAccordion 
                        item={page.data}
                    />
            </div>
        </main>
    )
}