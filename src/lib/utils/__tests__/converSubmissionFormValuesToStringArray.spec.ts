import { convertSubmissionFormValuesToStringArray } from "../convertSubmissionFormValuesToStringArray";
import submissionValues from "./submission_values.json";

jest.useFakeTimers();
jest.setSystemTime(new Date("2017-01-01"));

describe("convertSubmissionFormValuesToStringArray", () => {
  const keyColumnMapForSubmission = {
    key: 0,
    "This key needs to correspond to a field in the database if it is to be easily merged": 1,
    is_positive_blockchain_project: 2,
    PUBLIC_project_name: 3,
    PUBLIC_active: 4,
    PUBLIC_website: 5,
    PUBLIC_main_category: 6,
    category_1: 7,
    category_2: 8,
    sub_category_1: 9,
    sub_category_2: 10,
    sub_category_3: 11,
    PUBLIC_sub_categories_list: 12,
    PUBLIC_categories_list: 13,
    PUBLIC_description_short_value_proposition_in_a_tweet: 14,
    PUBLIC_long_description: 15,
    PUBLIC_business_tagline: 16,
    PUBLIC_tags_keywords_list: 17,
    PUBLIC_year_creation: 18,
    PUBLIC_founder_names_list: 19,
    PUBLIC_primary_headquarter_city: 20,
    PUBLIC_primary_headquarter_country: 21,
    PUBLIC_secondary_headquarter_city: 22,
    PUBLIC_secondary_headquarter_country: 23,
    PUBLIC_hq_region: 24,
    PUBLIC_hq_subregion: 25,
    PUBLIC_organization_type: 26,
    PUBLIC_sponsors_partners_list: 27,
    PUBLIC_servicing_area: 28,
    PUBLIC_servicing_region: 29,
    PUBLIC_blockchain_type: 30,
    PUBLIC_blockchain_technology: 31,
    PUBLIC_token_ticker: 32,
    PUBLIC_logo_url: 33,
    PUBLIC_pb_partner_tag: 34,
    is_project_owner: 35,
    submitted_at: 36,
    submitted_at_ISO: 37,
    submitter_name: 38,
    submitted_by_email: 39,
    should_receive_newsletter: 40,
    agrees_to_data_privacy_agreement: 41,
    PUBLIC_twitter_url: 43,
    PUBLIC_facebook_url: 44,
    PUBLIC_linkedin_url: 45,
    PUBLIC_discord_url: 46,
    PUBLIC_video_url: 47,
    PUBLIC_white_paper_url: 48,
    PUBLIC_coin_market_cap_url: 49,
    PUBLIC_github_url: 50,
    PUBLIC_other_links_list: 51,
    slug: 52,
  };

  it("should convert form valus to string array", () => {
    const stringArr = convertSubmissionFormValuesToStringArray(
      submissionValues,
      keyColumnMapForSubmission
    );

    expect(stringArr).toEqual([
      "",
      "",
      "",
      "WFP Building Blocks",
      "Active",
      "https://innovation.wfp.org/project/building-blocks",
      "",
      "Aid & Philanthropy",
      "",
      "",
      "",
      "",
      "",
      ", , ",
      "a project from the UN's World Food Program to give cryptocurrency vouchers to Syrian refugees in Jordan",
      "The United Nations World Food Program (WFP) gave cryptocurrency vouchers to Syrian refugees in Jordan for use at selected markets. This allowed for the recording and authentification of transfers for 10,000 people.\n" +
        "\n" +
        "Completed on 31st May 217, the project run by the United Nation's World Food Programme (WFP) was designed to direct resources to thousands of Syrian refugees by giving them cryptocurrency-based vouchers that could be redeemed in participating markets.\n" +
        "\n" +
        "The future of world food aid arrived, in early May, unnoticed by its first recipients: the grocery shoppers inside a supermarket at the Azraq camp in Jordan, home to 36,000 Syrian refugees. To be fair, their buying process already looked pretty high-tech, especially for a store with a dirt parking lot in the middle of the desert. Before paying, each shopper peered into a black, rectangular iris scanner mounted at eye level, which confirms users’ identities with the camp’s organizing group, the United Nations High Commissioner for Refugees, and allows them to access a food stipend from the United Nations’ World Food Programme (WFP).\n" +
        "\n" +
        "That’s a spiffy authentication process, but it had been there for months. What the shoppers didn’t see was the new back-end procedure. Instead of receiving WFP funds via a third party, such as a bank, the grocery store was reconciling each purchase directly with the aid group through a secure platform called Building Blocks, based on blockchain technology. Inside the store, Houman Haddad, a finance officer for the WFP and the founder of Building Blocks, watched as each eye scan led to a cashier’s tablet flashing a green check mark, signaling a completed transaction. “It was the moment when I knew this was technically possible,” he says.\n" +
        "\n" +
        "Haddad, in the meantime, is building up internal support to expand the Building Blocks project. He has organized a blockchain steering committee at the WFP, and he’s drawing up plans for further expansion. By the second quarter of next year, the system could cover the entire Syrian refugee population of Jordan, or 500,000 people, which would include people who don’t live in camps. He’s hopeful he’ll make a connection in Cancún that will see more organizations join the WFP’ blockchain effort. “I wish that somehow we would get somebody to accept our hand and shake it from the other end,” he says.",
      "Blockchain for Zero Hunger",
      "",
      "2017",
      "Houman Hassad",
      "Rome",
      "Italy",
      "",
      "",
      "Europe",
      "Southern Europe",
      "Private-Public-Partnership",
      "UN, UNICEF, Ethereum, Irisguard",
      "",
      "",
      "Private",
      "Ethereum",
      "",
      "https://positiveblockchain.io/wp-content/uploads/2023/06/WFP.png",
      "",
      "",
      "1483228800000",
      "2017-01-01T00:00:00.000Z",
      "",
      "test@test.co",
      "",
      "Yes",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "http://innovation.wfp.org/project/building-blocks\n" +
        "https://davidgerard.co.uk/blockchain/2017/11/26/the-world-food-programmes-much-publicised-blockchain-has-one-participant-i-e-its-a-database/",
      "wfp-building-blocks",
      "unknown (probably: PB research)",
      "Positiveblockchain",
      "54%",
      "150",
      "10",
      "10",
      "10",
      "2",
      "",
      "test",
    ]);
  });
});
