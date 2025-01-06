"use server"
import GridA from "@/components/grid-A";
import TabContainer from "@/components/Tab/tab-container";
import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb"
import { maxwidth } from "@/utils/helperClasses";
import Image from "next/image";
import OrangeUnderline from "@/assets/orange-underline.svg";

export default async function Page() {


    const page = await fetchPrismicSingleDocument('our_schools');
    
    if(!page) return <p>No Page Data</p>;

    const uniqueSet = [...new Set(page.data.tab_value.map(item => {

        const originalValue = item.value;
        const lowerCaseValue = item.value.toLowerCase();
        
        return { originalValue, lowerCaseValue };
    }))];

    const data = page.data.tab_content;

    return(
        <main className={`${maxwidth} universal-padding`}>
            <div className="flex flex-col items-center justify-center w-fit mx-auto">
                <RichText 
                    text={page.data.title}
                    className='text-deep-green text-7xl font-ambit-regular flex items-center justify-center mt-12'
                />
                {/* TODO convert to pull image from prismic */}
                <Image  
                    className="w-full"
                    src={OrangeUnderline}
                    alt="image"
                    width={200}
                    height={200}
                />
            </div>
            <TabContainer 
                tabValues={uniqueSet}
                data={data}
                RenderElement={GridA}
                className="flex xl:border-t xl:border-deep-green flex-wrap mt-12"
            >
            </TabContainer>
        </main>
    )
}