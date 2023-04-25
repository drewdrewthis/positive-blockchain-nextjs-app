describe("Filters", () => {
  describe("Sub-categories", () => {
    it("tests the sidebar filter", () => {
      cy.visit("http://localhost:3000/nextjs-app/projects");

      // Ensure autocomplete is loaded and visible
      cy.get('input[id="sub_categories"]').should("be.visible");

      // Select first sub-category starting with "Certification"
      cy.get('input[id="sub_categories"]').type("Certification");
      cy.contains(".MuiAutocomplete-popper li", /^Certification/).click();

      // Verify that "Certification & Notarization" is written in a chip on the filter area
      cy.get(".MuiChip-label").should(
        "have.text",
        "Certification & Notarization"
      );

      // Verify that the project "Digitary" is displayed in the main grid
      // It would not be visible if the filter was not working
      cy.contains("Digitary").should("be.visible");
    });
  });
});
