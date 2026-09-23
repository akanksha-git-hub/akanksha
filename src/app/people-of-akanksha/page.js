import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import PeopleOfAkankshaListing from "@/components/v2-components/PeopleOfAkankshaListing";

export default async function Page({ searchParams }) {
  const {
    search = "",
    tag = "",
    page: pageParam = "1",
  } = await searchParams;

  const client = createClient();

  // Make sure page is always a valid number
  const pageNumber = Math.max(
    1,
    Number(pageParam) || 1
  );

  // -----------------------------------------
  // Get landing page
  // -----------------------------------------

  const page = await client.getSingle(
    "people_of_akanksha"
  );

  // -----------------------------------------
  // Build filters
  // -----------------------------------------

  const filters = [];

  // Search across the story document
  if (search.trim()) {
    filters.push(
      prismic.filter.fulltext(
        "document",
        search.trim()
      )
    );
  }

  // Filter by Prismic document tag
  if (tag.trim()) {
    filters.push(
      prismic.filter.any(
        "document.tags",
        [tag.trim()]
      )
    );
  }

  // -----------------------------------------
  // Get paginated stories
  // -----------------------------------------

  const stories = await client.getByType(
    "people_of_akanksha_story",
    {
      filters,

      orderings: [
        {
          field: "document.last_publication_date",
          direction: "desc",
        },
      ],

      page: pageNumber,

      // Change this number if you want
      // 6, 9, 12, etc.
      pageSize: 12,
    }
  );

  // -----------------------------------------
  // Get ALL stories
  //
  // Used only for:
  // - total story count
  // - tag list
  // - tag counts
  // -----------------------------------------

  const allStories = await client.getAllByType(
    "people_of_akanksha_story"
  );

  // -----------------------------------------
  // Build tag counts
  // -----------------------------------------

  const tagMap = new Map();

  allStories.forEach((story) => {
    story.tags?.forEach((storyTag) => {
      tagMap.set(
        storyTag,
        (tagMap.get(storyTag) || 0) + 1
      );
    });
  });

  const tags = Array.from(tagMap.entries()).sort(
    (a, b) => a[0].localeCompare(b[0])
  );

  // -----------------------------------------
  // Render
  // -----------------------------------------

  return (
    <main className="w-full">

      {/* CMS Landing Page */}
      <SliceZone
        slices={page.data.slices}
        components={components}
      />

      {/* Stories */}
      <PeopleOfAkankshaListing
        stories={stories.results}
        tags={tags}
        search={search}
        selectedTag={tag}
        totalStories={allStories.length}
        currentPage={stories.page}
        totalPages={stories.total_pages}
      />

    </main>
  );
}

// -----------------------------------------
// SEO
// -----------------------------------------

export async function generateMetadata() {
  const client = createClient();

  const page = await client.getSingle(
    "people_of_akanksha"
  );

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}