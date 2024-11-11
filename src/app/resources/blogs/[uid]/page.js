import BlogInfo from "@/components/BlogInfo";
import RichText from "@/components/Texts/RichText";
import { createClient } from "@/prismicio";
import { maxwidth } from "@/utils/helperClasses";
import { PrismicNextImage } from "@prismicio/next";
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
        <div className="mt-12 bg-off-white px-6">
            <BlogInfo data={page.data.items} />
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



