import { test, expect } from "@playwright/test";

// @TODO: Clear up all todos and reset server before running this
test("whole flow works", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page.goto("http://localhost:5173/login");
  await page.getByPlaceholder("Enter your username...").click();
  await page.getByPlaceholder("Enter your username...").fill("Andrew");
  await page.getByPlaceholder("Enter your username...").press("Enter");

  await expect(page.getByRole("main")).toContainText("Nothing to do? 🤥");

  await page.getByPlaceholder("Buy chimkens").click();
  await page.getByPlaceholder("Buy chimkens").fill("Buy something");
  await page.getByPlaceholder("Go to a shop and get a lot of them").click();
  await page
    .getByPlaceholder("Go to a shop and get a lot of them")
    .fill("Lorem ipsum");
  await page.getByLabel("Colour").click();
  await page.getByLabel("Colour").fill("#959d9a");
  await page.getByRole("button", { name: "Add" }).click();

  const newTodo = await page.getByText(
    "Buy somethingLorem ipsum Created by: Andrew"
  );
  await expect(newTodo).toBeVisible();

  // Color selection
  await expect(newTodo).toHaveCSS("background-color", "rgb(149, 157, 154)");

  await page.getByRole("button", { name: "Remove this todo" }).click();

  // Item has been removed
  await expect(newTodo).not.toBeVisible();
});
