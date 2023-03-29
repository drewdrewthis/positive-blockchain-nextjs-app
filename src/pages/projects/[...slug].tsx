import { GetServerSideProps } from "next";
import { fetchSingleProjectData } from "@/lib/google";
import Header from "@/templates/partials/Header";
import Footer from "@/templates/partials/Footer";
import IndividualProjectPage from "../../templates/IndividualProjectPage";

function ProjectPage(props: { projectData: any }) {
  return <IndividualProjectPage {...props} />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { params, res } = context;
  const { slug } = params as { slug: string[] };
  const projectData = (await fetchSingleProjectData(slug[0])) || null;

  res.setHeader("Cache-Control", "public, s-maxage=10, stale-while-revalidate");

  return {
    props: {
      projectData,
    },
  };
};

export default ProjectPage;
