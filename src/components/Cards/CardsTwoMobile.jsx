import { PrismicNextImage } from "@prismicio/next"
import RichText from "../Texts/RichText"

export default function CardsTwoMobile({ data }) {

  return (
    <ul className="flex flex-wrap sm:items-center sm:justify-center gap-12 my-12 sm:my-24">
        {data.map((item, i) => {
            return(
                <li
                    className={`
                        border bg-bright-yellow border-transparent opacity-100 
                        rounded-[10px] px-8 pt-8 pb-16 space-y-2 w-full sm:w-[330px] transition-all
                        `} 
                    key={i}
                >
                    <div className="h-32 w-32 rounded-full bg-soft-white mx-auto">
                        {item.image && (
                            <PrismicNextImage 
                                field={item.image}
                                className="h-full w-full object-cover"
                            />
                        )}
                    </div>
                    <div className="space-y-6">
                        <RichText 
                            text={item.title}
                            className='font-playfair-display text-deep-green text-4xl
                                        text-center flex items-center justify-center'
                        />
                        <div className="space-y-3">
                            {item.rich_text && (
                                item.rich_text.map((text, index) => {

                                    return(
                                        <p
                                            className="text-deep-green font-ambit-regular text-xl text-center" 
                                            key={index}
                                        >
                                            {text.text}
                                        </p>
                                    )

                                })
                            )}
                        </div>
                    </div>
                </li>
            )

        })}
    </ul>
  )
}
