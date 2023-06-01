import isUndefined from "lodash/fp/isUndefined";
import omitBy from "lodash/fp/omitBy";

export function convertProjectDataIntoInitialValues(projectData: any) {
  let initialValues = { ...projectData };

  initialValues.category_1 = projectData.PUBLIC_main_category;
  initialValues.category_2 = projectData.category_1;
  initialValues.category_3 = projectData.category_2;

  initialValues.sub_category_1 = stringListToArray(projectData.sub_category_1);
  initialValues.sub_category_2 = stringListToArray(projectData.sub_category_2);
  initialValues.sub_category_3 = stringListToArray(projectData.sub_category_3);

  initialValues.PUBLIC_subregions_list = stringListToArray(
    projectData.PUBLIC_subregions_list
  );

  initialValues.PUBLIC_hq_subregion = stringListToArray(
    projectData.PUBLIC_hq_subregion
  );

  initialValues.PUBLIC_servicing_area = stringListToArray(
    projectData.PUBLIC_servicing_area
  );

  return omitBy(isUndefined, initialValues);
}

// Convert a string list field into an array
function stringListToArray(stringList: string) {
  if (Array.isArray(stringList)) return stringList;
  return (stringList?.split(",") || []).map((value) => value.trim());
}
