import Floating from "@/components/Floating";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";

export default async function layout({ children }) {

    const floatData = await fetchPrismicSingleDocument("floating_component");

  return (
    <div className="relative">
        {children}
        <Floating floatData={floatData.data} />
    </div>
  )
}
