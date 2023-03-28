interface FilterGroupProps {
  title: string;
  labels: string[];
}
export interface Props {
  filters: FilterGroupProps[];
  className?: string;
  onChange?: (values: any) => void;
}
