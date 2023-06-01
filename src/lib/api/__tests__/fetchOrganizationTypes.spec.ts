import { fetchOrganizationTypes } from "../fetchOrganizationTypes";

describe("fetchOrganizationTypes", () => {
  let types: any = [];

  beforeAll(async () => {
    types = await fetchOrganizationTypes();
  });

  it("should return the region data", async () => {
    expect(types).toEqual([
      "Start-up",
      "Corporate",
      "Partnership",
      "Private-Public-Partnership",
      "Government",
      "Open-source",
      "DAO",
      "Non-profit",
      "Foundation",
      "Academic",
      "Ad-hoc project",
      "Other",
    ]);
  });
});
