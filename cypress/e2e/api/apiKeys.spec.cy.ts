describe("Project data endpoint", () => {
  it("should be blocked without x-api-key header", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/nextjs-app/api/project-data",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("should return data with correct x-api-key header", () => {
    console.log("key", Cypress.env("API_KEY"));
    cy.request({
      method: "GET",
      url: "http://localhost:3000/nextjs-app/api/project-data",
      headers: {
        "x-api-key": Cypress.env("API_KEY"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });
});
