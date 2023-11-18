import { DatabaseService } from "../database.service";

describe("DatabaseService", () => {
  describe("fetchPartnerTags", () => {
    it("should fetch the partner tags from the database sheet", async () => {
      const service = new DatabaseService();
      const tags = await service.fetchPartnerTags();
      expect(tags).toEqual([
        "Financing of env. projects",
        "dMRV / tracking",
        "oracle",
        "Native credit tokens",
        "Tokenized credits",
        "Registry",
        "Trading",
        "B2C Offsetting",
        "B2B Offsetting",
        "B2B2C Offsetting",
        "On-chain transaction offsetting",
        "Ratings / quality / integrity",
        "two way bridge",
      ]);
    });
  });
});
