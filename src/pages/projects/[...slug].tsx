import {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import IndividualProjectPage from "../../templates/IndividualProjectPage";
import { ParsedUrlQuery } from "querystring";
import { config } from "../../configuration";
import { createPrefilledLink } from "../../lib/utils/prefilled-form-links/new-submission";
import { Project } from "../../types";

function ProjectPage(props: { projectData: any; submitEditLink: string }) {
  console.log(props.submitEditLink);
  return <IndividualProjectPage {...props} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context;
  const url = getProjectDataUrl(context);
  const { data: projectData } = (await fetch(url)
    .then((res) => res.json())
    .catch(() => ({}))) as {
    data: Project;
  };

  const { projects } = config.constants;

  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${projects.CACHE_TTL}, stale-while-revalidate`
  );

  const prefilledFormLink = createPrefilledLink({
    // isPositiveBlockchain: false,
    projectName: projectData["project_name"],
    website: projectData["website"],
    categories: projectData["categories"].split(","),
    tags: projectData["tags_keywords"],
    shortDescription:
      projectData["description_short_value_proposition_in_a_tweet"],
    longDescription: projectData["long_description"],
    hqCity: projectData["primary_headquarter_city"],
    hqCountry: projectData["primary_headquarter_country"],
    servicingCountry: projectData["servicing_area"],
    yearOfCreation: projectData["year_creation"],
    // projectType: projectData['project_type'],
    videoLink: projectData["video_url"],
    tokenName: projectData["token_ticker"],
    blockchainTechnology: projectData["blockchain_technology"],
    // reasons: string[];
  });

  return {
    props: {
      submitEditLink: prefilledFormLink,
      projectData: projectData,
    },
  };
};

export default ProjectPage;

type Context = GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;
function getProjectDataUrl(context: Context) {
  const { params, res, req } = context;
  const { slug } = params as { slug: string[] };
  const baseUrl = getBaseUrl(req);

  // We hit this route because it returns only the individual project data
  return `${baseUrl}/nextjs-app/api/project-data/${slug}`;
}

function getBaseUrl(req: any) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  return req ? `${protocol}://${req.headers.host}` : "";
}
