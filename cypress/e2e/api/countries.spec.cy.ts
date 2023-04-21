interface CountryData {
  country: string;
  subregion: string;
  region: string;
  hemisphere: string;
}

describe("Testing API endpoint for countries", () => {
  it("Returns expected country data", () => {
    cy.request("GET", "http://localhost:3000/nextjs-app/api/countries").then(
      (response) => {
        const countryData: CountryData[] = response.body;
        console.log(countryData);
        expect(response.status).to.eq(200);
        expect(countryData).to.be.an("array");
        expect(countryData[0]).to.include({
          country: "Antartica",
          subregion: "Antartica",
          region: "Antartica",
          hemisphere: "Global South",
        });
      }
    );
  });
});
