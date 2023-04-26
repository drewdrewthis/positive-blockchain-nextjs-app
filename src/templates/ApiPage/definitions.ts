import { Project } from "@/types";

// VSCode will generate this
const fakeProject: Required<Project> = {
  slug: "slug",
  project_name: "project_name",
  active: "active",
  website: "website",
  categories_list: ["main_category", "sub_category1", "sub_category2"],
  main_category: "main_category",
  sub_categories_list: ["sub_category1", "sub_category2"],
  description_short_value_proposition_in_a_tweet:
    "description_short_value_proposition_in_a_tweet",
  sdg_occurrences_list: ["1", "2", "3"],
  long_description: "long_description",
  tags_keywords_list: ["tag1", "tag2", "tag3"],
  business_tagline: "business_tagline",
  primary_headquarter_city: "primary_headquarter_city",
  primary_headquarter_country: "primary_headquarter_country",
  secondary_headquarter_city: "secondary_headquarter_city",
  secondary_headquarter_country: "secondary_headquarter_country",
  hq_region: "hq_region",
  hq_subregion: "hq_subregion",
  year_creation: "year_creation",
  founder_names_list: "Bob, Alice",
  organization_type: "organization_type",
  twitter_url: "twitter_url",
  facebook_url: "facebook_url",
  linkedin_url: "linkedin_url",
  discord_url: "discord_url",
  video_url: "video_url",
  other_links_list: "other_url",
  white_paper_url: "white_paper_url",
  coin_market_cap_url: "coin_market_cap_url",
  github_url: "github_url",
  logo_url: "logo_url",
  token_ticker: "token_ticker",
  blockchain_type: "blockchain_type",
  blockchain_technology: "blockchain_technology",
  coinmarketcap_url: "coinmarketcap_url",
  github_link: "github_link",
  sponsors_partners_list: ["sponsor1", "sponsor2", "sponsor3"],
  servicing_area: "servicing_area",
  servicing_region: "servicing_region",
  subregions_list: "West Africa, East Africa",
  pb_partner_tag: "pb_partner_tag",
};

export const projectProperties = Object.keys(fakeProject).reduce((acc, key) => {
  acc[key] = { type: "string" };
  return acc;
}, {} as Record<string, { type: string }>);
