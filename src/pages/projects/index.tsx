import { GetStaticProps } from "next";
import { fetchProjectData } from "@/lib/google";
import ProjectPageTemplate from "@/templates/ProjectPage";

function AllProjectPage(props: { projectData: any }) {
  return <ProjectPageTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const projectData = await fetchProjectData();

  return {
    props: {
      projectData,
    },
  };
};

export default AllProjectPage;
