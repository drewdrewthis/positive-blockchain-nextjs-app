describe("Project Page", () => {
  it("should load the projects correctly", () => {
    cy.visit("http://localhost:3000/database");

    // Should find the text "Token Engineering Commons"
    cy.contains("BCDC").click();
    cy.contains(
      "A UK based start-up committed to developing new technologies and leveraging them to make a positive impact on the world"
    );
  });
});
