import RichText from "@/components/Texts/RichText"
import TextCTA from "@/components/UI/Button/TextCTA"
import { PrismicNextLink } from "@prismicio/next"

export default function FooterInfoItems({ footerBottomTextsArray, className }) {
  console.log("footerBottomTextsArray:", footerBottomTextsArray)

  return (
    <>
      {footerBottomTextsArray.length > 0 && (
        <ul className={className}>
          {footerBottomTextsArray.map((item, index) => {
            if (item.link === null) {
              return (
                <li key={index}>
                  <RichText
                    className="text-deep-green flex items-center gap-2 transition-all hover:opacity-100 cursor-default font-ambit-regular text-sm"
                    text={item.text}
                  />
                </li>
              )
            }

            // fallback if link.url is missing but we know the text
            const isTerms = item.text?.toLowerCase().includes("terms")
            const href = isTerms ? "/terms-and-conditions" : item.link?.url || "/"

            return (
              <li key={index}>
                <a
                  href={href}
                  className="grid place-center text-black transition-all hover:opacity-100 font-ambit-regular text-sm"
                >
                  {item.text}
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
