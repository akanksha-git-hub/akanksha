import RichText from "../Texts/RichText";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import { months } from "@/utils/months";
import { useResourcesCardContext } from "./ResourcesCard";
import Button from "../v2-components/buttons/button";

export default function ResourcesCardItemB({ item }) {
  const {
    slice: {
      primary: { cta_text: text },
    },
  } = useResourcesCardContext();

  const date = new Date(item.date);

  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const day = date.getDate();
  const monthYear = (
    <>
      {month}
      <small className="text-xl">/{year}</small>
    </>
  );

  const tags = item.rich_text_bullet_points;

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[minmax(200px,320px)_1fr_1fr] gap-y-6 xl:gap-y-0 xl:gap-x-8 mt-6 border-b border-[#A3A19A] last:border-none">
  {/* Column 1 */}
  <div className="font-ambit-regular w-full">
    <RichText
      className="text-black text-2xl font-ambit-semibold"
      text={day}
    />
    <RichText className="text-black text-5xl" text={monthYear} />
  </div>

  {/* Column 2 */}
  <div className="font-ambit-regular space-y-2 w-full">
    <RichText
      className="text-3xl text-black font-ambit-semibold"
      text={item.title}
    />
    <ul className="flex flex-wrap gap-2">
      {tags.map((item) => (
        <li
          key={item.text}
          className="w-fit py-2 px-4 cursor-pointer font-ambit-regular text-sm rounded-full transition-all border border-black hover:bg-black hover:text-off-white"
        >
          {item.text}
        </li>
      ))}
    </ul>
  </div>

  {/* Column 3 */}
  <div className="flex xl:justify-end w-full">
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
          <Button>{text}</Button>
        </div>
      </div>
    </PrismicNextLink>
  </div>
</div>

  );
}
