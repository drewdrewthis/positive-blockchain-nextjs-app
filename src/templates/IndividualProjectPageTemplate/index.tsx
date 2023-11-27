import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Typography } from "@mui/material";
import pick from "lodash/fp/pick";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactPlayer from "react-player/lazy";

import { withController } from "@/lib/withContoller";
import { Project } from "@/types";

import NonSSRWrapper from "../../components/NonSSRWrapper";
import { extractSdgsFromProject } from "../../lib/utils";
import Footer from "../partials/Footer/index";
import Header from "../partials/Header";

import AttributeToInfoBlock from "./AttributeInfoBlock";
import HeadquartersBlock from "./HeadquartersBlock";
import InfoBlock from "./InfoBlock";
import LinksBlock, { VALID_FIELDS } from "./LinksBlock";
import SDGBlock from "./SDGBlock";

function useController(props: { projectData: Project }) {
  const { projectData } = props;
  const sdgs = extractSdgsFromProject(projectData);
  const additionalInfo = pick(
    [
      "year_creation",
      "token_ticker",
      "founder_names",
      "organization_type",
      "white_paper_url",
      "tag_keywords",
    ],
    projectData
  );

  let shortDescription =
    projectData["description_short_value_proposition_in_a_tweet"];

  if (shortDescription) {
    shortDescription =
      shortDescription[0].toUpperCase() + shortDescription.slice(1);
  }

  return {
    ...props,
    additionalInfo,
    shortDescription,
    sdgs,
  };
}

function IndividualProjectPageTemplate(
  props: ReturnType<typeof useController>
) {
  const { projectData, sdgs, additionalInfo, shortDescription } = props;

  return (
    <div className="flex flex-col gap-10 h-full min-h-screen">
      <Header />
      <div className="flex flex-col h-full flex-1">
        <div className="prose max-w-none max-w-7xl mx-auto pb-10 px-10 w-full h-full">
          <div className="container mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-center">
              {projectData["logo_url"] && (
                <div className="w-1/4 sm:w-auto">
                  <Image
                    src={projectData["logo_url"]}
                    className="mr-8"
                    alt="project logo"
                    width={150}
                    height={150}
                  />
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Typography
                  variant="h1"
                  className="m-0 text-brand-secondary font-semibold"
                >
                  {projectData["project_name"]}
                </Typography>
                <Typography variant="h2" className="my-2">
                  {projectData["main_category"]}
                </Typography>
                {projectData["business_tagline"] && (
                  <Typography variant="subtitle1">
                    {projectData["business_tagline"]}
                  </Typography>
                )}
              </div>
            </div>
            <p>{shortDescription}</p>
            <div>
              <b>Subcategories: </b>
              <span>{projectData["sub_categories_list"]?.join(", ")}</span>
            </div>
          </div>
        </div>
        <div className="prose max-w-none max-w-7xl mx-auto mb-auto p-10 w-full h-full bg-white flex-1">
          <div className="container mx-auto lg:flex justify-between gap-10">
            <div className="flex-2 lg:w-7/12">
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
            <div className="flex-1 flex flex-col gap-3">
              {projectData["active"] && (
                <div className="mb-2">
                  <InfoBlock title="Status" content={projectData["active"]} className="text-green-600 font-bold"/>
                </div>
              )}
              <div className="border rounded p-3 bg-slate-200">
                <div>Do you work here? </div>
                <Link
                  aria-label="Claim/Propose Edit to Project"
                  className="text-brand-link inline"
                  // This is a the base google form.
                  // href="https://forms.gle/Xp4xTYAnn3Z99t316"
                  href={`/forms/project-submission?prefill_slug=${projectData["slug"]}`}
                  target="_blank"
                >
                  Claim/Propose Edit to Project
                </Link>
              </div>
              {projectData["video_url"] && (
                <NonSSRWrapper>
                  <ReactPlayer
                    light
                    className="mb-4 !w-full"
                    url={projectData["video_url"]}
                  />
                </NonSSRWrapper>
              )}
              <div className="rounded border p-5">
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
              <LinksBlock
                className="mb-3"
                links={pick(VALID_FIELDS, projectData)}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default withController(IndividualProjectPageTemplate, useController);
