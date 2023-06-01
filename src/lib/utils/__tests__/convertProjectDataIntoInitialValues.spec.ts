import { convertProjectDataIntoInitialValues } from "../convertProjectDataIntoInitialValues";

describe("convertProjectDataIntoInitialValues", () => {
  it("should convert project data into initial values", () => {
    const projectData = {
      PUBLIC_main_category: "Main Category",
      category_1: "Category 1",
      category_2: "Category 2",
      sub_category_1: "Sub Category 1",
      sub_category_2: "Sub Category 2",
      sub_category_3: "Sub Category 3",
      PUBLIC_subregions_list: "Subregion 1, Subregion 2",
      PUBLIC_hq_subregion: "HQ Subregion",
      otherData: "Other Data",
    };

    const expectedInitialValues = {
      ...projectData,
      PUBLIC_servicing_area: [],
      category_1: projectData.PUBLIC_main_category,
      category_2: projectData.category_1,
      category_3: projectData.category_2,
      sub_category_1: ["Sub Category 1"],
      sub_category_2: ["Sub Category 2"],
      sub_category_3: ["Sub Category 3"],
      PUBLIC_subregions_list: ["Subregion 1", "Subregion 2"],
      PUBLIC_hq_subregion: ["HQ Subregion"],
    };

    const result = convertProjectDataIntoInitialValues(projectData);

    expect(result).toEqual(expectedInitialValues);
  });
});
