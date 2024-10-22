import { PrismicNextLink } from "@prismicio/next";
import TextCTA from "./UI/Button/TextCTA";
import RichText from "./Texts/RichText";

export default function NavItems({ header_link_items, drop_down_items }) {

    return(
        <>
        {header_link_items.length > 0 && (
            <ul className="hidden lg:flex items-center gap-8">
              {header_link_items.map(item => {

                if(item.dropdown) {

                  const uniqueIdentifier = [...new Set(drop_down_items.map(item => {
                    const originalCaseValue = item.identifier;
                    return originalCaseValue
                  }))];

                  return(
                      uniqueIdentifier.map((item, index) => (
                        
                        <li key={index} className="relative">
                          <div className="drop-down">
                            <RichText 
                              text={item}
                              className="text-deep-green text-base font-inter hover:opacity-55 transition-all active:scale-95 relative cursor-pointer"
                            />
                            <div className="py-4 space-y-4 z-20 bg-cream border border-deep-green rounded min-w-[200px] drop-down-container">
                              {drop_down_items
                                .filter((data) => {
                                    const lowerCaseValue = item.toLowerCase();
                                    const matchData = lowerCaseValue === data.identifier.toLowerCase();
                                    return matchData;
                                })
                                .map((drop_down, i) => {
                                  return(
                                    <p className="px-4 hover:opacity-55 transition-all active:scale-95" key={i}>
                                      <PrismicNextLink
                                        field={drop_down.cta_link}>
                                        <span className="text-deep-green text-base font-inter">
                                          {drop_down.cta_text}
                                        </span>
                                      </PrismicNextLink>
                                    </p>
                                  )
                                })
                              }
                          </div>
                          </div>
                        </li>
                      ))
                  )
                } else {
                  return <TextCTA className="text-deep-green text-base font-inter hover:opacity-55 transition-all active:scale-95" key={item.cta_text} text={item.cta_text} link={item.cta_link} />
                }

              })}
            </ul>
          )}
        </>
    )

}

