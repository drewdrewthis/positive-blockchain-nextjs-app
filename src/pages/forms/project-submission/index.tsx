import type { FormInput } from "@/templates/ProjectSubmissionForm";
import type { CountryData } from "@/types";
import type { GetServerSideProps } from "next";

import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";

import { fetchAllCategoriesData } from "@/lib/api/fetchAllCategoriesData";
import { fetchProjectSubmissionFormInputs } from "@/lib/api/fetchProjectSubmissionFormInputs";
import { fetchRegionData } from "@/lib/api/fetchRegionData";
import { fetchAllProjectData } from "@/lib/google";
import { convertSubmissionFormValuesToStringArray } from "@/lib/utils/convertSubmissionFormValuesToStringArray";
import {
  getRegionsFromSubregions,
  getSubregionsFromCountries,
} from "@/lib/utils/regions";
import Footer from "@/templates/partials/Footer";
import Header from "@/templates/partials/Header";
import ProjectSubmissionForm from "@/templates/ProjectSubmissionForm";

import { fetchKeyColumnMapForProjectSubmission } from "../../../lib/api/fetchKeyColumnMapForProjectSubmission";
import Routes from "../../../lib/Routes";
import { convertProjectDataIntoInitialValues } from "../../../lib/utils/convertProjectDataIntoInitialValues";
import { withController } from "../../../lib/withContoller";

interface ProjectSubmissionPageProps {
  projectData: any;
  countriesData: any;
  categoryData: any;
  inputs: any;
  keyColumnMapForSubmission: Record<string, number>;
  slug?: string;
}

/**
 * The project submission page. This uses the ProjectSubmissionForm template.
 * To edit the actual form, go to src/templates/ProjectSubmissionForm.tsx
 */
function ProjectSubmissionPage(props: ReturnType<typeof useController>) {
  const { categoryData, inputs, slug } = props;

  return (
    <div
      className="flex flex-col h-full"
      style={{
        height: "100vh",
      }}
    >
      <Header />
      <div className="flex align-center">
        <div className="bg-slate-100 p-10 max-w-3xl m-auto">
          <IntroBlock isEditingProject={!!slug} />
        </div>
      </div>
      <div className="container mx-auto max-w-3xl pb-10">
        <ProjectSubmissionForm
          inputs={inputs.filter((input: FormInput) =>
            input.key.startsWith("PUBLIC_")
          )}
          categoryData={categoryData}
          initialValues={props.projectData}
          onSubmit={props.handleSubmit}
          onSubmitSuccess={props.handleSuccess}
        />
      </div>
      <Footer />
    </div>
  );
}

function useController(props: ProjectSubmissionPageProps) {
  const router = useRouter();
  const { countriesData = [], keyColumnMapForSubmission } = props;

  // Handle submit for the form
  const handleSubmit = async (values: Record<string, any>) => {
    const enhancedValues = addMissingValues(values, countriesData);
    await submitProjectData(enhancedValues, keyColumnMapForSubmission);
  };

  // Handle successful submission of the form
  const handleSuccess = () => {
    console.log(
      "Success: Redirecting to success page",
      Routes.PROJECT_SUBMISSION_SUCCESS
    );

    // On success, redirect to the success page
    router.replace(Routes.PROJECT_SUBMISSION_SUCCESS);
  };

  return {
    ...props,
    handleSubmit,
    handleSuccess,
  };
}

export default withController(ProjectSubmissionPage, useController);

export const getServerSideProps: GetServerSideProps<
  ProjectSubmissionPageProps
> = async (context) => {
  const { query } = context;
  const slug = query["prefill_slug"];

  const categoryData = await fetchAllCategoriesData();
  const countriesData = await fetchRegionData();
  const inputs = await fetchProjectSubmissionFormInputs();
  const projectData = await getInitialValues(context);
  const keyColumnMapForSubmission =
    await fetchKeyColumnMapForProjectSubmission();

  if (projectData) {
    // Clean bad PUBLIC_servicing_area
    const countries = countriesData.map((data: CountryData) => data.country);
    projectData["PUBLIC_servicing_area"] = projectData[
      "PUBLIC_servicing_area"
    ].filter((country: string) => countries.includes(country));
  }

  // We need to stringify and parse the props to remove undefined values
  return JSON.parse(
    JSON.stringify({
      props: {
        categoryData,
        countriesData,
        projectData,
        inputs,
        slug,
        keyColumnMapForSubmission,
      } as ProjectSubmissionPageProps,
    })
  );
};

function IntroBlock(props: { isEditingProject: boolean }) {
  return props.isEditingProject ? (
    <div className="prose w-full max-w-max">
      <Typography variant="h2" className="mb-10">
        PositiveBlockchain database - Edit an existing project
      </Typography>
      <p>
        PositiveBlockchain is the <b>open database</b>, knowledge platform and
        community exploring the potential of{" "}
        <b>blockchain technologies for social and environmental impact</b>. The
        association has a mission to build the web of knowledge and support
        collaboration for technology and social impact enthusiasts willing to
        leverage blockchain technologies for the UN SDGs.
      </p>
      <p>
        The database lists hundreds of projects and startups using blockchain
        technologies for good. Projects are either crowd-sourced or identified
        and qualified by PositiveBlockchain or its alliance partners comprising
        associations, universities and blockchain foundations.
      </p>
      <p>
        The database is actively curated, meaning that your submission will first
        be verified and validated before getting in to the database. This helps us
        maintain high quality and consistency throughout the database, thereby
        allowing for academic and professional use.
      </p>
      <p>
        PositiveBlockchain is a contributor-based non-profit association
        registered in Paris and active globally.
      </p>
      <p>
        Visit our <b>Data Wiki</b>{" "}
        <a href={Routes.WIKI} target="_blank">
          here.
        </a>{" "}
        Feel free to contact us at{" "}
        <a href="mailto:hello@positiveblockchain.io" target="_blank">
          hello@positiveblockchain.io
        </a>{" "}
        for support.
      </p>
      <p>
        As PositiveBlockchain is steering member the the BC 100+ Initiative, we are
        glad to invite you to join this community in support of the UN Charter of values by signing the online
        <a href="https://bc100plus.org/" target="_blank"> Manifesto</a>.
      </p>
      <p>
        NB: for submitting a new project, go{" "}
        <a href="/database/forms/project-submission" target="_blank">
          here.
        </a>
      </p>
    </div>
  ) : (
    <div className="prose w-full max-w-max">
      <Typography variant="h2" className="mb-10">
        PositiveBlockchain database - Submit a new project
      </Typography>

      <p>
        PositiveBlockchain is the <b>open database</b>, knowledge platform and
        community exploring the potential of{" "}
        <b>blockchain technologies for social and environmental impact</b>. The
        association has a mission to build the web of knowledge and support
        collaboration for technology and social impact enthusiasts willing to
        leverage blockchain technologies for the U.N. SDGs.
      </p>

      <p>
        The database lists hundreds of projects and startups using blockchain
        technologies for good. Projects are either crowd-sourced or identified
        and qualified by PositiveBlockchain or its alliance partners comprising
        associations, universities or blockchain foundations.
      </p>

      <p>
        PositiveBlockchain is a contributor-based non-profit association
        registered in Paris and active globally.
      </p>

      <ul>
        <li>
          Visit our <b>Data Wiki</b>{" "}
          <a href={Routes.WIKI} target="_blank">
            here
          </a>{" "}
          to check for data schema and rules.
        </li>
        <li>
          You want to <b>edit an existing project</b>? Go to the project page on
          the website and click on the button to Propose an edit.
        </li>
        <li>
          Do you want to <b>submit a list of multiple projects</b>? Go to our{" "}
          <a href={Routes.BULK_UPLOAD} target="_blank">
            Bulk Upload form
          </a>{" "}
          and use a spreadsheet template.
        </li>
        <li>
          Feel free to contact us at{" "}
          <a href="mailto:hello@positiveblockchain.io" target="_blank">
            hello@positiveblockchain.io
          </a>{" "}
          for support.
        </li>
      </ul>
      <p>
        As PositiveBlockchain is steering member the the BC 100+ Initiative, we are
        glad to invite you to join this community in support of the UN Charter of values by signing the online
        <a href="https://bc100plus.org/" target="_blank"> Manifesto</a>.
      </p>
    </div>
  );
}

/**
 * Get the initial values for the form if any
 * If we have a slug, we're editing an existing project
 * and we need to fetch the data for that project
 * and pass it to the form as initialValues
 * @param context.query.slug
 * @returns
 */
async function getInitialValues(context: any) {
  const { query } = context;
  const slug = query["prefill_slug"];

  const data = await fetchAllProjectData();
  const projectData = data?.find((project: any) => project.slug === slug);

  if (slug && !projectData) {
    console.error(`No project found with slug ${slug}`);
    return;
  }

  if (!projectData) {
    return;
  }

  return convertProjectDataIntoInitialValues(projectData);
}

async function submitProjectData(
  values: Record<string, any>,
  // Map of key to column index
  keyColumnMapForSubmission: { [key: string]: number }
) {
  const stringArr = convertSubmissionFormValuesToStringArray(
    values,
    keyColumnMapForSubmission
  );

  const body = JSON.stringify([stringArr]);

  console.log("submitting", body);

  const baseUrl =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;

  fetch(baseUrl + "/database/api/submit-project-data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function addMissingValues(
  values: Record<string, any>,
  countriesData: CountryData[]
) {
  let updateValues: Record<string, any> = values;
  updateValues = setServicingSubRegionsFromCountries(values, countriesData);
  updateValues = setServicingRegionsFromSubRegions(updateValues, countriesData);
  return updateValues;
}

function setServicingRegionsFromSubRegions(
  values: Record<string, any>,
  countryData: CountryData[]
) {
  // Get the selected subregions from values
  const subregions = values.PUBLIC_subregions_list;

  // Set the regions for the subregions
  const regions = getRegionsFromSubregions(subregions, countryData);
  values.PUBLIC_servicing_region = regions;

  return values;
}

function setServicingSubRegionsFromCountries(
  values: Record<string, any>,
  countryData: CountryData[]
) {
  // Get the countries from the values
  const countries = values.PUBLIC_servicing_area;

  if (!countries || !countries.length) {
    values.PUBLIC_subregions_list = [];
    return values;
  }

  // Set the regions for the subregions
  const subregions = getSubregionsFromCountries(countries || [], countryData);

  values.PUBLIC_subregions_list = subregions;

  return values;
}
