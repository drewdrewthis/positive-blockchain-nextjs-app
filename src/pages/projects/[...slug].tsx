import { GetServerSideProps } from "next";
import { fetchSingleProjectData } from "@/lib/google";

function ProjectPage(props: { projectData: any }) {
  const { projectData } = props;

  return (
    <div>
      <h1>Project Page</h1>
      <p>{projectData["project_name"]}</p>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, res } = context;
  const { slug } = params as { slug: string[] };
  const projectData = (await fetchSingleProjectData(slug[0])) || null;

  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate");

  console.log(slug);
  console.log(projectData);

  return {
    props: {
      projectData,
    },
  };
};

export default ProjectPage;
