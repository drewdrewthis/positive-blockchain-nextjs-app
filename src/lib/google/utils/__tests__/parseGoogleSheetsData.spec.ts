import {
  parseGoogleSheetsData,
  removePrivateFields,
  stripPublicPrefixFromKeys,
} from "../parseGoogleSheetsData";

import { SAMPLE_DATA } from "./sample-data";

describe("parseGoogleSheets", () => {
  const data = parseGoogleSheetsData(SAMPLE_DATA, {
    headerRow: 6,
    keyRow: 2,
  });

  it("should parse a google sheet", () => {
    expect(data[0].slug).toEqual("token-engineering-commons-tec");
    expect(data[2]).toMatchObject(
      expect.objectContaining({
        slug: "tra-seable-solutions",
        submitted_at: "",
        original_source_name: "PB contributor (add or edit): : Azusa",
        original_source_organization: "Positiveblockchain",
        verification_status: "",
        verified_by: "",
        verified_on: "",
        comment: "0.513",
        ref: "177",
        PUBLIC_project_name: "TraSeable Solutions",
        PUBLIC_active: "Active",
        PUBLIC_website: "https://traseable.com",
        PUBLIC_categories_list: [
          "Agriculture & Food",
          "Logistics & Traceability",
          "Climate & Environment",
        ],
        PUBLIC_main_category: "Agriculture & Food",
        PUBLIC_sub_categories_list: [
          "Supply Chain Transparency",
          "Food Transparency",
          "Life below Water",
        ],
        sub_categories_1: "Supply Chain Transparency",
        sub_categories_2: "Food Transparency",
        sub_categories_3: "Biodiversity",
        sub_categories_4: "",
        first_sdg: "45,268",
        second_sdg: "2, 15",
        third_sdg: "14, 15",
        fourth_sdg: "",
        PUBLIC_sdg_occurrences_list: ["8", "12", "2", "15", "14"],
        number_of_sd_gs_list: ["6"],
        PUBLIC_description_short_value_proposition_in_a_tweet:
          "the seafood supply chain, providing the full transparency and traceability required to enable the market to reward responsible and ethical producers, and push those that are illegal and unethical out of the supply chain.",
        PUBLIC_long_description:
          "TraSeable Solutions supports global seafood sustainability through a blockchain-ready software-as-a-service (SaaS) platform for seafood traceability that fosters collaboration between stakeholders, leverages and integrates Internet of Things (IoT) technology.                                                                                                                                                       To promote transparency and traceability by providing an adaptable, affordable, secure, and collaborative platform that allows for efficient information sharing between all supply chain stakeholders.                                                                                                                                                                                           To help alleviate Illegal, Unregulated and Unreported (IUU) fishing within the Pacific and support responsible fishing practices.\n" +
          "To connect consumers to product provenance and authenticity through product story.           ",
        PUBLIC_tags_keywords_list: [],
        PUBLIC_business_tagline: "",
        PUBLIC_primary_headquarter_city: "",
        PUBLIC_primary_headquarter_country: "Fiji",
        PUBLIC_secondary_headquarter_city: "",
        PUBLIC_secondary_headquarter_country: "",
        PUBLIC_hq_region: "Oceania",
        PUBLIC_hq_subregion: "Oceania",
        PUBLIC_year_creation: "2017",
        PUBLIC_founder_names_list: [
          "Kenneth Katafono",
          "FOUNDER & MANAGING DIRECTOR",
        ],
        PUBLIC_organization_type: "start-up",
        PUBLIC_twitter_url: "",
        PUBLIC_facebook_url: "",
        PUBLIC_linkedin_url:
          "https://www.linkedin.com/company/traseablefiji/about/",
        PUBLIC_discord_url: "",
        PUBLIC_video_url: "",
        PUBLIC_white_paper_url: "",
        PUBLIC_coin_market_cap_url: "",
        PUBLIC_github_url: "",
        PUBLIC_other_links_list: ["https://viant.io/"],
        PUBLIC_logo_url: "",
        PUBLIC_token_ticker: "",
        PUBLIC_blockchain_type: "Private",
        PUBLIC_blockchain_technology: "Ethereum, Treum",
        PUBLIC_coinmarketcap_url: "",
        PUBLIC_github_link: "",
        PUBLIC_sponsors_partners_list: ["Viant", "Consensys", "WWF NZ"],
        PUBLIC_servicing_area: "Fiji",
        PUBLIC_servicing_region: "",
        PUBLIC_subregions_list: [],
        PUBLIC_pb_partner_tag: "",
      })
    );
  });
});

describe("removePrivateFields", () => {
  it("should remove private fields", () => {
    const data = parseGoogleSheetsData(SAMPLE_DATA, {
      headerRow: 6,
      keyRow: 2,
    });

    const result = data.map(removePrivateFields);

    expect(result[0].slug).toEqual("token-engineering-commons-tec");
    expect(result[0]).toEqual({
      slug: "token-engineering-commons-tec",
      PUBLIC_project_name: "Token Engineering Commons (TEC)",
      PUBLIC_active: "Active",
      PUBLIC_website: "https://tecommons.org/",
      PUBLIC_categories_list: ["Government & Democracy", "Finance & Insurance"],
      PUBLIC_main_category: "Finance & insurance",
      PUBLIC_sub_categories_list: [
        "Financial Inclusion",
        "Community Mobilization",
      ],
      PUBLIC_sdg_occurrences_list: ["1", "17", "11", "16"],
      PUBLIC_description_short_value_proposition_in_a_tweet:
        "an initiative all about designing, modeling, and simulating tokenized ecosystems. The Token Engineering Commons seeks to be the mecca for this nascent discipline, funding and supporting projects that want to develop research, education materials, open source software, and initiatives that want to grow our collective understanding and proper usage of crypto-economic systems.",
      PUBLIC_long_description:
        "Within our partners’ goal of funding digital public goods, the scope of TEC’s mission is specific to funding token engineering-related digital public goods. For example, we’ve created a Commons Configuration Dashboard (https://config.tecommons.org), which is open source and free to use, where users can input different values for the parameters that support a collaborative economy (i.e. a DAO). Then, the dashboard calculates how one variable affects the other variables and displays a graph that allows one to visualize the different interrelationships between input and behaviour.",
      PUBLIC_tags_keywords_list: [],
      PUBLIC_business_tagline: "",
      PUBLIC_primary_headquarter_city: "",
      PUBLIC_primary_headquarter_country: "Distributed",
      PUBLIC_secondary_headquarter_city: "",
      PUBLIC_secondary_headquarter_country: "",
      PUBLIC_hq_region: "#N/A",
      PUBLIC_hq_subregion: "#N/A",
      PUBLIC_year_creation: "2020",
      PUBLIC_founder_names_list: [],
      PUBLIC_organization_type: "DAO",
      PUBLIC_twitter_url: "",
      PUBLIC_facebook_url: "",
      PUBLIC_linkedin_url: "",
      PUBLIC_discord_url: "",
      PUBLIC_video_url: "https://www.youtube.com/watch?v=vf1rOMDzw38",
      PUBLIC_white_paper_url: "",
      PUBLIC_coin_market_cap_url: "",
      PUBLIC_github_url: "",
      PUBLIC_other_links_list: [],
      PUBLIC_logo_url: "",
      PUBLIC_token_ticker: "TEC",
      PUBLIC_blockchain_type: "Public",
      PUBLIC_blockchain_technology: "Gardens, xDAI",
      PUBLIC_coinmarketcap_url: "",
      PUBLIC_github_link: "https://github.com/CommonsBuild/tec-info",
      PUBLIC_sponsors_partners_list: [],
      PUBLIC_servicing_area: "Global",
      PUBLIC_servicing_region: "Global",
      PUBLIC_subregions_list: ["Global"],
    });
  });
});

describe("stripPublicPrefixFromKeys", () => {
  it("should strip PUBLIC prefix", () => {
    const data = parseGoogleSheetsData(SAMPLE_DATA, {
      headerRow: 6,
      keyRow: 2,
    });

    const result = data.map(stripPublicPrefixFromKeys);

    expect(result[0].slug).toEqual("token-engineering-commons-tec");
    expect(result[0]).toEqual({
      slug: "token-engineering-commons-tec",
      submitted_at: "",
      original_source_name: "pb website form",
      original_source_organization: "Positiveblockchain",
      verification_status: "",
      verified_by: "",
      verified_on: "",
      comment: "0.424",
      ref: "1141",
      project_name: "Token Engineering Commons (TEC)",
      active: "Active",
      website: "https://tecommons.org/",
      categories_list: ["Government & Democracy", "Finance & Insurance"],
      main_category: "Finance & insurance",
      sub_categories_list: ["Financial Inclusion", "Community Mobilization"],
      sub_categories_1: "Financial Inclusion",
      sub_categories_2: "Community Mobilization",
      sub_categories_3: "",
      sub_categories_4: "",
      first_sdg: "1, 17",
      second_sdg: "11, 16",
      third_sdg: "",
      fourth_sdg: "",
      sdg_occurrences_list: ["1", "17", "11", "16"],
      number_of_sd_gs_list: ["4"],
      description_short_value_proposition_in_a_tweet:
        "an initiative all about designing, modeling, and simulating tokenized ecosystems. The Token Engineering Commons seeks to be the mecca for this nascent discipline, funding and supporting projects that want to develop research, education materials, open source software, and initiatives that want to grow our collective understanding and proper usage of crypto-economic systems.",
      long_description:
        "Within our partners’ goal of funding digital public goods, the scope of TEC’s mission is specific to funding token engineering-related digital public goods. For example, we’ve created a Commons Configuration Dashboard (https://config.tecommons.org), which is open source and free to use, where users can input different values for the parameters that support a collaborative economy (i.e. a DAO). Then, the dashboard calculates how one variable affects the other variables and displays a graph that allows one to visualize the different interrelationships between input and behaviour.",
      tags_keywords_list: [],
      business_tagline: "",
      primary_headquarter_city: "",
      primary_headquarter_country: "Distributed",
      secondary_headquarter_city: "",
      secondary_headquarter_country: "",
      hq_region: "#N/A",
      hq_subregion: "#N/A",
      year_creation: "2020",
      founder_names_list: [],
      organization_type: "DAO",
      twitter_url: "",
      facebook_url: "",
      linkedin_url: "",
      discord_url: "",
      video_url: "https://www.youtube.com/watch?v=vf1rOMDzw38",
      white_paper_url: "",
      coin_market_cap_url: "",
      github_url: "",
      other_links_list: [],
      logo_url: "",
      token_ticker: "TEC",
      blockchain_type: "Public",
      blockchain_technology: "Gardens, xDAI",
      coinmarketcap_url: "",
      github_link: "https://github.com/CommonsBuild/tec-info",
      sponsors_partners_list: [],
      servicing_area: "Global",
      servicing_region: "Global",
      subregions_list: ["Global"],
    });
  });
});
