export default function Label(props: { text?: string; required?: boolean }) {
  if (!props.text) return null;
  let text = props.text;
  if (props.required) {
    text += " *";
  }
  return <div className="font-bold">{text}</div>;
}
