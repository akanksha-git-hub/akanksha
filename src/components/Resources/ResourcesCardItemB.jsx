import RichText from "../Texts/RichText";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { months } from "@/utils/months";
import { useResourcesCardContext } from "./ResourcesCard";

export default function ResourcesCardItemB({ item }) {


    const { slice: { primary: { cta_text: text }} } = useResourcesCardContext();

    const date = new Date(item.date);

    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const day = date.getDate();
    const monthYear = <>{month}<small className="text-xl">/{year}</small></>;

    const tags = item.rich_text_bullet_points;

  return (
    <div className="grid space-y-6 xl:space-y-0 xl:grid-cols-3 xl:gap-12 3xl:gap-0 xl:place-content-between pb-12 border-b border-[#A3A19A] last:border-none">
        <div className="font-ambit-regular">
            <RichText 
                className="text-deep-green text-2xl font-ambit-semibold"
                text={day}
            />
            <RichText 
                className="text-deep-green text-5xl"
                text={monthYear}
            />
        </div>
        <div className="font-ambit-regular space-y-2">
            <RichText 
                className="text-3xl w-[80%] text-deep-green font-ambit-semibold"
                text={item.title} 
            />
            <ul className="flex flex-wrap gap-2">
                {tags.map(item => (
                    <li 
                        key={item.text}
                        className={`w-fit py-2 px-4 cursor-pointer font-ambit-regular text-sm rounded-full transition-all
                                    border border-deep-green hover:bg-deep-green hover:text-off-white `}
                    >
                        {item.text}
                    </li>
                ))}
            </ul>
        </div>
        <div className="flex xl:justify-end">
            <PrismicNextLink
                field={item.cta_link}
                className="group transition-all hover:bg-bright-yellow hover:border-opacity-0 rounded-[10px] p-4 w-full sm:w-[400px] h-[320px] sm:h-[250px] cursor-pointer border border-[#C2BFB7]"
            >
                <div className="overflow-hidden rounded-[10px] h-full w-full relative">
                    <PrismicNextImage 
                        field={item.image}
                        className="h-full w-full object-cover"
                        height={1200}
                        width={1200}
                        alt=""
                    />
                <div className="bg-black opacity-0 transition-all group-hover:opacity-35 absolute top-0 left-0 h-full w-full z-10" />
                    <p className="bg-bright-yellow text-deep-green font-ambit-regular text-center py-2 px-4 text-base rounded-full opacity-0 transition-all z-20 absolute top-2/4 -translate-y-2/4 left-2/4 -translate-x-2/4 group-hover:opacity-100">
                        {text}
                    </p>
                </div>
            </PrismicNextLink>
        </div>
    </div>
  )
}
