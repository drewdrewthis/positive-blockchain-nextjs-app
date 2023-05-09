import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import dynamic from "next/dynamic";
import { ParsedUrlQuery } from "querystring";
import { config as configuration } from "../../configuration";
import Head from "next/head";
import { Project } from "../../types";
import upperFirst from "lodash/fp/upperFirst";

function ProjectPage(props: { projectData: Project }) {
  const IndividualProjectPage = dynamic(
    () => import("../../templates/IndividualProjectPage")
  );

  return (
    <>
      <Head>
        <title>{props.projectData.project_name}</title>
        <meta
          name="description"
          content={upperFirst(
            props.projectData.description_short_value_proposition_in_a_tweet
          )}
        />
      </Head>
      <IndividualProjectPage {...props} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context;
  const url = getProjectDataUrl(context);
  const projectData = await fetch(url).then((res) => res.json());
  const { projects } = configuration.constants;

  res.setHeader(
    "Cache-Control",
    `public, s-maxage=${projects.CACHE_TTL}, stale-while-revalidate`
  );

  res.setHeader("Accept-Encoding", "br, gzip, deflate, compress");

  return {
    props: {
      projectData: projectData.data,
    },
  };
};

export default ProjectPage;

type Context = GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;
function getProjectDataUrl(context: Context) {
  const { params, req } = context;
  const { slug } = params as { slug: string[] };
  const baseUrl = getBaseUrl(req);

  // We hit this route because it returns only the individual project data
  return `${baseUrl}/nextjs-app/api/edge/project-data/${slug}`;
}

function getBaseUrl(req: any) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  return req ? `${protocol}://${req.headers.host}` : "";
}
