"use server"
import GridA from "@/components/grid-A";
import TabContainer from "@/components/Tab/tab-container";
import RichText from "@/components/Texts/RichText";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb"
import { maxwidth } from "@/utils/helperClasses";

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
            <RichText 
                text={page.data.title}
                className='text-deep-green text-7xl font-ambit-regular flex items-center justify-center mt-12 pb-8'
            />
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