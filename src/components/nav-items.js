import TextCTA from "./UI/Button/TextCTA";
import NavItemDropDownText from "./v2-components/header/nav-item-dropdown-text";
import { useHeaderDropDownContext } from "./v2-components/header/header";

export default function NavItems({ header_link_items, uniqueIdentifier }) {

  const { setDropdownId } = useHeaderDropDownContext();

  return(
      <>
      {header_link_items.length > 0 && (
          <ul className="hidden lg:flex items-center gap-8">
            {uniqueIdentifier && (
              uniqueIdentifier.map((item, i) => {

                const upper = item.split(" ");
                  const upperCaseValue = upper.map((item, i) => {

                  const firstLetter = item[0].toUpperCase();
                  const otherLetters = item.substring(1);
                  const finalWord = `${firstLetter}${otherLetters}`;
                  return finalWord;
                  
                });

                let finalWord;

                if(upperCaseValue.length > 1) {
                  finalWord = upperCaseValue.join(" ");
                } else {
                  finalWord = upperCaseValue;
                }
                return(
                  header_link_items
                    .filter((filtered_item) => {
                      const lowerCaseText = filtered_item.cta_text.toLowerCase();
                      const matchData = lowerCaseText === item;
                      return matchData;
                    })
                    .map((_, __) => {

                      const uid = finalWord.toLowerCase();

                      return(
                        <li key={_} className="relative group">
                          <div className="drop-down">
                            <NavItemDropDownText 
                              text={finalWord}
                              className={`
                                text-deep-green text-lg font-inter relative cursor-pointer
                                `}
                              onClick={() => setDropdownId(uid)}
                            />
                          </div>

                        </li>
                        )
                    })
                )

              })
            )
          }  
          {
            header_link_items
              .filter(item => !item.dropdown)
              .map(item => (
                <TextCTA 
                  className="text-deep-green text-lg font-inter hover:opacity-55 transition-all active:scale-95" 
                  key={item.cta_text} 
                  text={item.cta_text} 
                  link={item.cta_link} 
                />
              ))
          }
          </ul>
        )}
      </>
  )

}

