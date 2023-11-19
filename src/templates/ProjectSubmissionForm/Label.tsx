import { twMerge } from "tailwind-merge";

export default function Label(props: {
  text?: string;
  required?: boolean;
  className?: string;
}) {
  if (!props.text) return null;
  let text = props.text;
  if (props.required) {
    text += " *";
  }
  return (
    <div className={twMerge("font-bold mb-2", props.className)}>{text}</div>
  );
}
