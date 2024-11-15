import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import NotificationBarWrapper from "./NotificationBarWrapper";

export default async function NotificationBar() {

    const data = await fetchPrismicSingleDocument("notification_bar");
    const { notification_text, cta_link, cta_text, hide_banner } = data.data;


    console.log()

  return (
    <>
    {!hide_banner && (
      <NotificationBarWrapper 
        notification_text={notification_text}
        cta_link={cta_link}
        cta_text={cta_text}
      />
    )}
    </>
  )
}
