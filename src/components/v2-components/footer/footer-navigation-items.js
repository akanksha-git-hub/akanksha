import RichText from "@/components/Texts/RichText";
import TextCTA from "@/components/UI/Button/TextCTA";


export default function FooterNavigationItems({ uniqueFooterItemsTitle, footerItemsContent, className }) {

    return(
        <>
        {uniqueFooterItemsTitle.map((uniqueTitle, titleIndex) => (
            <li className={className} key={titleIndex}>
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
        </>
    )
    
}