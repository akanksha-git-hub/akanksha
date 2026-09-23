import { SliceZone } from "@prismicio/react";
import { createClient } from "@/prismicio";
import { components } from "@/slices";
import { PrismicNextImage } from "@prismicio/next";
import { notFound } from "next/navigation";

import Button from "@/components/v2-components/buttons/button";
import ShareButton from "@/components/v2-components/ShareButton";

export default async function Page({ params }) {
  const { uid } = await params;

  const client = createClient();

  let story;

  try {
    story = await client.getByUID(
      "people_of_akanksha_story",
      uid
    );
  } catch (error) {
    notFound();
  }

  return (
    <main className="w-full">

      {/* =========================================
          AUTHOR + ACTIONS
          ========================================= */}

      

      {/* =========================================
          STORY TITLE
          ========================================= */}

      {story.data.title && (
        <section className="mx-auto w-full max-w-[900px] px-6 pt-16 md:px-10 md:pt-20 lg:px-12">

          <h1 className="max-w-[1100px] font-ambit-regular text-5xl leading-[0.95] tracking-[-0.04em] text-black sm:text-6xl md:text-7xl ">
            {story.data.title}
          </h1>

        </section>
      )}

<section className="mx-auto w-full max-w-[900px] px-6 pt-5 md:px-10  lg:px-12">

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

          {/* Author */}

          <div>
            {story.data.author_name && (
              <h2
                className="text-[28px] leading-none "
                style={{
                  fontFamily:
                    '"Brush Script MT", "Segoe Print", "Comic Sans MS", cursive',
                  fontStyle: "italic",
                }}
              >
                {story.data.author_name}
              </h2>
            )}

            {story.data.role && (
              <p className="mt-4 text-[20px] leading-[1.4] text-[#315A78] md:text-[25px]">
                {story.data.role}
              </p>
            )}
          </div>

          {/* Actions */}

          <div className="flex items-center gap-3">
            <ShareButton />

            <Button
              href="https://akankshafund.org/donation/"
              showArrow={false}
            >
              <span className="flex items-center gap-2">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
                  />
                </svg>

                <span>Support</span>

              </span>
            </Button>
          </div>

        </div>

      </section>


      {/* =========================================
          HERO IMAGE
          ========================================= */}

      {story.data.hero_image && (
        <section className="mx-auto mt-16 w-full max-w-[900px] px-6 md:mt-20 md:px-10 lg:px-12">

          <div className="overflow-hidden rounded-[18px]">

            <PrismicNextImage
              field={story.data.hero_image}
              className="h-auto w-full object-cover"
            />

          </div>

        </section>
      )}

      {/* =========================================
          STORY CONTENT
          ========================================= */}

      <section className="mx-auto w-full max-w-[900px] px-6 py-16 md:px-10 md:py-24">

        <SliceZone
          slices={story.data.slices}
          components={components}
        />

      </section>

    </main>
  );
}


// =============================================
// SEO
// =============================================

export async function generateMetadata({ params }) {
  const { uid } = await params;

  const client = createClient();

  try {
    const story = await client.getByUID(
      "people_of_akanksha_story",
      uid
    );

    return {
      title: story.data.title,
    };
  } catch {
    return {
      title: "People of Akanksha",
    };
  }
}