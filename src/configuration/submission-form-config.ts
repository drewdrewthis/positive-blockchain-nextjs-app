import { snakeCaseToSentenceCase } from "../lib/utils/strings";
import { FormInput } from "../templates/ProjectSubmissionForm";

// List of columns that will be displayed in the form
export const COLUMNS = [
  "is_positive_blockchain_project",
  "PUBLIC_project_name",
  "PUBLIC_active",
  "PUBLIC_website",
  "PUBLIC_categories_list",
  "PUBLIC_description_short_value_proposition_in_a_tweet",
  "PUBLIC_long_description",
  "PUBLIC_business_tagline",
  "PUBLIC_tags_keywords_list",
  "PUBLIC_year_creation",
  "PUBLIC_founder_names_list",

  // HQ
  "PUBLIC_primary_headquarter_city",
  "PUBLIC_primary_headquarter_country",
  "PUBLIC_secondary_headquarter_city",
  "PUBLIC_secondary_headquarter_country",
  "PUBLIC_hq_subregion",
  // "PUBLIC_hq_region",

  // SERVICING AREAS
  "PUBLIC_subregions_list",

  "PUBLIC_organization_type",
  "PUBLIC_sponsors_partners_list",

  // LINKS
  "PUBLIC_video_url",
  "PUBLIC_white_paper_url",
  "PUBLIC_twitter_url",
  "PUBLIC_facebook_url",
  "PUBLIC_linkedin_url",
  "PUBLIC_discord_url",
  "PUBLIC_github_url",
  "PUBLIC_coinmarketcap_url",
  "PUBLIC_other_links_list",

  "PUBLIC_blockchain_type",
  "PUBLIC_blockchain_technology",
  "PUBLIC_token_ticker",
  "PUBLIC_logo_url",
  "PUBLIC_pb_partner_tag", // "PUBLIC_servicing_region",

  // Submitter info
  "is_project_owner",
  "submitted_by_name",
  "submitted_by_email",
  "should_receive_newsletter",
  "agrees_to_data_privacy_agreement",
] as const;

export type DatabaseColumnKey = typeof COLUMNS[number];

interface InputFieldProps extends Partial<FormInput> {
  prompt?: string;
  required?: boolean;
  type?: string;
  characterLimit?: number;
  label?: string;
  placeholder?: string;
}

const urls = [
  "PUBLIC_video_url",
  "PUBLIC_white_paper_url",
  "PUBLIC_twitter_url",
  "PUBLIC_facebook_url",
  "PUBLIC_linkedin_url",
  "PUBLIC_discord_url",
  "PUBLIC_github_url",
  "PUBLIC_coinmarketcap_url",
  "PUBLIC_other_links_list",
].reduce((acc, curr) => {
  acc[curr] = {
    type: "url",
    required: false,
    headerTitle: snakeCaseToSentenceCase(curr.replace("PUBLIC_", "")),
  };

  return acc;
}, {} as Record<string, InputFieldProps>);

/**
 * Overrides for the default form input fields
 *
 * The defaults come directly from the database
 */
export const overrides: Record<string, InputFieldProps> = {
  ...urls,

  is_positive_blockchain_project: {
    label: "Is the project a PositiveBlockchain project?",
    prompt:
      "This means you have a strong aim at creating a positive social or environmental impact and solve some of our world’s burning problems (SDGs) through the use of blockchain and DLTs. We don't intend to list the entire blockchain ecosystem, but rather have a focus on projects committed to the SDGs. Note: the project should be focusing on developing or implementing a concrete blockchain solution.",
    type: "select",
    options: ["Yes", "No"],
    required: false,
    headerTitle: "Please select one",
  },
  PUBLIC_project_name: {
    label: "Project name",
    required: true,
    type: "text",
    characterLimit: 50,
    helperText: "50 characters max",
    placeholder: 'e.g. "PositiveBlockchain"',
  },
  PUBLIC_active: {
    label: "Is the project Active?",
    prompt:
      "The database also includes relevant projects which may be aborted or don’t use blockchain any longer.",
    required: true,
    type: "select",
    placeholder: "Please select one",
    headerTitle: "Select status",
    options: ["Active", "Inactive", "Active - No longer using Blockchain"],
  },
  PUBLIC_website: {
    label: "Your website",
    required: true,
    type: "url",
    placeholder: "e.g. https://positiveblockchain.io",
  },
  PUBLIC_categories_list: {
    label: "Categories",
    prompt:
      "Select up to three categories and the associated subcategory.ies. Start by the most relevant to the project. More about our database schema.",
    required: true,
    type: "multi-select",
  },
  PUBLIC_description_short_value_proposition_in_a_tweet: {
    label: "Short description",
    prompt:
      "Please write a short description in 1-2 sentences telling precisely what you do.",
    required: true,
    type: "textarea",
    characterLimit: 320,
    helperText: "320 characters max",
    placeholder:
      "e.g. We utilize blockchain technology to create sustainable supply chains.",
  },
  PUBLIC_long_description: {
    label: "Long description",
    prompt:
      "Feel free to use this to detail your activity and mention figures, KPIs, partners, notable facts about the project and its impact.",
    required: false,
    type: "textarea",
    placeholder:
      "e.g. Founded in 2021, our company specializes in using blockchain technology to...",
  },
  PUBLIC_business_tagline: {
    label: "Business Tagline",
    prompt: "This will be displayed below the project title.",
    required: false,
    type: "textarea",
    placeholder: "e.g. Creating a sustainable future with blockchain",
  },

  PUBLIC_video_url: {
    headerTitle: "Youtube or Vimeo URL (main video, only one)",
    type: "url",
    required: false,
    helperText: "Add the url of the most relevant project video",
    placeholder: "e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  PUBLIC_other_links_list: {
    helperText:
      "Paste here other related articles talking about the project, if relevant. several articles possible. Comma separated.",
    type: "text",
    required: false,
    headerTitle: "Other links",
    placeholder: "e.g. https://link1.com, https://link2.com",
  },

  PUBLIC_tags_keywords_list: {
    label: "Tags",
    prompt:
      "Select tags and keywords to help the indexing and searchability of the project in the database.",
    required: false,
    helperText:
      "List of tags, keywords, related to the project and separated by comma.",
    type: "string",
    placeholder: "e.g. blockchain, social impact, cryptocurrency",
  },

  PUBLIC_founder_names_list: {
    label: "Name of Founders",
    required: false,
    type: "text",
    helperText: `Founders only. Please respect this formatting -> "Name", "Tittle"; "Name", Tittle"`,
    placeholder: 'e.g. "John Doe", "CEO"; "Jane Doe", "CTO"',
  },
  PUBLIC_sponsors_partners_list: {
    label: "Sponsor & partners",
    required: false,
    type: "text",
    prompt:
      "Feel free to name notable sponsors and partners involved in the project/organization.",
    placeholder: "e.g. Microsoft, IBM",
  },
  PUBLIC_token_ticker: {
    label: "Token Ticker",
    required: false,
    type: "text",
    helperText: "Only capital letters",
    placeholder: "e.g. BTC",
  },
  PUBLIC_logo_url: {
    label: "Project Logo URL",
    required: false,
    type: "url",
    placeholder: "e.g. https://yourwebsite.com/logo.png",
    helperText:
      "When inputting a URL for a logo, please use an image URL from an open platform or a publicly accessible Google Drive URL to ensure visibility. Ensure that the URL leads to the desired logo image.",
  },
  PUBLIC_pb_partner_tag: {
    label: "PB Partner Tag",
    required: false,
    type: "multi-select",
    placeholder: "Please select all that apply",
    prompt:
      "We are helping our partners create sub-directories within our DB. If you are submitting a project as part of a PB Partner list, write the “PB Partner tag” here. If you are not aware or not sure, simply keep empty.",
  },

  PUBLIC_year_creation: {
    label: "Year of creation of the project/company",
    required: false,
    type: "select",
    placeholder: "Please select one",
    headerTitle: "Choose a year",
    prompt: "If the company existed before, select the year of launch of the blockchain project"
  },

  PUBLIC_primary_headquarter_city: {
    label: "Headquarter city",
    required: false,
    type: "text",
    placeholder: "e.g. San Francisco",
  },
  PUBLIC_primary_headquarter_country: {
    label: "Headquarter country",
    headerTitle: "Please select a country",
    placeholder: "Please select one",
    required: false,
    type: "select",
    prompt: "Select a specific country or “Distributed/Global”"
  },
  PUBLIC_secondary_headquarter_city: {
    label: "Secondary headquarter city",
    required: false,
    type: "text",
    placeholder: "e.g. London",
  },
  PUBLIC_secondary_headquarter_country: {
    label: "Secondary headquarter country",
    headerTitle: "Please select a country",
    placeholder: "Please select one",
    required: false,
    type: "select",
  },
  PUBLIC_hq_subregion: {
    required: false,
    type: "multi-select",
  },
  PUBLIC_subregions_list: {
    required: false,
    type: "multi-select",
    headerTitle: "Please select your servicing areas",
    placeholder: "Please select all that apply",
  },
  PUBLIC_servicing_area: {
    type: "multi-select",
    headerTitle: "Please select all that apply",
    placeholder: "Please select all that apply",
  },
  PUBLIC_organization_type: {
    label: "Organization type",
    placeholder: "Please select all that apply",
    required: false,
    type: "multi-select",
  },
  PUBLIC_blockchain_type: {
    label: "Blockchain Type",
    required: false,
    type: "select",
    headerTitle: "Please select one",
    placeholder: "Please select one",
    options: ["Public", "Private", "Hybrid", "NA"],
  },
  PUBLIC_blockchain_technology: {
    // headerTitle: "Please select all that apply",
    placeholder: "Please select all that apply",
    label: "Blockchain platform(s)",
    required: false,
    type: "multi-select",
  },
  PUBLIC_blockchain_technology_other: {
    placeholder: "Please specify the technology",
    required: false,
    type: "text",
  },
  is_project_owner: {
    label: "Are you the project owner or working for this project?",
    required: false,
    type: "select",
    headerTitle: "Please select one",
    options: ["Yes", "No"],
  },
  submitted_by_name: {
    label: "Your name",
    required: true,
    type: "text",
    placeholder: "e.g. John Doe",
  },
  submitted_by_email: {
    label: "Your email",
    required: true,
    type: "email",
    placeholder: "e.g. john.doe@example.com",
  },
  should_receive_newsletter: {
    label: "Newsletter",
    prompt:
      "Do you want to receive our newsletter (project updates, new projects listed, interviews of blockchain for good entrepreneurs, etc..)?",
    required: false,
    type: "select",
    headerTitle: "Please select your preference",
    options: ["Yes", "No"],
  },
  agrees_to_data_privacy_agreement: {
    label: "Data privacy",
    prompt:
      "I understand that the information above can be used by PositiveBlockchain and also published on http://positiveblockchain.io. You can request to correct, remove or block incorrect data by sending an email to hello@positiveblockchain.io",
    required: true,
    type: "select",
    headerTitle: "Required",
    options: ["Yes", "No"],
  },
};

export const constants = {
  EARLEST_FOUNDING_YEAR: 2009,
  MAX_CATEGORIES: 3,
};
