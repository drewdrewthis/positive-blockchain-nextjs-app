import type { GetStaticProps } from "next";
import type { Project } from "../../types";
import dynamic from "next/dynamic";

interface Props {
  initialData: Project[];
  filters: Record<string, string[]>;
}

function AllProjectPage(props: Props) {
  const ProjectPageTemplate = dynamic(
    () => import("../../templates/ProjectsPage")
  );

  return <ProjectPageTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { extractFiltersFromProjectData } = await import("@/lib/utils");
  const { fetchProjectData } = await import("@/lib/google");
  const { config } = await import("@/configuration");

  const projectData = await fetchProjectData();
  const { projects } = config.constants;

  return {
    props: {
      initialData:
        projectData?.slice(0, projects.INITIAL_DATA_LOAD_COUNT) || [],
      filters: extractFiltersFromProjectData(projectData as any),
    } as Props,
    revalidate: projects.CACHE_TTL,
  };
};

export default AllProjectPage;
