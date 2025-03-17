import { maxwidth } from "@/utils/helperClasses";
import RichText from "@/components/Texts/RichText";
import Image from "next/image";
import { fetchPrismicSingleDocument } from "@/lib/prismicDb";
import { PrismicLink } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";

export default async function Page() {
  const page = await fetchPrismicSingleDocument("annual_reports");

  if (!page) return <p>No page data!</p>;

  const pageData = page.data.items;

  const totalLength = pageData.length - 1;

  return (
    <main className={`${maxwidth} universal-padding`}>
      <div className=" relative flex flex-row md:items-start items-center justify-center space-x-20    ">
        {page.data.left_image?.url && (
          <PrismicNextImage
            field={page.data.left_image}
            className="w-10 h-auto md:w-40"
          />
        )}
        <RichText
          className="text-black font-ambit-regular  text-3xl md:text-6xl text-center mt-8 "
          text={page.data.title}
        />
        {page.data.right_image?.url && (
          <PrismicNextImage
            field={page.data.right_image}
            className="w-20 h-auto md:w-60"
          />
        )}
      </div>

      <div className="mt-12">
        <ul className="grid grid-cols-1 place-content-center gap-x-12 md:grid-cols-2 w-full lg:w-[880px] 3xl:w-[1000px] lg:mx-auto">
          {pageData.map((item, index) => {
            const lastItem = index === totalLength;
            const secondLastItem = index === totalLength - 1;

            return (
              <li
                key={index}
                className={`border border-[#DCDCDC] border-b-0 ${lastItem && "!border-b"} ${secondLastItem && "!border-b"}`}
              >
                <PrismicLink
                  className="flex items-center justify-between p-4 opacity-55 transition-all hover:opacity-100"
                  field={item.cta_link}
                  target="_blank"
                >
                  <span className="font-ambit-semibold text-2xl text-deep-green hover:text-black transition-all">
                    {item.year}
                  </span>
                  <span>
                    <Image
                      className=""
                      height={18}
                      width={18}
                      src="/download.svg"
                      alt="download"
                    />
                  </span>
                </PrismicLink>
              </li>
            );
          })}
        </ul>
      </div>
    </main>
  );
}
