import { PrismicNextImage } from "@prismicio/next"
import RichText from "../Texts/RichText"

export default function CardsThreeMobile({ cards }) {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 mt-12 gap-8">
        {cards.map((item, i) => {

            return(
                <li
                    className={`bg-bright-yellow transition-all rounded p-4`} 
                    key={i}
                >
                    <div className="overflow-hidden rounded h-[250px] sm:h-[350px] md:h-[200px]">
                        <PrismicNextImage 
                            field={item.image}
                            className="h-full w-full object-cover rounded"
                        />
                    </div>
                    <div className="mt-8">
                        <RichText 
                            text={item.title}
                            className='uppercase text-deep-green font-ambit-bold text-xl'
                        />
                        <RichText 
                            text={item.desc}
                            className='text-deep-green font-ambit-regular text-base'
                        />
                    </div>
                </li>
            )

        })}
    </ul>
  )
}
