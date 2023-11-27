import { snakeCaseToSentenceCase } from "../../lib/utils";

export default function InfoBlock(props: {
  title: string;
  content: string | string[];
  className?: string;
}) {
  const { title, content, className } = props;

  if (!content) {
    return null;
  }

  if (Array.isArray(content)) {
    return (
      <div>
        <b>{title}: </b>
        {content.map((item, index) => {
          return (
            <span className={className} key={index}>
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
      <span className={className}>{snakeCaseToSentenceCase(content)}</span>
    </div>
  );
}
