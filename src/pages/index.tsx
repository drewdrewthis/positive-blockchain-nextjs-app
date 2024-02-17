import type { Project } from "@/types";
import type { GetStaticProps } from "next";


import { config } from "@/configuration/config";
import { fetchPublicProjectData } from "@/lib/google";
import { extractFiltersFromProjectData } from "@/lib/utils";

import ProjectsPageTemplate from "../templates/ProjectsPageTemplate";

interface Props {
  initialData: Project[];
  filters: Record<string, string[]>;
  allProjectData: any;
}

function AllProjectPage(props: Props) {
  return <ProjectsPageTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = async (_context) => {
  try {
  const projectData = await fetchPublicProjectData();
  const { projects } = config.constants;
  const filters = extractFiltersFromProjectData(projectData as any);

  return {
    props: {
      initialData:
        projectData?.slice(0, projects.INITIAL_DATA_LOAD_COUNT) || [],
      filters,
      allProjectData: projectData,
    } as Props,
    revalidate: projects.CACHE_TTL,
  };

  } catch (error) {
    console.error("Error fetching project data:", error);

    return {
      props: {
        initialData: [],
        filters: {},
        allProjectData: null,
      } as Props,
    };
  }

};

export default AllProjectPage;
