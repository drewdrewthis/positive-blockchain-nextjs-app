export function snakeCaseToSentenceCase(str: string) {
  if (!str) return str;

  return str
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}
