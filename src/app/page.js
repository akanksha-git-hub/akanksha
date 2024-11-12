import NotificationBar from "@/components/NotificationBar";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { components } from "@/slices";
import { maxwidth } from "@/utils/helperClasses";
import { SliceZone } from "@prismicio/react";

export default async function Page() {

    const page = await fetchPrismicSingleDocument("home");
    if(!page) return null;

    return(
        <main className={`${maxwidth}`}>
            <NotificationBar />
            {/* <p>Easter egg</p> */}
            <SliceZone 
                slices={page.data.slices}
                components={components}
            />
        </main>
    );
}

// export async function generateMetadata() {
//     const client = createClient();
//     const page = await client.getSingle("home");
  
//     return {
//       title: page.data.meta_title,
//       description: page.data.meta_description,
//     };
//   }