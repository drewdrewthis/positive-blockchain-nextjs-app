import { fetchBlockchainTechnologies } from "../fetchBlockchainTechnologies";

describe("fetchBlockchainTechnologies", () => {
  let types: any = [];

  beforeAll(async () => {
    types = await fetchBlockchainTechnologies();
  });

  it("should match snapshot", () => {
    expect(types).toMatchSnapshot();
  });

  it("should return the region data", async () => {
    expect(types).toEqual(
      expect.arrayContaining(["Bitcoin", "Cardano", "Ethereum"])
    );
  });
});
