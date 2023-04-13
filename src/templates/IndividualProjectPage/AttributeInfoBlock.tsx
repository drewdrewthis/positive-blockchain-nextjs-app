import { snakeCaseToSentenceCase } from "../../lib/utils";
import InfoBlock from "./InfoBlock";

export default function AttributeToInfoBlock(props: {
  attribute: string;
  projectData: any;
}) {
  const { attribute, projectData } = props;
  const title = snakeCaseToSentenceCase(attribute);
  const content = projectData[attribute];

  return <InfoBlock title={title} content={content} />;
}
