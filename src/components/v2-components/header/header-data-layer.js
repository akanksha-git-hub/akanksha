import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import HeaderMain from "./header-main";

export default async function HeaderDataLayer() {

    const header = await fetchPrismicSingleDocument("header");

    const data = header.data;

    return(
        <HeaderMain header={data} />
    )

}