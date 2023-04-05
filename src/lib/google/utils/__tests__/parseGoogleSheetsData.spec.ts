import { parseGoogleSheetsValuesByHeaderRow } from "../parseGoogleSheetsValuesByHeaderRow";
import { SAMPLE_DATA } from "./sampleData/sample-data";

describe("parseGoogleSheets", () => {
  it("should parse a google sheet", () => {
    const data = parseGoogleSheetsValuesByHeaderRow(SAMPLE_DATA);

    expect(data[0]).toMatchObject(
      expect.objectContaining({
        slug: "gem",
        source: "Positiveblockchain",
        ref: "284",
        project_name: "Gem",
        website: "https://enterprise.gem.co/",
        categories: "Health",
        sub_categories: ["Health", "Patient Data"],
        description:
          "a cryptocurrency platform as a universal wallet for assets, as well as an Operating System (OS) named GemOS to manage data for the healthcare ecosystem",
        status: "Inactive",
        organization_type: "start-up",
        headquarter_country: "USA",
        year_creation: "2015",
        founders: ["Micah Winkelspecht, Founder & CEO"],
      })
    );
  });
});
