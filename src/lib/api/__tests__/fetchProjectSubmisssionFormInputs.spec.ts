import { fetchProjectSubmissionFormInputs } from "../fetchProjectSubmissionFormInputs";

describe("fetchProjectSubmissionFormInputs", () => {
  let data: any = [];

  beforeAll(async () => {
    data = await fetchProjectSubmissionFormInputs();
  });

  it("should return all of the options data", async () => {
    expect(data).toMatchSnapshot();
  });
});
