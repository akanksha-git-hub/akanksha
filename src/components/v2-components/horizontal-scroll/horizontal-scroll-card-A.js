import { PrismicImage } from "@prismicio/react";
import Image from "next/image";

export default function HorizontalScrollCardA({item}) {
  console.log("Prismic item data:", item);
  
  return (
    <div className="flex flex-col xl:flex-row bg-[#55BBD3] rounded-lg overflow-hidden w-full max-w-[1500px]  h-full max-h-[700px] mx-auto ">
      <div className="p-8 lg:p-12 w-[100%] xl:w-[50%] flex flex-col justify-between   ">
        <div>
          <h2 className="text-5xl lg:text-6xl xl:text-8xl text-white font-ambit-regular  ">
            {item.data.title}
          </h2>
          <p className="text-xl lg:text-2xl text-white mt-2 font-ambit-regular ">
            {item.data.subheading}
          </p>
        </div>

        <p className="text-sm md:text-2xl lg:text-3xl text-white font-ambit-light mt-4    ">
       {item.data.description}

        </p>
      </div>

      <div className="w-full xl:w-[50%] h-full flex items-center justify-center">
        {/* Outer White Circle */}
        <div className="bg-white rounded-full relative flex items-center justify-center h-[250px] w-[250px]  md:h-[280px] md:w-[280px] lg:h-[320px] lg:w-[320px] xl:h-[400px] xl:w-[400px]">
          {/* Ellipse Layer */}
          <div className="absolute rounded-full flex items-center justify-center h-[220px] w-[220px] md:h-[250px] md:w-[250px] lg:h-[280px] lg:w-[280px] xl:h-[350px] xl:w-[350px] overflow-hidden">
            <PrismicImage

              field={item.data.ellipse}
              alt="Ellipse"
              layout="fill"
              objectFit=""
            />
          </div>
          {/* Main Image */}
          <div className="relative flex items-center justify-center h-[100px] w-[100px] md:h-[150px] md:w-[150px]  lg:h-[200px] lg:w-[200px] overflow-hidden rounded-full">
            <PrismicImage
              field = {item.data.book}
              alt="Card image"
              width={300}
              height={300}
              objectFit="cover"
              className="rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
