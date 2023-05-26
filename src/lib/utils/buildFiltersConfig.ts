/**
Builds the configuration for the filters that will be displayed on the UI.
The filters configuration is returned as an array of filter objects.
*/
export function buildFiltersConfig(filters: Record<string, string[]>): {
  // Display title of the filter
  title: string;
  // Key that corresponds to the property in the project object
  key: string;
  // Labels for the select options
  labels: string[];
  // Type of the filter UI element
  type?: "multi-select-search";
  // Helper text to be displayed for the filter
  helperText?: string;
}[] {
  return [
    {
      title: "Status",
      key: "active",
      labels: filters.active,
    },
    {
      title: "Categories",
      key: "categories_list",
      labels: filters.categories,
    },
    {
      title: "Sub-Categories",
      key: "sub_categories_list",
      labels: filters.sub_categories,
      type: "multi-select-search" as const,
    },
    {
      title: "Sustainable Development Goals",
      key: "sdg_occurences",
      labels: [
        "1: No Poverty",
        "2: Zero Hunger",
        "3: Good Health and Well-Being",
        "4: Quality Education",
        "5: Gender Equality",
        "6: Clean Water and Sanitation",
        "7: Affordable and Clean Energy",
        "8: Decent Work and Economic Growth",
        "9: Industry, Innovation and Infrastructure",
        "10: Reduced Inequalities",
        "11: Sustainable Cities and Communities",
        "12: Responsible Consumption and Production",
        "13: Climate Action",
        "14: Life Below Water",
        "15: Life on Land",
        "16: Peace, Justice and Strong Institutions",
        "17: Partnerships for the Goals",
      ],
    },
    {
      title: "Blockchain Type",
      key: "blockchain_type",
      labels: filters.blockchain_type,
    },
    {
      type: "multi-select-search" as const,
      title: "Blockchain Technology",
      key: "blockchain_technology",
      labels: filters.blockchain_technology,
    },
    {
      title: "HQ Country",
      type: "multi-select-search" as const,
      key: "primary_headquarter_country",
      labels: filters.primary_headquarter_country,
      helperText:
        "NB: If the country is not listed in the search, there are no projects matching that country.",
    },
    {
      title: "Servicing Country",
      type: "multi-select-search" as const,
      key: "servicing_area",
      labels: filters.servicing_area,
      helperText:
        "NB: If the country is not listed in the search, there are no projects matching that country.",
    },
    {
      title: "Servicing Region",
      type: "multi-select-search" as const,
      key: "servicing_region",
      labels: filters.servicing_region,
      helperText:
        "NB: If the region is not listed in the search, there are no projects matching that region.",
    },
    {
      title: "PB Partner Tag",
      key: "pb_partner_tag",
      labels: filters.pb_partner_tag,
    },
  ];
}
