import RichText from "@/components/Texts/RichText"
import TextCTA from "@/components/UI/Button/TextCTA"


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
                            <TextCTA 
                                linkClassName="grid place-center"
                                link={item.link}
                                text={item.text}
                                className="text-deep-green  transition-all hover:opacity-100 font-ambit-regular text-sm"
                            />
                        </li>
                    )
                })}
            </ul>
        )}
        </>
    )

}