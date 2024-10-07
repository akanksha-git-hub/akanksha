import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import RichText from "./Texts/RichText";
import PrimaryCTA from "./UI/Button/PrimaryCTA";

export default async function NotificationBar() {

    const data = await fetchPrismicSingleDocument("notification_bar");
    const { notification_text, cta_link, cta_text } = data.data;

  return (
    <section className="bg-bright-yellow p-2 flex items-center justify-center gap-4">
      <RichText 
        text={notification_text}
        className="font-ambit-regular text-base sm:text-xl md:text-3xl"
      />
      <PrimaryCTA 
        text={cta_text}
        link={cta_link}
        className="!py-2 !px-4 sm:!py-3 sm:!px-8"
      />
    </section>
  )
}
