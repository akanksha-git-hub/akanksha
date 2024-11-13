import RichText from "./Texts/RichText";
import FooterForm from "./FooterForm";
import TextCTA from "./UI/Button/TextCTA";
import { PrismicNextImage } from "@prismicio/next";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";

export default async function Footer() {
    
    const footerItemsTitle = (await fetchPrismicSingleDocument("footer_items_title")).data;
    const footerItemsContent = (await fetchPrismicSingleDocument("footer_items_content")).data;
    const footerFormTitle = (await fetchPrismicSingleDocument("footer_form_title")).data;
    const footerLogo = (await fetchPrismicSingleDocument("footer_logo")).data;

    const footerBottomTexts = (await fetchPrismicSingleDocument("footer_bottom_texts")).data;
    const qualityEducationLogo = (await fetchPrismicSingleDocument("footer_quality_education_logo")).data;

    const footerBottomTextsArray = [
        {
            link: footerBottomTexts.privacy_page_cta_link,
            text: footerBottomTexts.privacy_page_cta_text
        },
        {
            link: footerBottomTexts.terms_and_condition_page_cta_link,
            text: footerBottomTexts.terms_and_condition_page_cta_text
        },
        {
            link: null,
            text: footerBottomTexts.akanksha_tag
        }
    ];

    const uniqueFooterItemsTitle = [...new Set(footerItemsTitle.footer_items_title.map(item => {
        const lowerCaseValue = item.items_title
        return lowerCaseValue.toLowerCase();
    }))];

    return(
        /* T-1822 Quality education sticker */
        <footer 
            className="universal-padding w-full overflow-hidden border-t border-deep-green"
        >
            <div className="flex flex-wrap items-center justify-between w-full">
                <div className="w-full mid:w-2/5 2xl:w-2/4">
                    <RichText 
                        className="font-playfair-display italic text-[#070707] text-4xl sm:text-6xl mid:text-4xl xl:text-6xl"
                        text={footerFormTitle.title_top}
                    />
                    <RichText 
                        className="font-ambit-regular tracking-tighter text-[#070707] text-4xl sm:text-6xl mid:text-4xl xl:text-6xl"
                        text={footerFormTitle.title_bottom}
                    />
                    <FooterForm 
                        className="mt-4 w-full 2xl:w-[37.5rem]"
                    />
                </div>
                <div className="mt-12 w-full mid:w-auto mid:mt-0 mid:mx-0">
                    {footerItemsTitle && (
                        <ul className="flex flex-wrap gap-6 mid:gap-8 xl:gap-12 2xl:gap-14 3xl:gap-28 w-full items-start justify-between mid:justify-around">
                            {uniqueFooterItemsTitle.map((uniqueTitle, titleIndex) => (
                                <li key={titleIndex}>
                                    <RichText 
                                        className="uppercase text-deep-green font-ambit-semibold text-base sm:text-xl"
                                        text={uniqueTitle}
                                    />
                                    {footerItemsContent.footer_list_items && (
                                        <div className="flex flex-col space-y-1">
                                            {footerItemsContent.footer_list_items
                                                .filter((item) => {
                                                    const lowerCaseValue = item.footer_item_title_identifier;
                                                    
                                                    const matchData = lowerCaseValue.toLowerCase() === uniqueTitle;
                                                    return matchData;
                                                })
                                                .map((footerItems, footerItemsIndex) => (
                                                    <TextCTA 
                                                        className="font-inter text-sm sm:text-base text-deep-green hover:opacity-80 active:scale-95 transition-all"
                                                        key={footerItemsIndex}
                                                        text={footerItems.footer_item}
                                                        link={footerItems.footer_item_link}
                                                    />
                                            ))}
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {/* Render Footer Logo */}
            <div className="relative flex flex-col items-start lg:items-end lg:flex-row lg:justify-between mt-12 mid:pt-12">
                <div className="h-auto w-[200px] mid:h-auto mid:w-[200px]">
                    <PrismicNextImage 
                        height={300}
                        width={300}
                        className="h-full w-full"
                        field={footerLogo.footer_logo}
                        alt=""
                    />
                </div>
                <div className="flex w-full justify-between lg:w-auto items-end lg:justify-center sm:gap-12">
                    {/* Links and Akanksha tag */}
                    <div>
                        {footerBottomTextsArray.length > 0 && (
                            <ul className="flex flex-wrap items-center gap-4">
                                {footerBottomTextsArray.map(item => {

                                    if(item.link === null) {
                                        return(
                                            <li className="flex items-center justify-center" key={item.text}>
                                                <RichText 
                                                    className="text-deep-green flex items-center gap-2 opacity-30 transition-all hover:opacity-100 cursor-default font-ambit-regular text-sm"
                                                    text={item.text}
                                                />
                                            </li>
                                        )
                                    }

                                    return(
                                        <li key={item.text}>
                                            <TextCTA 
                                                linkClassName="grid place-center"
                                                link={item.link}
                                                text={item.text}
                                                className="text-deep-green opacity-30 transition-all hover:opacity-100 font-ambit-regular text-sm"
                                            />
                                        </li>
                                    )
                                })}
                            </ul>
                        )}
                    </div>
                    {/* Quality education logo */}
                    <div className="!h-[98px] !w-[98px] sm:h-[81px] sm:w-[81px]">
                        <PrismicNextImage
                            className=" lg:object-cover w-full h-full" 
                            field={qualityEducationLogo.logo}
                            height={80}
                            width={80}
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}
