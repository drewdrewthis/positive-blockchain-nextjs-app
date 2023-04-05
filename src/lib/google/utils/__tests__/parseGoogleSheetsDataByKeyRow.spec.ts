import { parseGoogleSheetValuesByKeyRow } from "..";
import values from "./sampleData/sample-sheets-values.json";

describe("parseGoogleSheets", () => {
  it("should parse a google sheet", () => {
    const data = parseGoogleSheetValuesByKeyRow(values);

    expect(data[0]).toMatchObject(
      expect.objectContaining({
        slug: "token-engineering-commons-tec",
        "": "",
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
        sub_categories_list: [
          "Financial Inclusion",
          "Community Mobilization",
          "",
        ],
        sub_categories_1: "Financial Inclusion",
        sub_categories_2: "Community Mobilization",
        sub_categories_3: "",
        sub_categories_4: "",
        first_sdg: "1, 17",
        second_sdg: "11, 16",
        third_sdg: "",
        fourth_sdg: "",
        sdg_occurences_list: ["", "1", "17", "11", "16", ""],
        number_of_sd_gs_list: ["4"],
        description_short_value_proposition_in_a_tweet:
          "an initiative all about designing, modeling, and simulating tokenized ecosystems. The Token Engineering Commons seeks to be the mecca for this nascent discipline, funding and supporting projects that want to develop research, education materials, open source software, and initiatives that want to grow our collective understanding and proper usage of crypto-economic systems.",
        long_description:
          "Within our partners’ goal of funding digital public goods, the scope of TEC’s mission is specific to funding token engineering-related digital public goods. For example, we’ve created a Commons Configuration Dashboard (https://config.tecommons.org), which is open source and free to use, where users can input different values for the parameters that support a collaborative economy (i.e. a DAO). Then, the dashboard calculates how one variable affects the other variables and displays a graph that allows one to visualize the different interrelationships between input and behaviour.",
        tags_keywords_list: [""],
        business_tagline: "",
        primary_headquarter_city: "",
        primary_headquarter_country: "Distributed",
        secondary_headquarter_city: "",
        secondary_headquarter_country: "",
        hq_region: "#N/A",
        hq_subregion: "#N/A",
        year_creation: "2020",
        founder_names_list: [""],
        organization_type: "DAO",
        twitter_url: "",
        facebook_url: "",
        linkedin_url: "",
        discord_url: "",
        video_url: "https://www.youtube.com/watch?v=vf1rOMDzw38",
        white_paper_url: "",
        coin_market_cap_url: "",
        github_url: "",
        other_links_list: [""],
        logo_url: "",
        token_ticker: "TEC",
        blockchain_type: "Public",
        blockchain_technology: "Gardens, xDAI",
        coinmarketcap_url: "",
        github_link: "https://github.com/CommonsBuild/tec-info",
        sponsors_partners_list: [""],
        servicing_area: "Global",
        servicing_region: "Global",
        subregions_list: ["Global"],
      })
    );
  });
});
