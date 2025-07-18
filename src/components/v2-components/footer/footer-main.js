import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { PrismicNextImage } from "@prismicio/next";
import FooterContact from "./footer-contact";
import FooterNavigationItems from "./footer-navigation-items";
import Footer from "./footer";
import FooterInfoItems from "./footer-info-items";
import RichText from "@/components/Texts/RichText";
import FooterImage from "./footer-image";

export default async function FooterMain() {
  const footerItemsTitle = (
    await fetchPrismicSingleDocument("footer_items_title")
  ).data;
  const footerItemsContent = (
    await fetchPrismicSingleDocument("footer_items_content")
  ).data;
  const footerFormTitle = (
    await fetchPrismicSingleDocument("footer_form_title")
  ).data;
  const footerLogo = (await fetchPrismicSingleDocument("footer_logo")).data;

  const footerBottomTexts = (
    await fetchPrismicSingleDocument("footer_bottom_texts")
  ).data;
  const qualityEducationLogo = (
    await fetchPrismicSingleDocument("footer_quality_education_logo")
  ).data;

  const footerBottomTextsArray = [
    {
      link: footerBottomTexts.privacy_page_cta_link,
      text: footerBottomTexts.privacy_page_cta_text,
    },
    {
    link: footerBottomTexts.terms_and_conditions_link,
    text: footerBottomTexts.terms_and_conditions_text,
    },
    {
      link: null,
      text: footerBottomTexts.akanksha_tag,
    },
  ];

  const uniqueFooterItemsTitle = [
    ...new Set(
      footerItemsTitle.footer_items_title.map((item) => {
        const lowerCaseValue = item.items_title;
        return lowerCaseValue.toLowerCase();
      })
    ),
  ];

  return (
    <Footer className="py-8 flex items-center justify-center relative  ">
      <FooterImage />
      <Footer.Container className="w-[90%] md:w-[56%] z-20 space-y-12 ">
        <Footer.Header className="flex flex-col items-left md:items-center space-y-8 ">
          <div className="relative h-28 w-48">
            <PrismicNextImage
              field={footerLogo.footer_logo}
              fill
              className=""
            />
          </div>
          <RichText
            className="font-ambit-regular text-black text-3xl w-full md:text-[3vw] md:max-w-[13ch] md:tracking-tight md:leading-[3.2rem] text-left md:text-center "
            text="Stay in touch"
          />
          <FooterContact />
        </Footer.Header>
        <Footer.Navigation className="relative sm:left-2 grid grid-cols-[repeat(2,minmax(80px,1fr))]  xl:px-0 sm:grid-cols-[repeat(auto-fit,minmax(150px,1fr))] md:gap-6  ">
          <FooterNavigationItems
        
          
            className=" w-[10rem] md:w-full  mt-4"
            uniqueFooterItemsTitle={uniqueFooterItemsTitle}
            footerItemsContent={footerItemsContent}
          />
        </Footer.Navigation>
        <Footer.Info className="flex flex-col md:flex-row md:items-end md:justify-between">
          <FooterInfoItems
            className="space-y-2 mb-4 md:mb-0"
            footerBottomTextsArray={footerBottomTextsArray}
          />
          <div className="relative h-24 w-24">
            <PrismicNextImage
              field={qualityEducationLogo.logo}
              fill
              alt="image"
            />
          </div>
        </Footer.Info>
      </Footer.Container>
    </Footer>
  );
}
