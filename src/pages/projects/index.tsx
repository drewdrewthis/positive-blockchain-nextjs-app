import { GetStaticProps } from "next";
import { fetchProjectData } from "@/lib/google";
import ProjectPageTemplate from "@/templates/ProjectsPage";
import { extractFiltersFromProjectData } from "../../lib/utils";
import { config } from "../../configuration";

function AllProjectPage(props: any) {
  return <ProjectPageTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const projectData = await fetchProjectData();
  const { projects } = config.constants;

  return {
    props: {
      initialData:
        projectData?.slice(0, projects.INITIAL_DATA_LOAD_COUNT) || [],
      filters: extractFiltersFromProjectData(projectData as any),
    },
  };
};

export default AllProjectPage;
