import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";
import dynamic from "next/dynamic";
import { ParsedUrlQuery } from "querystring";
import { config as configuration } from "../../configuration";
import { Project } from "../../types";
import upperFirst from "lodash/fp/upperFirst";
import { DatasetJsonLd, NextSeo } from "next-seo";
import defaultConfig from "../../next-seo.config";

function ProjectPage(props: { projectData: Project }) {
  const IndividualProjectPage = dynamic(
    () => import("../../templates/IndividualProjectPage")
  );

  const { projectData } = props;

  return (
    <>
      <NextSeo
        title={projectData.project_name}
        description={upperFirst(
          projectData.description_short_value_proposition_in_a_tweet
        )}
        canonical={`https://positiveblockchain.io/projects/${projectData.slug}`}
        openGraph={{
          ...defaultConfig.openGraph,
          type: "website",
          locale: "en_US",
          url: `https://positiveblockchain.io/projects/${projectData.slug}`,
          siteName:
            "PositiveBlockchain.io | Explore the Positive Blockchain Database",
          description: upperFirst(
            projectData.description_short_value_proposition_in_a_tweet
          ),
          images: [
            ...defaultConfig.openGraph.images,
            {
              url: projectData.logo_url,
              alt: "blockchain",
              type: "image/png",
            },
          ],
          videos: [
            {
              url: projectData.video_url,
            },
          ],
        }}
      />
      <DatasetJsonLd
        name={projectData.project_name}
        description={
          projectData.long_description ||
          projectData.description_short_value_proposition_in_a_tweet
        }
        dataArray={[new Date().toISOString()]}
      />
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
