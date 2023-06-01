import {
  Button,
  Divider,
  FormControl,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { useForm, FormProvider, UseFormReturn } from "react-hook-form";
import * as submissionFormConfig from "@/configuration/submission-form-config";
import FormInputItem from "./FormInputItem";
import CategoriesSection2 from "./CategoriesSection2";
import Label from "./Label";
import GroupSelectInput from "./GroupSelectInput";
import Prompt from "./Prompt";
import { count } from "console";
import SectionTitle from "./SectionTitle";
import { DatabaseColumnKey } from "../../configuration/submission-form-config";

export interface FormInput {
  key: DatabaseColumnKey;
  headerTitle: string;
  columnIdx: number;
  helperText?: string;
  // string array is for select inputs, record is for grouped select
  options?: string[] | number[] | Record<string, string[] | undefined> | null;
}

/**
 * ProjectSubmissionForm template.
 * This component will dynamically render a form based on the inputs provided.
 * @param props
 * @returns
 */
export default function ProjectSubmissionForm(props: {
  inputs: FormInput[];
  initialValues?: Record<string, any>;
  categoryData: any;
  onSubmit?: (values: Record<string, any>) => void;
}) {
  const { inputs, initialValues, onSubmit = () => {} } = props;
  const defaultValues = initialValues || {
    // All multi-selects need to be initialized as empty arrays
    // or there will be a blank chip in the UI
    PUBLIC_blockchain_technology: [],
    PUBLIC_organization_type: [],
  };
  const methods = useForm({ defaultValues, shouldUnregister: false });
  const { handleSubmit, setValue } = methods;

  const groupedInputs = inputs.reduce((acc, input) => {
    const { key } = input;
    acc[key] = {
      ...input,
      key,
    };
    return acc;
  }, {} as Record<string, any>);

  const allInputProps = Object.keys(submissionFormConfig.overrides).reduce(
    (acc, key) => {
      acc[key] = {
        options: groupedInputs[key]?.options,
        placeholder: groupedInputs[key]?.placeholder,
        ...submissionFormConfig.overrides[key],
        key,
        databaseKey: key,
      };

      return acc;
    },
    {} as Record<string, any>
  );

  return (
    <FormProvider {...methods}>
      <form
        className="w-full p-5"
        onSubmit={handleSubmit(onSubmit)}
        data-testid="project-submission-form"
      >
        <FormControl className="w-full flex flex-col gap-4">
          <SectionTitle>About the project</SectionTitle>
          <FormInputItem {...allInputProps["is_positive_blockchain_project"]} />
          <FormInputItem {...allInputProps["PUBLIC_project_name"]} />
          <FormInputItem {...allInputProps["PUBLIC_active"]} />
          <FormInputItem {...allInputProps["PUBLIC_website"]} />

          <Label text="Categories" />
          <CategoriesSection2
            {...allInputProps["PUBLIC_categories_list"]}
            categories={props.categoryData}
            initialValues={initialValues}
            onChange={(values: any) => {
              handleCategoriesChange(values, setValue);
            }}
          />

          <FormInputItem
            {...allInputProps[
              "PUBLIC_description_short_value_proposition_in_a_tweet"
            ]}
          />
          <FormInputItem {...allInputProps["PUBLIC_long_description"]} />
          <FormInputItem {...allInputProps["PUBLIC_business_tagline"]} />
          <FormInputItem {...allInputProps["PUBLIC_tags_keywords_list"]} />
          <FormInputItem {...allInputProps["PUBLIC_year_creation"]} />
          <FormInputItem {...allInputProps["PUBLIC_founder_names_list"]} />

          {/* Headquaters */}
          <FormInputItem
            {...allInputProps["PUBLIC_primary_headquarter_city"]}
          />
          <FormInputItem
            {...allInputProps["PUBLIC_primary_headquarter_country"]}
          />
          {/* <FormInputItem
            {...allInputProps["PUBLIC_secondary_headquarter_city"]}
          />
          <FormInputItem
            {...allInputProps["PUBLIC_secondary_headquarter_country"]}
          /> */}

          <Label text="Servicing Areas" />
          <Prompt
            text={`
            You may have a headquarter in a given City/Country but have active local projects or implementations in other countries. Select the countries where you have specific local activities. Select "All [Region]" (i.e. All Eastern Africa) if your work is region wide. Select Distributed/Global if you act purely digitally.
          `}
          />
          <GroupSelectInput
            {...allInputProps["PUBLIC_subregions_list"]}
            id={"PUBLIC_servicing_area"}
            multiple
          />
          {/* <FormInputItem {...allInputProps["PUBLIC_servicing_area"]} /> */}

          <FormInputItem {...allInputProps["PUBLIC_organization_type"]} />
          <FormInputItem {...allInputProps["PUBLIC_sponsors_partners_list"]} />

          <Label text="Project Links" />
          <FormInputItem {...allInputProps["PUBLIC_video_url"]} />
          <FormInputItem {...allInputProps["PUBLIC_white_paper_url"]} />
          <FormInputItem {...allInputProps["PUBLIC_twitter_url"]} />
          <FormInputItem {...allInputProps["PUBLIC_facebook_url"]} />
          <FormInputItem {...allInputProps["PUBLIC_linkedin_url"]} />
          <FormInputItem {...allInputProps["PUBLIC_discord_url"]} />
          <FormInputItem {...allInputProps["PUBLIC_github_url"]} />
          <FormInputItem {...allInputProps["PUBLIC_coinmarketcap_url"]} />
          <FormInputItem {...allInputProps["PUBLIC_other_links_list"]} />

          <Divider className="mt-10" />
          <SectionTitle>Technology</SectionTitle>
          <FormInputItem {...allInputProps["PUBLIC_blockchain_type"]} />
          <FormInputItem {...allInputProps["PUBLIC_blockchain_technology"]} />

          <FormInputItem {...allInputProps["PUBLIC_token_ticker"]} />
          <FormInputItem {...allInputProps["PUBLIC_logo_url"]} />
          <FormInputItem {...allInputProps["PUBLIC_pb_partner_tag"]} />

          <Divider className="mt-10" />
          <SectionTitle>About you</SectionTitle>
          <p className="italic text-sm mb-5">
            (this data will be used by PositiveBlockchain only, wont be visible
            nor shared)
          </p>
          <FormInputItem {...allInputProps["is_project_owner"]} />
          <FormInputItem {...allInputProps["submitted_by_name"]} />
          <FormInputItem {...allInputProps["submitted_by_email"]} />
          <FormInputItem {...allInputProps["should_receive_newsletter"]} />
          <FormInputItem
            {...allInputProps["agrees_to_data_privacy_agreement"]}
          />
          <Label text="Anything else to add?" />
          <p>
            Got any suggestions to improve this form? Questions or doubts? Let
            us know!
          </p>
          <TextareaAutosize
            {...methods.register("additional_comments")}
            className="border border-gray-300 rounded-md p-4"
            placeholder="Anything else to add?"
          />

          <Button
            className="bg-blue-500"
            type="submit"
            variant="contained"
            color="primary"
          >
            SUBMIT
          </Button>
          <p className="text-sm italics mt-5">
            Need help? Get in touch{" "}
            <a
              className="text-brand-link"
              href="mailto:hello@positiveblockchain.io"
              target="_blank"
            >
              hello@positiveblockchain.io
            </a>
          </p>
        </FormControl>
      </form>
    </FormProvider>
  );
}

/**
 * Handles the conversion of the categories form values to
 * the main form values for submitting the project
 * @param values
 * @param setValue
 */
function handleCategoriesChange(
  values: Record<string, string | string[]>,
  setValue: UseFormReturn<Record<string, any>, any>["setValue"]
) {
  const categories = [
    values["category_1"],
    values["category_2"],
    values["category_3"],
  ];

  setValue("PUBLIC_main_category", categories[0]);
  setValue("category_2", categories[1]);
  setValue("category_3", categories[2]);
  setValue("PUBLIC_categories_list", categories);

  const subcategories = [
    (values["sub_category_1"] as string[]) || [],
    (values["sub_category_2"] as string[]) || [],
    (values["sub_category_3"] as string[]) || [],
  ];
  setValue("sub_category_1", subcategories[0]);
  setValue("sub_category_2", subcategories[1]);
  setValue("sub_category_3", subcategories[2]);
  setValue("PUBLIC_sub_categories_list", subcategories.flat());
}
