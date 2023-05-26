describe("Project data endpoint", () => {
  it("should be blocked without x-api-key header", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/database/api/v1/projects",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it("should return data with correct x-api-key header", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/database/api/v1/projects",
      headers: {
        "x-api-key": Cypress.env("API_KEY"),
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("data");
    });
  });
});
