/// <reference types="cypress" />

import React from "react";
import ProjectFilter from "./";
import sampleData from "@/sampleData/projectData.json";
import { extractFiltersFromProjectData } from "@/lib/utils";

const filters = extractFiltersFromProjectData(sampleData.data);

describe("<ProjectFilter />", () => {
  const filterProps = [
    {
      title: "Categories",
      key: "main_category",
      labels: filters.main_category,
    },
    {
      title: "Blockchain Type",
      key: "blockchain_type",
      labels: filters.blockchain_type,
    },
    {
      type: "multi-select-search" as const,
      title: "Blockchain Technology",
      key: "blockchain_technology",
      labels: filters.blockchain_technology,
    },
    {
      title: "HQ",
      type: "multi-select-search" as const,
      key: "primary_headquarter_country",
      labels: filters.primary_headquarter_country,
    },
  ];

  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ProjectFilter filters={filterProps} />);
    cy.get('input[type="checkbox"]').should("have.length", 28);
  });

  describe("when checking boxes", () => {
    it("should correctly handle the onChange callback", () => {
      const onChangeSpy = cy.spy().as("onChangeSpy");
      cy.mount(<ProjectFilter filters={filterProps} onChange={onChangeSpy} />);
      cy.get('input[type="checkbox"]').eq(0).check();

      cy.get("@onChangeSpy").should("have.been.calledWith", {
        main_category: ["finance-insurance"],
      });
    });
  });

  describe("when using the autocomplete multiselect", () => {
    it("should correctly handle the onChange callback", () => {
      const onChangeSpy = cy.spy().as("onChangeSpy");
      cy.mount(<ProjectFilter filters={filterProps} onChange={onChangeSpy} />);
      // Type ethereum, up arrow, enter
      cy.get('input[type="text"]').eq(0).type("Ethereum{uparrow}{enter}");

      cy.get("@onChangeSpy").should("have.been.calledWith", {
        blockchain_technology: [
          "Energy Web Chain/Ethereum private chain/Pylon Network",
        ],
      });
    });
  });
});
