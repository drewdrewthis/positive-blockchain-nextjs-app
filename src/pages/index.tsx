import type { GetStaticProps } from "next";
import type { Project } from "@/types";
import { fetchProjectData } from "@/lib/google";
import { extractFiltersFromProjectData } from "@/lib/utils";
import { config } from "@/configuration";
import dynamic from "next/dynamic";

interface Props {
  initialData: Project[];
  filters: Record<string, string[]>;
}

function AllProjectPage(props: Props) {
  const ProjectPageTemplate = dynamic(
    () => import("../templates/ProjectsPageTemplate")
  );

  return <ProjectPageTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const projectData = await fetchProjectData();
  const { projects } = config.constants;
  const filters = extractFiltersFromProjectData(projectData as any);

  return {
    props: {
      initialData:
        projectData?.slice(0, projects.INITIAL_DATA_LOAD_COUNT) || [],
      filters,
    } as Props,
    revalidate: projects.CACHE_TTL,
  };
};

export default AllProjectPage;
