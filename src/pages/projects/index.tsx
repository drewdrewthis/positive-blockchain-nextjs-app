import { GetStaticProps } from "next";
import { fetchProjectData } from "@/lib/google";
import ProjectPageTemplate from "@/templates/ProjectsPage";
import { extractFiltersFromProjectData } from "../../lib/utils";

function AllProjectPage(props: any) {
  return <ProjectPageTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const projectData = await fetchProjectData();

  return {
    props: {
      projectData,
      filters: extractFiltersFromProjectData(projectData as any),
    },
  };
};

export default AllProjectPage;
