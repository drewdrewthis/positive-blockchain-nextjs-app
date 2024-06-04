import { test, expect } from "@playwright/test";

test.setTimeout(60_000 * 10);

test("Page exists", async ({ page }) => {
  await page.goto("http://localhost:3000/database/forms/project-submission");
});

test("test", async ({ page }) => {
  await page.goto("http://localhost:3000/database/forms/project-submission");
  await page
    .getByRole("heading", {
      name: "PositiveBlockchain database - Submit a new project",
    })
    .click();
  await page
    .locator("#mui-component-select-is_positive_blockchain_project")
    .click();
  await page.getByRole("option", { name: "Yes" }).click();
  await page.getByPlaceholder('e.g. "PositiveBlockchain"').click();
  await page
    .getByPlaceholder('e.g. "PositiveBlockchain"')
    .fill("TEST: Some cool project");
  await page.getByPlaceholder('e.g. "PositiveBlockchain"').press("Tab");
  await page.locator("#mui-component-select-PUBLIC_active").click();
  await page.getByRole("option", { name: "Active", exact: true }).click();
  await page.getByPlaceholder("e.g. https://positiveblockchain.io").click();
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .fill("somecoolwebsite.com");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("Tab");
  await page.getByLabel("Select a category").click();
  await page.getByRole("option", { name: "Energy" }).click();
  await page.getByLabel("Subcategories").click();
  await page.getByRole("option", { name: "Energy Certificates" }).click();
  await page.getByRole("option", { name: "Energy Trade" }).click();
  await page.locator("#menu-sub_category_1 div").first().click();
  await page.getByRole("button", { name: "+ Add Category" }).click();
  await page.getByLabel("Select a category").click();
  await page.getByRole("option", { name: "Health" }).click();
  await page
    .getByRole("button", { name: "Subcategories ​", exact: true })
    .click();
  await page.getByRole("option", { name: "Sport & healthy behaviors" }).click();
  await page.locator("#menu-sub_category_2 div").first().click({
    force: true,
    noWaitAfter: true,
  });
  // Stops here

  // Click outside of the form
  await page.locator("html").click();

  await page.getByRole("button", { name: "+ Add Category" }).click();
  await page.getByLabel("Select a category").click();
  await page.getByRole("option", { name: "Climate & Environment" }).click();
  await page
    .getByTestId("project-submission-form")
    .locator("div")
    .filter({
      hasText:
        "Primary Category *EnergySubcategoriesEnergy Certificates, Energy TradeSubcategor",
    })
    .nth(1)
    .click();
  await page.getByRole("option", { name: "Patient data" }).click();
  await page.getByRole("option", { name: "Clinical & research" }).click();
  await page.locator("#menu-sub_category_2 div").first().click({
    force: true,
    noWaitAfter: true,
  });

  await page
    .getByRole("button", { name: "Subcategories ​", exact: true })
    .click({
      force: true,
      noWaitAfter: true,
    });
  // Click outside of the form
  await page.locator("html").click();

  await page.getByRole("option", { name: "Sanitation & Water" }).click();
  await page
    .getByRole("option", { name: "Climate & carbon reduction" })
    .click();
  await page.locator("#menu-sub_category_3 div").first().click({
    force: true,
    noWaitAfter: true,
  });
  // Click outside of the form
  await page.locator("html").click();
  await page.getByLabel("delete").nth(1).click();
  await page
    .getByPlaceholder(
      "e.g. We utilize blockchain technology to create sustainable supply chains."
    )
    .click();
  await page
    .getByPlaceholder(
      "e.g. We utilize blockchain technology to create sustainable supply chains."
    )
    .fill("Some cool description");
  await page
    .getByPlaceholder(
      "e.g. We utilize blockchain technology to create sustainable supply chains."
    )
    .press("Tab");
  await page
    .getByPlaceholder(
      "e.g. Founded in 2021, our company specializes in using blockchain technology to..."
    )
    .fill("Some long description");
  await page.locator("html").click();
  await page.getByTestId("project-submission-form").click();
  await page.locator("html").click();
  await page.locator("html").click();
  await page
    .getByText(
      "About the projectIs the project a PositiveBlockchain project?This means you have"
    )
    .click();
  await page.locator("#mui-component-select-PUBLIC_year_creation").click();
  await page.getByRole("option", { name: "2020" }).click();
  await page
    .getByPlaceholder('e.g. "John Doe", "CEO"; "Jane Doe", "CTO"')
    .click();
  await page
    .getByPlaceholder('e.g. "John Doe", "CEO"; "Jane Doe", "CTO"')
    .fill("Some cool founder, some cool found");
  await page
    .getByPlaceholder('e.g. "John Doe", "CEO"; "Jane Doe", "CTO"')
    .press("Tab");
  await page.getByPlaceholder("e.g. San Francisco").fill("Some cool city");
  await page.getByPlaceholder("e.g. San Francisco").press("Tab");
  await page
    .locator("#mui-component-select-PUBLIC_primary_headquarter_country")
    .press("Enter");
  await page.getByRole("option", { name: "Aruba" }).click();
  await page.locator("#PUBLIC_servicing_area").click();
  await page.getByRole("option", { name: "Aruba" }).click();
  await page.getByRole("option", { name: "All Carribean" }).click();
  await page.getByRole("option", { name: "Grenada" }).click();
  await page.getByPlaceholder("e.g. Microsoft, IBM").fill("Some cool partner");
  await page.getByPlaceholder("e.g. Microsoft, IBM").press("Enter");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .click();
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .fill("somelink.com");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("Tab");
  await page.getByLabel("White Paper Url").fill("somelink.com");
  await page.getByLabel("White Paper Url").press("Tab");
  await page.getByLabel("Twitter Url").fill("somelink.com");
  await page.getByLabel("Twitter Url").press("Tab");
  await page.locator("#mui-component-select-PUBLIC_blockchain_type").click();
  await page.getByRole("option", { name: "Private" }).click();
  await page.getByLabel("Facebook Url").click();
  await page.getByLabel("Facebook Url").fill("somelink.com");
  await page.getByLabel("Facebook Url").press("Tab");
  await page.getByLabel("Linkedin Url").fill("somelink.com");
  await page.getByLabel("Linkedin Url").press("Meta+a");
  await page.getByLabel("Linkedin Url").press("Meta+c");
  await page.getByLabel("Linkedin Url").press("Tab");
  await page.getByLabel("Discord Url").fill("somelink.com");
  await page.getByLabel("Discord Url").press("Tab");
  await page.getByLabel("Github Url").fill("somelink.com");
  await page.getByLabel("Github Url").press("Tab");
  await page.getByLabel("Coinmarketcap Url").fill("somelink.com");
  await page.getByLabel("Coinmarketcap Url").press("Tab");
  await page
    .getByPlaceholder("e.g. https://link1.com, https://link2.com")
    .fill("somelink.com");
  await page
    .locator("#mui-component-select-PUBLIC_blockchain_technology")
    .click();
  await page.getByRole("option", { name: "Celo" }).click();
  await page.getByRole("option", { name: "BigchainDB" }).click();
  await page.getByRole("option", { name: "Atala PRISM" }).click();
  await page.getByRole("option", { name: "Atala PRISM" }).press("Tab");
  await page.getByPlaceholder("e.g. BTC").click();
  await page.getByPlaceholder("e.g. BTC").fill("CTT");
  await page.getByPlaceholder("e.g. BTC").press("Tab");
  await page
    .getByPlaceholder("e.g. https://yourwebsite.com/logo.png")
    .fill("somelink.com");
  await page
    .getByPlaceholder("e.g. https://yourwebsite.com/logo.png")
    .press("Tab");
  await page.locator("#mui-component-select-PUBLIC_pb_partner_tag").click();
  await page.getByRole("option", { name: "ECOTA" }).click();
  await page.getByRole("option", { name: "ECOTA" }).press("Tab");
  await page.locator("html").click();
  await page.locator("#mui-component-select-is_project_owner").click();
  await page.getByRole("option", { name: "Yes" }).click();
  await page.getByPlaceholder("e.g. John Doe").click();
  await page.getByPlaceholder("e.g. John Doe").fill("SOmething cool");
  await page.getByPlaceholder("e.g. John Doe").press("Tab");
  await page.getByPlaceholder("e.g. john.doe@example.com").click();
  await page.getByPlaceholder("e.g. john.doe@example.com").fill("cool@ss.com");
  await page.getByPlaceholder("e.g. john.doe@example.com").press("Tab");
  await page
    .locator("#mui-component-select-should_receive_newsletter")
    .press("Enter");
  await page.getByRole("option", { name: "Yes" }).press("ArrowDown");
  await page.getByRole("option", { name: "No" }).press("Enter");
  await page.getByLabel("​", { exact: true }).click();
  await page.getByRole("option", { name: "No" }).click();
  await page.getByPlaceholder("Anything else to add?").click();
  await page.getByPlaceholder("Anything else to add?").fill("NOpe!");
  await page.getByRole("button", { name: "SUBMIT" }).click();
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .fill("http://somecoolwebsite.com");
  await page
    .getByPlaceholder("e.g. https://positiveblockchain.io")
    .press("Enter");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("ArrowLeft");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .fill("http://somelink.com");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("Enter");
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .click({
      clickCount: 3,
    });
  await page
    .getByPlaceholder("e.g. https://www.youtube.com/watch?v=dQw4w9WgXcQ")
    .press("Meta+c");
  await page.getByLabel("White Paper Url").click();
  await page.getByLabel("White Paper Url").press("Meta+a");
  await page.getByLabel("White Paper Url").fill("http://somelink.com");
  await page.getByLabel("White Paper Url").press("Tab");
  await page.getByLabel("Twitter Url").fill("http://somelink.com");
  await page.getByLabel("Twitter Url").press("Tab");
  await page.getByLabel("Facebook Url").fill("http://somelink.com");
  await page.getByLabel("Facebook Url").press("Tab");
  await page.getByLabel("Linkedin Url").fill("http://somelink.com");
  await page.getByLabel("Linkedin Url").press("Tab");
  await page.getByLabel("Discord Url").fill("http://somelink.com");
  await page.getByLabel("Discord Url").press("Tab");
  await page.getByLabel("Github Url").fill("http://somelink.com");
  await page.getByLabel("Github Url").press("Tab");
  await page.getByLabel("Coinmarketcap Url").fill("http://somelink.com");
  await page.getByLabel("Coinmarketcap Url").press("Tab");
  await page
    .getByPlaceholder("e.g. https://link1.com, https://link2.com")
    .fill("http://somelink.com");
  await page
    .getByPlaceholder("e.g. https://link1.com, https://link2.com")
    .press("Tab");
  await page.getByPlaceholder("e.g. https://yourwebsite.com/logo.png").click({
    clickCount: 3,
  });
  await page
    .getByPlaceholder("e.g. https://yourwebsite.com/logo.png")
    .fill("http://somelink.com");
  await page.getByRole("button", { name: "SUBMIT" }).click();
});
