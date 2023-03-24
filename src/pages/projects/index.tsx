import { GetStaticProps } from "next";
import { fetchProjectData } from "@/lib/google";
import ProjectPageTemplate from "@/templates/ProjectPage";
import { chain } from "lodash";

function AllProjectPage(props: { projectData: any; blockchainUses: string[] }) {
  return <ProjectPageTemplate {...props} />;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const projectData = await fetchProjectData();
  const blockchainUses = extractBlockchainUses(projectData);

  return {
    props: {
      projectData,
      blockchainUses,
    },
  };
};

export default AllProjectPage;

function extractBlockchainUses(projectData: any) {
  const blockchainUses = projectData?.map((item: any) => {
    return item["use_of_blockchain"]
      ?.split(",")
      .map((item: string) => item.trim());
  });

  return chain(blockchainUses).flatten().uniq().compact().value();
}
