import { PrismicNextImage } from "@prismicio/next";

export default function ThirdCard({ item }) {
  console.log("item", item);

  if (!item) return null;

  const data = item.data;

  return (
    <div
      className="p-4 xl:p-6 rounded-md shadow-md  h-[500px]  md:h-full md:max-h-[700px] flex flex-col xl:flex-row items-stretch gap-6"
      style={{ backgroundColor: data.color || "#fff" }}
    >
      {/* Left section: heading and description */}
      <div className="flex flex-col justify-between w-full xl:w-1/2 text-black">
        <h2 className="text-2xl sm:text-4xl xl:text-5xl font-ambit-regular w-full xl:w-[80%] mb-4 xl:mb-0">
          {data.heading}
        </h2>
        <p className="text-base sm:text-xl xl:text-2xl font-ambit-regular text-black w-full xl:w-[80%]">
          {data.description}
        </p>
      </div>

      {/* Right section: image */}
      <div className="w-full xl:w-1/2 h-[220px] xl:h-full">
        {data.image && (
          <PrismicNextImage
            field={data.image}
            className="w-full h-full object-cover rounded-md"
          />
        )}
      </div>
    </div>
  );
}
