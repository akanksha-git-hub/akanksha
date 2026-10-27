
import * as prismic from "@prismicio/client";
import { SliceZone } from "@prismicio/react";

import { createClient } from "@/prismicio";
import { components } from "@/slices";
import PeopleOfAkankshaListing from "@/components/v2-components/PeopleOfAkankshaListing";

export default async function Page({ searchParams }) {
  const {
    search = "",
    page: pageParam = "1",
  } = await searchParams;

  const client = createClient();

  const pageNumber = Math.max(1, Number(pageParam) || 1);
  const searchTerm = search.trim();

  // Get landing page
  const page = await client.getSingle("people_of_akanksha");

  // Build search filters
  const filters = [];

  if (searchTerm) {
    filters.push(
      prismic.filter.fulltext("document", searchTerm)
    );
  }

  // Get paginated stories
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
      pageSize: 12,
    }
  );

  // Get total count matching the search
  const allStories = await client.getAllByType(
    "people_of_akanksha_story",
    {
      filters,
    }
  );

  return (
    <main className="w-full">
      <SliceZone
        slices={page.data.slices}
        components={components}
      />

      <PeopleOfAkankshaListing
        stories={stories.results}
        search={searchTerm}
        totalStories={allStories.length}
        currentPage={stories.page}
        totalPages={stories.total_pages}
      />
    </main>
  );
}

export async function generateMetadata() {
  const client = createClient();
  const page = await client.getSingle("people_of_akanksha");

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  };
}