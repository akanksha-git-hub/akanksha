import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { maxwidth } from "@/utils/helperClasses";

export default async function Page() {

    const page = await fetchPrismicSingleDocument('privacy_policy');
    if(!page) return <p>No page data!</p>;

    return(
        <main className={`${maxwidth} universal-padding space-y-16 relative`}>
            <div className="orange-gradient absolute -top-28 left-0 h-96 w-full -z-10" />
            <RichText 
                text='Privacy Policy'
                className='font-ambit-regular text-5xl md:text-7xl flex place-content-center pt-12 text-deep-green'
            />
           {page.data.rich_text_editor.map((item, index) => {

            return(
                <div className="text-deep-green space-y-4" key={index}>
                    {item.rich_text.map((text, i) => {

                        const heading = text.type !== 'paragraph';
                        return(
                            <div key={i}>
                                <RichText 
                                    className='text-3xl sm:text-4xl font-ambit-semibold text-left md:text-center flex items-center justify-center w-[90%] md:w-[20ch] md:mx-auto'
                                    text={heading && (text.text)}
                                />
                                <RichText 
                                    className='font-ambit-regular text-base sm:text-lg text-justify'
                                    text={!heading && (text.text)}
                                />
                            </div>
                        )
                    })}
                </div>
               )
           })}
        </main>
    )
} 