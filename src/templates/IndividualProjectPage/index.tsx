import Footer from "../partials/Footer/index";
import Header from "../partials/Header";
import React from "react";
import { withController } from "@/lib/withContoller";
import { Project } from "@/types";
import pick from "lodash/fp/pick";
import ReactPlayer from "react-player";
import NonSSRWrapper from "../../components/NonSSRWrapper";
import { Typography } from "@mui/material";
import Image from "next/image";
import AttributeToInfoBlock from "./AttributeInfoBlock";
import LinksBlock, { VALID_FIELDS } from "./LinksBlock";
import SDGBlock from "./SDGBlock";
import { extractSdgsFromProject } from "../../lib/utils";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import InfoBlock from "./InfoBlock";
import HeadquartersBlock from "./HeadquartersBlock";

function useController(props: { projectData: Project }) {
  const { projectData } = props;
  const sdgs = extractSdgsFromProject(projectData);
  const additionalInfo = pick(
    [
      "project_official_email",
      "founder_names",
      "organization_type",
      "white_paper_url",
      "tag_keywords",
      "year_creation",
    ],
    projectData
  );

  return {
    ...props,
    additionalInfo,
    sdgs,
  };
}
function IndividualProjectPageTemplate(
  props: ReturnType<typeof useController>
) {
  const { projectData, sdgs, additionalInfo } = props;

  let shortDescription =
    projectData["description_short_value_proposition_in_a_tweet"];

  if (shortDescription) {
    shortDescription =
      shortDescription[0].toUpperCase() + shortDescription.slice(1);
  }

  console.log("Project data", projectData);

  return (
    <div className="flex flex-col gap-10 h-full min-h-screen">
      <Header />
      <div className="flex flex-col h-full flex-1">
        <div className="prose max-w-none max-w-7xl mx-auto p-10 w-full h-full">
          <div className="container mx-auto">
            <div className="flex items-center">
              {projectData["logo_url"] && (
                <div>
                  <Image
                    src={projectData["logo_url"]}
                    className="mr-3"
                    alt="project logo"
                    width={100}
                    height={100}
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Typography variant="h1" className="m-0">
                  {projectData["project_name"]}
                </Typography>
                {projectData["business_tagline"] && (
                  <Typography variant="subtitle1">
                    {projectData["business_tagline"]}
                  </Typography>
                )}
              </div>
            </div>
            <Typography variant="h2" className="my-2">
              {projectData["main_category"]}
            </Typography>
            <div>
              <b>Organization type: </b>
              <span>{projectData["organization_type"]}</span>
              <span>{projectData["organization_type"]}</span>
            </div>
            <b>Subcategories: </b>
            <span>{projectData["sub_categories"]?.join(", ")}</span>
            <p>{shortDescription}</p>
          </div>
        </div>
        <div className="prose max-w-none max-w-7xl mx-auto mb-auto p-10 w-full h-full bg-white flex-1">
          <div className="container mx-auto flex justify-between gap-10">
            <div className="flex-2 w-2/3">
              <div>
                <a href="https://sdgs.un.org/goals" target="_blank">
                  <Typography
                    variant="h3"
                    className="inline inline-flex items-center gap-2"
                  >
                    Sustainable Development Goals (SDGs)
                    <InfoOutlinedIcon />
                  </Typography>
                </a>
              </div>
              <SDGBlock sdgs={sdgs} />
              {projectData["long_description"] && (
                <>
                  <h3>Description</h3>
                  <p>{projectData["long_description"]}</p>
                </>
              )}
            </div>
            <div className="flex-1">
              {projectData["video_url"] && (
                <NonSSRWrapper>
                  <ReactPlayer
                    className="mb-4"
                    url={projectData["video_url"]}
                  />
                </NonSSRWrapper>
              )}
              <div className="rounded border p-5 mb-3">
                <h3 className="font-bold mb-2 mt-0">Additional Information</h3>
                {Object.keys(additionalInfo).map((key) => {
                  return (
                    <div key={key} className="mb-2">
                      <AttributeToInfoBlock
                        attribute={key}
                        projectData={additionalInfo}
                      />
                    </div>
                  );
                })}
                <HeadquartersBlock projectData={projectData} />
              </div>
              <LinksBlock links={pick(VALID_FIELDS, projectData)} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withController(IndividualProjectPageTemplate, useController);
