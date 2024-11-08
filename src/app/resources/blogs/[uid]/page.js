import RichText from "@/components/Texts/RichText";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { PrismicNextImage } from "@prismicio/next";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";


export default async function Page({ params }) {


    const client =  createClient();
    const page = await client.getByUID("blog_child_page", params.uid).catch(() => notFound());


    return(
        <>
        <main
            className={`${maxwidth} universal-padding bg-white`}
        >   
            <div className="mt-12 space-y-4 flex flex-col items-center justify-center">
                <RichText 
                    text='October 20, 2024'
                    className='font-ambit-semibold text-deep-green text-3xl grid place-content-center'
                />
                <RichText 
                    text={page.data.title}
                    className='font-ambit-regular text-deep-green text-6xl text-center w-[90%] 2xl:w-[28ch] grid place-content-center mx-auto'
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
        <div className="mt-12 bg-off-white universal-padding">
            {page.data.items.map((item, index) => {
                console.log(item, 'BLOG CHILD')

                const hasImage = item.image;

                return(
                    <div className="text-deep-green space-y-4 mb-12" key={index}>
                        {item.rich_text.map((text, i) => {


                            const heading = text.type !== 'paragraph';
                            return(
                                <div key={i}>
                                    <RichText 
                                        className='text-3xl sm:text-4xl font-ambit-semibold text-left md:text-center flex items-center justify-center w-[90%] md:w-[32ch] md:mx-auto'
                                        text={heading && (text.text)}
                                    />
                                    <RichText 
                                        className='font-ambit-regular text-base sm:text-lg text-justify'
                                        text={!heading && (text.text)}
                                    />
                                </div>
                            )
                        })}
                        {hasImage && (
                            <PrismicNextImage 
                                field={item.image}
                            />
                        )}
                    </div>
                )
            })}
        </div>
        </>
    )

}


export async function generateStaticParams() {
    const client = createClient();
    const pages = await client.getAllByType("blog_child_page");

    return pages.map((page) => {
        return { uid: page.uid };
    })
}



