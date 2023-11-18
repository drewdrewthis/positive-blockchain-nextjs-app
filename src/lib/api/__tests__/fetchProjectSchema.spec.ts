import { fetchProjectSubmissionFormInputs } from "../fetchProjectSubmissionFormInputs";

describe("fetchProjectSubmissionFormInputs", () => {
  let formInputs: any = [];

  beforeAll(async () => {
    formInputs = await fetchProjectSubmissionFormInputs();
  });

  it("should match snapshot", () => {
    expect(formInputs).toMatchSnapshot();
  });

  it("should contain the project name input", async () => {
    expect(formInputs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          columnIdx: expect.any(Number),
          key: "PUBLIC_project_name",
          headerTitle: "Project name",
          type: "text",
        }),
      ])
    );
  });

  it("should contain the active input", async () => {
    expect(formInputs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          columnIdx: expect.any(Number),
          key: "PUBLIC_active",
          headerTitle: "Select status",
          type: "select",
        }),
      ])
    );
  });

  it("should contain the categories input", async () => {
    expect(formInputs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          columnIdx: expect.any(Number),
          key: "PUBLIC_categories_list",
          headerTitle: "All Categories",
          options: expect.arrayContaining([
            "Health",
            "Identity & Ownership",
            "Government & Democracy",
            "Education & Employment",
            "Finance & Insurance",
          ]),
          required: true,
          type: "multi-select",
        }),
      ])
    );
  });

  it("should contain the subcategories input", async () => {
    expect(formInputs).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          columnIdx: expect.any(Number),
          key: "PUBLIC_sub_categories_list",
          headerTitle: "All subcategories",
          options: expect.objectContaining({
            "Agriculture & Food": ["Farming", "Food Transparency"],
            "Aid & Philanthropy": [
              "Development & Aid",
              "Donation & Charities",
              "Development Finance",
              "Refugee crisis",
              "Disaster Relief",
            ],
          }),
        }),
      ])
    );
  });

  it("should return 40 inputs", async () => {
    expect(formInputs).toHaveLength(60);
  });

  it("should match the snapshot", async () => {
    expect(formInputs).toMatchSnapshot();
  });
});
