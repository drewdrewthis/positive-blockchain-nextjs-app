import { test, expect } from "@playwright/test";

test.setTimeout(60000 * 10);
test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/database");
  await page.getByRole("heading", { name: "Project Directory" }).click();
  await page.getByRole("button", { name: "Status" }).click();
  await page
    .locator("span")
    .filter({ hasText: /^Active$/ })
    .nth(1)
    .click();
  await page.getByText("Active - no blockchain any longer").click();
  await page
    .getByText(
      "A project from the UN's World Food Program to give cryptocurrency vouchers to Sy"
    )
    .click();
  await page.getByLabel("Inactive").check();
  await page.getByLabel("Start-up").check();
  await page.getByRole("button", { name: "Categories" }).click();
  await page.getByLabel("Agriculture & Food").check();
  await page.getByLabel("Transport & Infrastructure").check();
  await page.getByLabel("Open").first().click();
  await page.getByRole("option", { name: "Aid & Philanthropy" }).click();
  await page.getByLabel("Clear").click();
  await page.getByLabel("Go to page 2").click();
  await page.getByLabel("Go to next page").click();
  await page
    .getByText(
      "FiltersStatusActiveActive - no blockchain any longerInactiveStart-upCategoriesAg"
    )
    .click();
  await page.locator("#primary_headquarter_country").click();
  await page.getByRole("option", { name: "Argentina" }).click();
  await page.getByRole("option", { name: "Andorra" }).click();
  await page.locator("#servicing_region").click();
  await page.getByLabel("Open").nth(2).click();
  await page.getByLabel("Clear").click();
  await page.getByRole("option", { name: "Andorra" }).click();
  await page.getByRole("option", { name: "Armenia" }).click();
  await page.getByLabel("Clear").click();
  await page.locator("#servicing_region").click();
  await page.getByRole("option", { name: "Europe", exact: true }).click();
  await page.getByRole("option", { name: "Central/South America" }).click();
  await page.getByLabel("Clear").click();
  await page.getByRole("button", { name: "PB Partner Tag" }).click();
  await page.getByText("BC 100+").click();
  await page.getByText("ECOTA").click();
  await page.getByRole("button", { name: "Get Database" }).click();
  await page.getByRole("link", { name: "Projects" }).click();
  await page.getByRole("link", { name: "API" }).click();
  await page.getByRole("button", { name: "Authorize" }).click();
  await page.getByRole("button", { name: "Close" }).click();
  await page.getByRole("link", { name: "Projects" }).click();
  await page.getByPlaceholder("Search for projects").click();
  await page.getByPlaceholder("Search for projects").fill("jljl,");
  await page.getByText("Search relevance: 81.36 %").click();
  await page
    .locator("div")
    .filter({ hasText: /^Search relevance: 81\.36 %$/ })
    .locator("b")
    .dblclick();
  await page
    .locator("div")
    .filter({ hasText: /^Search relevance: 81\.36 %$/ })
    .locator("b")
    .dblclick();
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("link", { name: "bfg_logo" }).click();
  const page1 = await page1Promise;
});
