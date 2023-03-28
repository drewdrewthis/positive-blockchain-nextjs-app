interface FilterGroupProps {
  title: string;
  labels: string[];
  type?: "checkbox" | "multi-select-search";
}
export interface Props {
  filters: FilterGroupProps[];
  className?: string;
  onChange?: (values: any) => void;
}
