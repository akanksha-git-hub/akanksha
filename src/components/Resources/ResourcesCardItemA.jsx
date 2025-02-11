import RichText from "../Texts/RichText";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { months } from "@/utils/months";
import { useResourcesCardContext } from "./ResourcesCard";
import Button from "../v2-components/buttons/button";

export default function ResourcesCardItemA({ item }) {
  const { slice } = useResourcesCardContext();

  const date = new Date(item.date);

  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const day = date.getDate();
  const truncatedLength = item.description.split(" ").length * 2.2;
  const truncatedDescription = `${item.description.substring(0, truncatedLength)}...`;
  const monthYear = (
    <>
      {month}
      <small className="text-xl">/{year}</small>
    </>
  );

  return (
    <div className="grid space-y-6 xl:space-y-0 xl:grid-cols-3 xl:gap-12 xl:flex  xl:justify-between xl:items-start 3xl:gap-0 xl:place-content-between pb-12 border-b border-[#A3A19A] last:border-none">
      <div className="font-ambit-regular">
        <RichText
          className="text-black text-2xl font-ambit-semibold"
          text={day}
        />
        <RichText className="text-black text-5xl" text={monthYear} />
      </div>
      <div className="font-ambit-regular space-y-2">
        <RichText
          className="text-3xl w-[80%] text-black font-ambit-semibold"
          text={item.title}
        />
        <RichText className="text-black pr-4" text={truncatedDescription} />
      </div>
      <div className="flex xl:justify-end">
        <PrismicNextLink
          field={item.cta_link}
          className="group transition-all hover:bg-bright-yellow hover:border-opacity-0 rounded-[20px] p-4 w-full sm:w-[500px] h-[320px] sm:h-[250px] cursor-pointer border border-[#C2BFB7]"
        >
          <div className="overflow-hidden rounded-[20px] h-full w-full relative">
            <PrismicNextImage
              field={item.image}
              className="h-full w-full object-cover"
              height={1200}
              width={1200}
              alt=""
            />
            <div className="bg-black opacity-0 transition-all group-hover:opacity-35 absolute top-0 left-0 h-full w-full z-10" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all group-hover:opacity-100 z-50">
    <Button className="">
      View All
    </Button>
  </div>
          </div>
        </PrismicNextLink>
      </div>
    </div>
  );
}
