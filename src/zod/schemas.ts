/**
 * projectSchema
 *
 * This file defines the Zod schema for validating project data.
 * Zod is a TypeScript-first schema validation library that provides a simple and expressive API for defining schemas.
 *
 * For more information, visit: https://github.com/colinhacks/zod
 */

import { z } from "zod";

/**
 * projectSchema defines the schema for validating project data.
 */
export const projectSchema = z.object({
  slug: z.string(),
  project_name: z.string(),
  active: z.string(),
  website: z.string(),
  categories_list: z.array(z.string()),
  main_category: z.string(),
  sub_categories_list: z.array(z.string()),
  sdg_occurrences_list: z.array(z.string()),
  description_short_value_proposition_in_a_tweet: z.string(),
  long_description: z.string(),
  tags_keywords_list: z.array(z.string()),
  business_tagline: z.string(),
  primary_headquarter_city: z.string(),
  primary_headquarter_country: z.string(),
  secondary_headquarter_city: z.string(),
  secondary_headquarter_country: z.string(),
  hq_region: z.string(),
  hq_subregion: z.string(),
  year_creation: z.string(),
  founder_names_list: z.string(),
  organization_type: z.string(),
  twitter_url: z.string(),
  facebook_url: z.string(),
  linkedin_url: z.string(),
  discord_url: z.string(),
  video_url: z.string(),
  white_paper_url: z.string(),
  coin_market_cap_url: z.string(),
  github_url: z.string(),
  other_links_list: z.string(),
  logo_url: z.string(),
  token_ticker: z.string(),
  blockchain_type: z.string(),
  blockchain_technology: z.string(),
  coinmarketcap_url: z.string().optional(),
  github_link: z.string().optional(),
  sponsors_partners_list: z.array(z.string()).optional(),
  servicing_area: z.string().optional(),
  servicing_region: z.string().optional(),
  subregions_list: z.string().optional(),
  pb_partner_tag: z.string().optional(),
});

/**
 * filtersSchema defines the schema for validating filters data.
 */
export const filtersSchema = z.object({
  active: z.array(z.string()),
  main_category: z.array(z.string()),
  sub_categories: z.array(z.string()),
  blockchain_type: z.array(z.string()),
  primary_headquarter_country: z.array(z.string()),
  servicing_area: z.array(z.string()),
  servicing_region: z.array(z.string()),
  blockchain_technology: z.array(z.string()),
});

export const uploadProjectScema = z.array(z.array(z.string()));
