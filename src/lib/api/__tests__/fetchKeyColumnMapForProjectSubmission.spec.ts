import { fetchKeyColumnMapForProjectSubmission } from "../fetchKeyColumnMapForProjectSubmission";

describe("fetchKeyColumnMapForProjectSubmission", () => {
  let types: any = [];

  beforeAll(async () => {
    types = await fetchKeyColumnMapForProjectSubmission();
  });

  it("should match snapshot", () => {
    expect(types).toMatchSnapshot();
  });

  it("should return the column index map", async () => {
    expect(types).toMatchObject({
      PUBLIC_project_name: 3,
      PUBLIC_active: 4,
    });
  });
});
