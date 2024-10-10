import { fetchPrismicSingleDocument } from "@/lib/prismicDb"

export default async function DonationComponent() {


    const pageData = await fetchPrismicSingleDocument('donation_payment_component');

    if(!pageData) return <p>No Page Data</p>; // todo 


  return (
    <div>DonationComponent</div>
  )
}
