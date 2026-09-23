"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { PrismicNextImage } from "@prismicio/next";

import Button from "@/components/v2-components/buttons/button";

export default function PeopleOfAkankshaListing({
  stories,
  tags,
  search,
  selectedTag,
  totalStories,
  currentPage,
  totalPages,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [searchValue, setSearchValue] = useState(search || "");

  // =========================================
  // SEARCH
  // =========================================

  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams();

      const trimmedSearch = searchValue.trim();

      if (trimmedSearch) {
        params.set("search", trimmedSearch);
      }

      if (selectedTag) {
        params.set("tag", selectedTag);
      }

      params.set("page", "1");

      const queryString = params.toString();

      router.replace(
        queryString
          ? `${pathname}?${queryString}`
          : pathname,
        {
          scroll: false,
        }
      );
    }, 500);

    return () => clearTimeout(timeout);
  }, [
    searchValue,
    selectedTag,
    pathname,
    router,
  ]);

  // =========================================
  // TAG FILTER
  // =========================================

  const handleTagChange = (tag) => {
    const params = new URLSearchParams();

    const trimmedSearch = searchValue.trim();

    if (trimmedSearch) {
      params.set("search", trimmedSearch);
    }

    if (tag) {
      params.set("tag", tag);
    }

    params.set("page", "1");

    const queryString = params.toString();

    router.replace(
      queryString
        ? `${pathname}?${queryString}`
        : pathname,
      {
        scroll: false,
      }
    );
  };

  return (
    <section className="w-full">

      {/* =========================================
          LISTING INTRO
          ========================================= */}

      <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-16 text-center md:px-10 md:pb-20 md:pt-20 lg:px-12">
        <div className="mx-auto max-w-[900px]">

          <p className="font-ambit-regular text-lg text-black sm:text-xl">
            Browse our collection
          </p>

          <h2 className="mt-4 font-ambit-regular text-4xl leading-[1.05] text-black sm:text-5xl lg:text-7xl">
            All Stories
          </h2>

          <p className="mx-auto mt-6 max-w-[800px] font-ambit-regular text-base leading-7 text-black sm:text-lg md:w-[80%]">
            Explore {totalStories} authentic stories from students,
            parents, teachers, and staff who form the heart of
            Akanksha Education Fund.
          </p>

        </div>
      </div>

      {/* =========================================
          SEARCH + FILTERS
          ========================================= */}

      <div>
        <div className="mx-auto flex max-w-[1440px] flex-col gap-6 px-6 py-8 md:px-10 lg:flex-row lg:items-center lg:px-12">

          {/* Search */}

          <div className="relative w-full lg:max-w-[520px]">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-5 top-1/2 -translate-y-1/2 text-black"
              aria-hidden="true"
            >
              <circle
                cx="11"
                cy="11"
                r="8"
              />

              <path d="m21 21-4.3-4.3" />
            </svg>

            <input
              type="text"
              value={searchValue}
              onChange={(event) =>
                setSearchValue(event.target.value)
              }
              placeholder="Search stories by name, role, or keyword..."
              className="h-[58px] w-full rounded-[20px] border border-[#C2BFB7] bg-transparent pl-14 pr-5 font-ambit-regular text-base text-black outline-none transition-all placeholder:text-[#666] focus:border-black sm:text-lg"
            />

          </div>

          {/* Filters */}

          <div className="flex flex-wrap items-center gap-3">

            <div className="flex items-center gap-2 font-ambit-semibold text-base text-black">

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19"
                height="19"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line
                  x1="4"
                  x2="20"
                  y1="6"
                  y2="6"
                />

                <line
                  x1="7"
                  x2="17"
                  y1="12"
                  y2="12"
                />

                <line
                  x1="10"
                  x2="14"
                  y1="18"
                  y2="18"
                />
              </svg>

              <span>Filter:</span>

            </div>

            <FilterButton
              label={`All (${totalStories})`}
              active={!selectedTag}
              onClick={() =>
                handleTagChange("")
              }
            />

            {tags.map(([tag, count]) => (
              <FilterButton
                key={tag}
                label={`${tag} (${count})`}
                active={selectedTag === tag}
                onClick={() =>
                  handleTagChange(tag)
                }
              />
            ))}

          </div>

        </div>
      </div>

      {/* =========================================
          STORIES
          ========================================= */}

      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 lg:px-12">

        {stories.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

            {stories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
              />
            ))}

          </div>
        ) : (
          <div className="py-20 text-center">

            <p className="font-ambit-regular text-xl">
              No stories found.
            </p>

          </div>
        )}

        {/* =========================================
            PAGINATION
            ========================================= */}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            search={searchValue}
            selectedTag={selectedTag}
          />
        )}

      </div>

    </section>
  );
}


// =============================================
// FILTER BUTTON
// =============================================

function FilterButton({
  label,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-6 py-2 font-ambit-regular text-md transition-all ${
        active
          ? "border-black bg-black text-white"
          : "border-black bg-transparent text-black hover:border-black hover:bg-black hover:text-white"
      }`}
    >
      {label}
    </button>
  );
}


// =============================================
// PAGINATION
// =============================================

function Pagination({
  currentPage,
  totalPages,
  search,
  selectedTag,
}) {
  const router = useRouter();
  const pathname = usePathname();

  const createPageUrl = (page) => {
    const params = new URLSearchParams();

    if (search?.trim()) {
      params.set(
        "search",
        search.trim()
      );
    }

    if (selectedTag) {
      params.set(
        "tag",
        selectedTag
      );
    }

    params.set(
      "page",
      String(page)
    );

    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page) => {
    router.push(
      createPageUrl(page),
      {
        scroll: false,
      }
    );
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="mt-16 flex items-center justify-center gap-4">

      {/* =========================================
          PREVIOUS
          ========================================= */}

      {currentPage > 1 && (
        <Button
          showArrow
          rev
          onClick={() =>
            handlePageChange(currentPage - 1)
          }
        >
          Prev
        </Button>
      )}

      {/* =========================================
          NEXT
          ========================================= */}

      {currentPage < totalPages && (
        <Button
          showArrow
          onClick={() =>
            handlePageChange(currentPage + 1)
          }
        >
          Next
        </Button>
      )}

    </div>
  );
}


// =============================================
// STORY CARD
// =============================================

function StoryCard({ story }) {
  return (
    <Link
      href={`/people-of-akanksha/${story.uid}`}
      className="group block"
    >
      <div className="rounded-[24px] border border-[#C2BFB7] p-4 transition-all duration-300 hover:border-black">

        {/* Image */}

        {story.data.hero_image && (
          <div className="overflow-hidden rounded-[18px]">

            <div className="h-[230px] w-full sm:h-[250px] lg:h-[260px]">

              <PrismicNextImage
                field={story.data.hero_image}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />

            </div>

          </div>
        )}

        {/* Content */}

        <div className="pt-5">

          {/* Tag */}

          {story.tags?.length > 0 && (
            <div className="inline-flex rounded-full border border-black bg-transparent px-5 py-2 font-ambit-regular text-sm text-black">
              {story.tags[0]}
            </div>
          )}

          {/* Title */}

          {story.data.title && (
            <h2 className="mt-4 font-ambit-semibold text-xl leading-[1.1] text-black sm:text-2xl">
              {story.data.title}
            </h2>
          )}

          {/* Author */}

          {story.data.author_name && (
            <p className="mt-4 font-ambit-semibold text-base text-black">
              {story.data.author_name}
            </p>
          )}

          {/* Role */}

          {story.data.role && (
            <p className="mt-1 font-ambit-regular text-sm leading-5 text-black">
              {story.data.role}
            </p>
          )}

        </div>

      </div>
    </Link>
  );
}