import { snakeCaseToSentenceCase } from "../../lib/utils";

export default function AttributeToInfoBlock(props: {
  attribute: string;
  projectData: any;
}) {
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
