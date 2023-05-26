const UNFILTERED_COUNT = 17;

describe("Filters", () => {
  describe("Sub-categories", () => {
    it("tests the sidebar filter", () => {
      cy.visit("http://localhost:3000/database");

      // Unfiltered count
      cy.get(".MuiGrid2-root").should("have.length", UNFILTERED_COUNT);

      // Ensure autocomplete is loaded and visible
      cy.get('input[id="sub_categories_list"]').should("be.visible");

      // Select first sub-category starting with "Certification"
      cy.get('input[id="sub_categories_list"]').type("Certification");
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

  describe("Service Country", () => {
    it("tests the sidebar filter", () => {
      cy.visit("http://localhost:3000/database");

      // Unfiltered count
      cy.get(".MuiGrid2-root").should("have.length", UNFILTERED_COUNT);

      // Ensure autocomplete is loaded and visible
      cy.get('input[id="servicing_area"]').should("be.visible");

      // Select first sub-category starting with "Certification"
      cy.get('input[id="servicing_area"]').type("Af");
      cy.contains(".MuiAutocomplete-popper li", /^Af/).click();

      // Verify that "Certification & Notarization" is written in a chip on the filter area
      cy.get(".MuiChip-label").should("have.text", "Afghanistan");

      // Verify that the project "Digitary" is displayed in the main grid
      // It would not be visible if the filter was not working
      cy.contains("Afghanistan").should("be.visible");

      // Filter works
      cy.get(".MuiGrid2-root").should("have.length.lessThan", UNFILTERED_COUNT);
    });
  });

  describe("Service Region", () => {
    it("tests the sidebar filter", () => {
      cy.visit("http://localhost:3000/database");

      // Unfiltered count
      cy.get(".MuiGrid2-root").should("have.length", UNFILTERED_COUNT);

      // Ensure autocomplete is loaded and visible
      cy.get('input[id="servicing_region"]').should("be.visible");

      // Select first sub-category starting with "Certification"
      cy.get('input[id="servicing_region"]').type("Asi");
      cy.contains(".MuiAutocomplete-popper li", /^Asi/).click();

      // Verify that "Certification & Notarization" is written in a chip on the filter area
      cy.get(".MuiChip-label").should("have.text", "Asia");

      // Verify that the project "Digitary" is displayed in the main grid
      // It would not be visible if the filter was not working
      cy.contains("TE-FOOD").should("be.visible");

      // Unfiltered count
      cy.get(".MuiGrid2-root").should("have.length.lessThan", 31);
    });
  });
});
