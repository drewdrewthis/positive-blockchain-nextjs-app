import { fetchRegionData } from "../fetchRegionData";

describe("fetchRegionData", () => {
  let regionData: any = [];

  beforeAll(async () => {
    regionData = await fetchRegionData();
  });

  it("should return the region data", async () => {
    expect(regionData).toMatchSnapshot();
  });
});
