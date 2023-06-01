import type {
  GetServerSideProps,
  GetServerSidePropsContext,
  PreviewData,
} from "next";

import { ParsedUrlQuery } from "querystring";
<<<<<<< HEAD

=======
import { config as configuration } from "@/configuration/config";
import { Project } from "@/types";
>>>>>>> 0caf539 (Finalize custom submission form for submitting)
import upperFirst from "lodash/fp/upperFirst";
import dynamic from "next/dynamic";
import { DatasetJsonLd, NextSeo } from "next-seo";

import { config as configuration } from "@/configuration";
import Routes from "@/lib/Routes";
import { Project } from "@/types";

import defaultConfig from "../next-seo.config";
function ProjectPage(props: { projectData: Project }) {
  const IndividualProjectPage = dynamic(
    () => import("../templates/IndividualProjectPageTemplate")
  );

  const { projectData } = props;
  const projectUrl = `${Routes.getBaseUrl()}/${projectData.slug}}`;

  return (
    <>
      <NextSeo
        title={projectData.project_name}
        description={upperFirst(
          projectData.description_short_value_proposition_in_a_tweet
        )}
        canonical={projectUrl}
        openGraph={{
          ...defaultConfig.openGraph,
          type: "website",
          locale: "en_US",
          url: projectUrl,
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

  if (!projectData?.data?.slug) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

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
  return `${baseUrl}/${Routes.BASE_PATH}/${Routes.API_PATH}/edge/project-data/${slug}`;
}

function getBaseUrl(req: any) {
  const protocol = req.headers["x-forwarded-proto"] || "http";
  return req ? `${protocol}://${req.headers.host}` : "";
}
