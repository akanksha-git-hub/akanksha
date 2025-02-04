import { fetchPrismicSingleDocument } from "@/lib/prismicDb"
import { PrismicNextImage } from "@prismicio/next";
import DonationSelectors from "./DonationSelectors";
import SliceIdentifier from "./SliceIdentifier";

export default async function Donation() {

    const data = (await fetchPrismicSingleDocument('donation_payment_component')).data;

  return (
    <>
        <SliceIdentifier 
            text={data.slice_identifier}
        />
        <div className="flex flex-col-reverse xl:flex-row items-center justify-between mt-12 md:mt-24 universal-padding">
            {/* <div className="relative mt-4 xl:mt-0 w-full xl:w-2/4 2xl:w-[60%]">
                <PrismicNextImage 
                    field={data.image}
                    alt=""
                    height={1200}
                    width={1200}
                    className="h-full w-full object-cover z-0 rounded-md overflow-hidden"
                    />
                <div className="absolute image-bg top-0 left-0 h-full w-full z-10 rounded-lg overflow-hidden cursor-pointer hover:opacity-85 transition-all" />
            </div> */}
            {/* Render Donation */}
            <DonationSelectors 
                data={data}
            />
        </div>
    </>
  )
}
