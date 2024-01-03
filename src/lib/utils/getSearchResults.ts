import type { Project } from "@/types";

import Fuse from "fuse.js";

// Configuration options for Fuse.js
const options: Fuse.IFuseOptions<Project> = {
  threshold: 0.1,
  includeScore: true,
  ignoreLocation: true,
  location: 0,
  keys: [
    {
      name: "project_name",
      weight: 3,
    },
    {
      name: "main_category",
      weight: 3,
    },
    {
      name: "sub_categories",
      weight: 2,
    },
    {
      name: "description_short_value_proposition_in_a_tweet",
      weight: 3,
    },
    {
      name: "long_description",
      weight: 2,
    },
    {
      name: "tags_keywords",
      weight: 2,
    },
    {
      name: "tags_keywords",
      weight: 3,
    },
    {
      name: "business_tagline",
      weight: 2,
    },
    "categories",
    "primary_headquarter_city",
    "primary_headquarter_country",
    "secondary_headquarter_city",
    "secondary_headquarter_country",
    "hq_region",
    "hq_subregion",
    "founder_names?",
    "token_ticker?",
    "blockchain_type?",
    "blockchain_technology?",
    "coinmarketcap_url?",
    "sponsors_partners?",
    "servicing_area?",
    "servicing_region?",
    "subregions?",
    "global_north_south?",
  ],
};

/**
 * Performs a search for project data based on a search term using Fuse.js.
 * @param projectData - The project data array to search within.
 * @param searchTerm - The search term to match against.
 * @returns A Promise that resolves to an array of search results with scores.
 */
export async function getSearchResults(
  projectData: Project[],
  searchTerm: string
): Promise<Fuse.FuseResult<Project>[]> {
  // Create a new Fuse instance with the project data and options
  const fuse = new Fuse(projectData, options);

  // Perform the search using Fuse.js
  const results = fuse.search(searchTerm);

  // Wrap the results in a Promise and resolve
  return new Promise((resolve) => {
    resolve(results);
  });
}
