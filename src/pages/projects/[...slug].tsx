import type { Project } from "@/types";
import type {
  GetStaticPaths,
  GetStaticProps,
} from "next";




import upperFirst from "lodash/fp/upperFirst";
import dynamic from "next/dynamic";
import { DatasetJsonLd, NextSeo } from "next-seo";

import { config as configuration } from "@/configuration";
import Routes from "@/lib/Routes";

import { fetchAllProjectData, fetchSingleProjectData } from "../../lib/google";
import defaultConfig from "../../next-seo.config";

function ProjectPage(props: { projectData: Project }) {
  const IndividualProjectPage = dynamic(
    () => import("../../templates/IndividualProjectPageTemplate")
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

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const slug = context.params?.slug as string[];
    const data = await fetchSingleProjectData(slug[0]);

    if (!data) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        projectData: data
      },
      revalidate: configuration.constants.projects.CACHE_TTL, // Optionally, use ISR to refresh the static page
    };
  } catch (error) {
    console.error("Error fetching project data", error);
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Don't use ISR in development
  if (process.env.NODE_ENV === "development") {
    return {
      paths: [],
      fallback: true,
    };
  }

  try {
    const projects = await fetchAllProjectData() as Project[];

    const paths = projects.map((project: { slug: string }) => ({
      params: { slug: [project.slug] },
    }));

    return {
      paths,
      fallback: 'blocking', // or false if you want to show a 404 for missing pages
    };
  } catch (error) {
    console.error("Error fetching project data", error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export default ProjectPage;
