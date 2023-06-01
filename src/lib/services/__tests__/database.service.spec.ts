import { DatabaseService } from "../database.service";

describe("DatabaseService", () => {
  describe("fetchPartnerTags", () => {
    it("should fetch the partner tags from the database sheet", async () => {
      const service = new DatabaseService();
      const tags = await service.fetchPartnerTags();
      expect(tags).toEqual(["ECOTA", "BC 100+"]);
    });
  });
});
