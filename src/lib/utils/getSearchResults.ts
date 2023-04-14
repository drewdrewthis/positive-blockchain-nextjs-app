import Fuse from "fuse.js";
import type { Project } from "../../types";

const options: Fuse.IFuseOptions<Project> = {
  includeScore: true,
  ignoreLocation: true,
  keys: [
    {
      name: "project_name",
      weight: 2,
    },
    "categories",
    "description_short_value_proposition_in_a_tweet",
    "long_description",
    "tags_keywords",
    "business_tagline",
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

export async function getSearchResults(
  projectData: Project[],
  searchTerm: string
): Promise<Fuse.FuseResult<Project>[]> {
  const fuse = new Fuse(projectData, options);
  const results = fuse.search(searchTerm);
  // const filteredResults = results.filter(
  //   (result) => !!result.score && result.score < 0.1
  // );
  // console.log("fuse results", filteredResults);
  return new Promise((resolve) => {
    resolve(results);
  });
}
