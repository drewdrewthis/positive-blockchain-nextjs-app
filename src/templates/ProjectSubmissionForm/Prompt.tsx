export default function Prompt(props: { text?: string }) {
  if (!props.text) return null;
  return <div className="text-sm">{props.text}</div>;
}
