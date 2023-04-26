import { parseGoogleSheetsData } from "../parseGoogleSheetsData";
import { SAMPLE_DATA } from "./sample-data";

describe("parseGoogleSheets", () => {
  it("should parse a google sheet", () => {
    const data = parseGoogleSheetsData(SAMPLE_DATA, {
      headerRow: 6,
      keyRow: 2,
    });

    expect(data[2]).toMatchObject(
      expect.objectContaining({
        slug: "tra-seable-solutions",
        project_name: "TraSeable Solutions",
        active: "Active",
        website: "https://traseable.com",
        categories_list: [
          "Agriculture & Food",
          "Logistics & Traceability",
          "Climate & Environment",
        ],
        main_category: "Agriculture & Food",
        sub_categories_list: [
          "Supply Chain Transparency",
          "Food Transparency",
          "Life below Water",
        ],
        sdg_occurrences_list: ["8", "12", "2", "15", "14"],
        description_short_value_proposition_in_a_tweet:
          "the seafood supply chain, providing the full transparency and traceability required to enable the market to reward responsible and ethical producers, and push those that are illegal and unethical out of the supply chain.",
        long_description:
          "TraSeable Solutions supports global seafood sustainability through a blockchain-ready software-as-a-service (SaaS) platform for seafood traceability that fosters collaboration between stakeholders, leverages and integrates Internet of Things (IoT) technology.                                                                                                                                                       To promote transparency and traceability by providing an adaptable, affordable, secure, and collaborative platform that allows for efficient information sharing between all supply chain stakeholders.                                                                                                                                                                                           To help alleviate Illegal, Unregulated and Unreported (IUU) fishing within the Pacific and support responsible fishing practices.\n" +
          "To connect consumers to product provenance and authenticity through product story.           ",
        tags_keywords_list: [],
        business_tagline: "",
        primary_headquarter_city: "",
        primary_headquarter_country: "Fiji",
        secondary_headquarter_city: "",
        secondary_headquarter_country: "",
        hq_region: "Oceania",
        hq_subregion: "Oceania",
        year_creation: "2017",
        founder_names_list: ["Kenneth Katafono", "FOUNDER & MANAGING DIRECTOR"],
        organization_type: "start-up",
        twitter_url: "",
        facebook_url: "",
        linkedin_url: "https://www.linkedin.com/company/traseablefiji/about/",
        discord_url: "",
        video_url: "",
        white_paper_url: "",
        coin_market_cap_url: "",
        github_url: "",
        other_links_list: ["https://viant.io/"],
        logo_url: "",
        token_ticker: "",
        blockchain_type: "Private",
        blockchain_technology: "Ethereum, Treum",
        coinmarketcap_url: "",
        github_link: "",
        sponsors_partners_list: ["Viant", "Consensys", "WWF NZ"],
        servicing_area: "Fiji",
        servicing_region: "",
        subregions_list: [],
        pb_partner_tag: "",
      })
    );
  });
});
