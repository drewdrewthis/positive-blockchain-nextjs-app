import { test, expect } from "@playwright/test";

test("Page exists", async ({ page }) => {
  await page.goto("http://localhost:3000/database/forms/project-submission");
});
