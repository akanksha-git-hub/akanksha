import RichText from "@/components/Texts/RichText"
import TextCTA from "@/components/UI/Button/TextCTA"
import { PrismicNextLink } from "@prismicio/next";


export default function FooterInfoItems({ footerBottomTextsArray, className }) {
    


    return(
        <>
        {footerBottomTextsArray.length > 0 && (
            <ul className={className}>
                {footerBottomTextsArray.map(item => {

                    if(item.link === null) {
                        return(
                            <li key={item.text}>
                                <RichText 
                                    className="text-deep-green flex items-center gap-2 transition-all hover:opacity-100 cursor-default font-ambit-regular text-sm"
                                    text={item.text}
                                />
                            </li>
                        )
                    }

                    return(
                        <li key={item.text}>
                            <PrismicNextLink field={item.link} className="grid place-center">
                  <span className="text-black transition-all hover:opacity-100 font-ambit-regular text-sm">
                    {item.text}
                  </span>
                </PrismicNextLink>
                           
                             
                        </li>
                    )
                })}
                
            </ul>
        )}
        </>
    )

}