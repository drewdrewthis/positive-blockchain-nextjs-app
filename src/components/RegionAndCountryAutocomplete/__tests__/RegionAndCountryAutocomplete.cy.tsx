import React from "react";
import { useForm, FormProvider } from "react-hook-form";

import RegionAndCountryAutocomplete from "..";
import { CountryData } from "../../../types";
import "@/styles/globals.css";

const countries: CountryData[] = [
  {
    country: "Canada",
    hemisphere: "Northern Hemisphere",
    region: "Americas",
    subregion: "North America",
  },
  {
    country: "Brazil",
    hemisphere: "Southern Hemisphere",
    region: "Americas",
    subregion: "South America",
  },
  {
    country: "China",
    hemisphere: "Northern Hemisphere",
    region: "Asia",
    subregion: "Eastern Asia",
  },
  {
    country: "Nigeria",
    hemisphere: "Northern Hemisphere",
    region: "Africa",
    subregion: "Western Africa",
  },
  {
    country: "Australia",
    hemisphere: "Southern Hemisphere",
    region: "Oceania",
    subregion: "Australia and New Zealand",
  },
];
describe("MultiSelect component", () => {
  it("should select multiple items and check for their existence", () => {
    // Mount the component
    cy.mount(<FormWrapper />);

    // Find the select and click on it to open the menu
    cy.get("div[role=button]").click();
    // Select options by their text
    cy.contains("li", "China").click();
    cy.contains("li", "North America").click();

    // Click outside the multiselect to close it
    cy.get("body").click();
  });
});

// Wrapping Form Component that can use a hook
function FormWrapper() {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <div
        style={{
          width: "100vw",
        }}
      >
        <RegionAndCountryAutocomplete id="test-select" countries={countries} />
      </div>
    </FormProvider>
  );
}
