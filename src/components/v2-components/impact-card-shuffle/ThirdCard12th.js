import { PrismicNextImage } from "@prismicio/next";

export default function ThirdCard({ item }) {
  console.log("item", item);

  if (!item) return null;

  const data = item.data;

  return (
    <div
      className="p-4 md:p-6 rounded-md shadow-md h-auto md:h-[400px] flex flex-col md:flex-row items-stretch gap-6"
      style={{ backgroundColor: data.color || "#fff" }}
    >
      {/* Left section: heading and description */}
      <div className="flex flex-col justify-between w-full md:w-1/2 text-black">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-ambit-regular w-full md:w-[80%] mb-4 md:mb-0">
          {data.heading}
        </h2>
        <p className="text-base sm:text-xl md:text-2xl font-ambit-regular text-black w-full md:w-[80%]">
          {data.description}
        </p>
      </div>

      {/* Right section: image */}
      <div className="w-full md:w-1/2 h-[220px] md:h-full">
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
