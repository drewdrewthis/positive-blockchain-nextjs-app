import Footer from "../partials/Footer/index";
import Header from "../partials/Header";
import React from "react";
import { withController } from "@/lib/withContoller";
import { Project } from "@/types";
import omit from "lodash/fp/omit";
import ReactPlayer from "react-player";

function useController(props: { projectData: Project }) {
  return props;
}
function IndividualProjectPageTemplate(
  props: ReturnType<typeof useController>
) {
  const { projectData } = props;
  console.log(projectData);
  let shortDescription =
    projectData["description_short_value_proposition_in_a_tweet"];
  shortDescription =
    shortDescription[0].toUpperCase() + shortDescription.slice(1);

  const additionalInfo = omit(
    [
      "slug",
      "project_name",
      "description_short_value_proposition_in_a_tweet",
      "organization_type",
      "original_source_name",
      "original_source_organization",
      "comment",
      "ref",
      "first_sdg",
      "second_sdg",
      "third_sdg",
      "fourth_sdg",
      "long_description",
      "number_of_sd_gs",
      "verified_on",
    ],
    projectData
  );

  return (
    <div className="flex flex-col gap-10 h-full min-h-screen">
      <Header />
      <div className="flex flex-col h-full flex-1">
        <div className="prose max-w-none max-w-7xl mx-auto p-10 w-full h-full">
          <div className="container mx-auto">
            <h1>{projectData["project_name"]}</h1>
            <h2>{projectData["main_category"]}</h2>
            <div>
              <b>Organization type: </b>
              <span>{projectData["organization_type"]}</span>
            </div>
            <b>Subcategories: </b>
            <span>{projectData["sub_categories"].join(", ")}</span>
            <p>{shortDescription}</p>
          </div>
        </div>
        <div className="prose max-w-none max-w-7xl mx-auto mb-auto p-10 w-full h-full bg-white flex-1">
          <div className="container mx-auto flex justify-between gap-10">
            <div className="flex-2 w-2/3">
              <h3>Description</h3>
              <p>{projectData["long_description"]}</p>
            </div>
            <div className="flex-1">
              {projectData["video_url"] && (
                <ReactPlayer className="mb-4" url={projectData["video_url"]} />
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function AttributeToInfoBlock(props: { attribute: string; projectData: any }) {
  const { attribute, projectData } = props;
  const title = snakeCaseToSentenceCase(attribute);
  const content = projectData[attribute];

  return <InfoBlock title={title} content={content} />;
}

function InfoBlock(props: { title: string; content: string | string[] }) {
  const { title, content } = props;

  if (!content) {
    return null;
  }

  if (Array.isArray(content)) {
    return (
      <div>
        <b>{title}: </b>
        {content.map((item, index) => {
          return (
            <span key={index}>
              {item}
              {index !== content.length - 1 ? ", " : ""}
            </span>
          );
        })}
      </div>
    );
  }

  return (
    <div>
      <b>{title}: </b>
      <span>{content}</span>
    </div>
  );
}

function snakeCaseToSentenceCase(str: string) {
  if (!str) return str;

  return str
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

export default withController(IndividualProjectPageTemplate, useController);
