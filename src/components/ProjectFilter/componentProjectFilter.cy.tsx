import React from "react";
import ProjectFilter from "./";

describe("<ProjectFilter />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
      <ProjectFilter
        blockchainTechnologies={["bitcoin", "ethereum"]}
        blockchainUses={[
          "Payments and Money Transfers",
          "Supply Chain Management",
          "Payments and Money Transfer",
          "Records and Verification",
        ]}
        stages={[]}
      />
    );

    cy.get('input[type="checkbox"]').should("have.length", 6);
  });

  it("should correctly handle the onChange callback", () => {
    const onChangeSpy = cy.spy().as("onChangeSpy");

    cy.mount(
      <ProjectFilter
        blockchainTechnologies={["bitcoin", "ethereum"]}
        blockchainUses={[
          "Payments and Money Transfers",
          "Supply Chain Management",
          "Payments and Money Transfer",
          "Records and Verification",
        ]}
        stages={[]}
        onChange={onChangeSpy}
      />
    );

    cy.get('input[type="checkbox"]').eq(0).check();

    cy.get("@onChangeSpy").should("have.been.calledWith", {
      blockchainTechnologyFilters: ["bitcoin"],
      // blockchainUsesFilters: [],
    });
  });
});
