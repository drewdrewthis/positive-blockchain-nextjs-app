export interface FilterGroupProps {
  title: string;
  key: string;
  labels: string[];
  type?: "checkbox" | "multi-select-search";
  helperText?: string;
}
export interface Props {
  filters: FilterGroupProps[];
  className?: string;
  onChange?: (values: any) => void;
}
