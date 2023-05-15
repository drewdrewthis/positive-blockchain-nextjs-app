describe("Project Page", () => {
  it("should load the projects correctly", () => {
    cy.visit("http://localhost:3000/database");

    // Should find the text "Token Engineering Commons"
    cy.contains("Token Engineering Commons").click();
    cy.contains("Additional Information");
  });
});
