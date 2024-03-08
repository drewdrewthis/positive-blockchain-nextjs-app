import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation'
import { Props } from "./types";

export function useController(props: Props) {
  const searchParams = useSearchParams();
  const partner = searchParams.get('partner');

  const [filterGroups, setFilterGroups] = useState<any>({
    active: ['active']
  });
  const { onChange = () => {} } = props;

  useEffect(() => {
    if (partner) {
      setFilterGroups({
        ...filterGroups,
        pb_partner_tag: [partner],
      });
    }
  }, [partner])
  
  const partnerFilter = props.filters.find(filter => filter.key === 'pb_partner_tag');
  if (partnerFilter && partner) {
    partnerFilter.defaultValues = { [partner]: true }
    partnerFilter.isOpenInitial = true
  }

  useEffect(() => {
    // Handle the change of any of the filters.
    onChange(filterGroups);
  }, [onChange, filterGroups]);

  return {
    ...props,
    handleFilterChange: (key: string, values: Record<string, boolean>) => {
      setFilterGroups({
        ...filterGroups,
        [key]: values,
      });
    },
  };
}
