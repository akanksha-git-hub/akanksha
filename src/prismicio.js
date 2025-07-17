import * as prismic from "@prismicio/client";
import * as prismicNext from "@prismicio/next";
import config from "../slicemachine.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || config.repositoryName;

/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 *
 * @type {prismic.ClientConfig["routes"]}
 */
// T-1797 Update the routes array to match your project's route structure.

const routes = [
  // Examples:
  {
    type: "home",
    path: "/",
  },
  {
    type: "donor_page",
    path: "/donate",
  },
  {
    type: "vision_mission",
    path: "/about/vision_mission",
  },
  {
    type: "timeline",
    path: "/about/timeline",
  },
  {
    type: "partnerships",
    path: "/about/partnerships",
  },
  {
    type: "ourdonors",
    path: "/about/our-supporters",
  },
  {
    type: "core_values",
    path: "/about/core-values",
  },
  {
    type: "our_approach",
    path: "/about/our-approach",
  },
 
  {
    type: "our_people",
    path: "/our-people/:uid",
  },
  {
    type: "work_with_us",
    path: "/join-us/work-with-us",
  },
  {
    type: "volunteer_with_us",
    path: "/join-us/volunteer-with-us",
  },
  {
    type: "contact",
    path: "/join-us/contact",
  },
  {
    type: "financials",
    path: "/resources/financials",
  },
  {
    type: "reports",
    path: "/resources/reports",
  },
  {
    type: "annual_reports",
    path: "/resources/annual-reports",
  },
  {
    type: "films",
    path: "/resources/films",
  },
  {
    type: "news_letter",
    path: "/resources/in-the-news",
  },
  {
    type: "blog_showcase_page",
    path: "/resources/blogs",
  },
  {
    type: "blog_child_page",
    path: "/resources/blogs/:uid",
  },
  {
    type: "project_setu",
    path: "/key-programs/project-setu",
  },
  {
    type: "school_project",
    path: "/key-programs/school-project",
  },
  {
    type: "ase",
    path: "/key-programs/ase",
  },
  {
    type: "privacy_policy",
    path: "/privacy-policy",
  },
   {
    type: "terms_and_conditions",
    path: "/terms-and-conditions",
  },
  {
    type: "impact",
    path: "/our-impact",
  },
  {
    type: "locations",
    path: "/locations",
  },
  {
    type: "newsletter",
    path: "/news-letter",
  },
  {
    type: "art_for_akanksha",
    path: "/art-for-akanksha",
  },
  {
    type: "award",
    path: "/awards",
  },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param {prismicNext.CreateClientConfig} config - Configuration for the Prismic client.
 */
export const createClient = (config = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions:
      process.env.NODE_ENV === "production"
        ? { next: { tags: ["prismic"] }, cache: "force-cache" }
        : { next: { revalidate: 5 } },
    ...config,
  });

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  });

  return client;
};
