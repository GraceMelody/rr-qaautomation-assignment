import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/MainPage";

test("Happy flow - One page one result", async ({ page }) => {
  const tmdbMainPage = new MainPage(page);
  await tmdbMainPage.gotoMainPage();
  await tmdbMainPage.searchInBar("Chainsaw Man - The Movie: Reze Arc");
  // Expect one page of result
  await expect(tmdbMainPage.page.locator("a[aria-label^='Page']")).toHaveCount(
    1
  );
  // Expect one result only (Chainsaw Man)
  await expect(
    tmdbMainPage.page.locator("p[class='text-blue-500 font-bold py-1']")
  ).toHaveText("Chainsaw Man - The Movie: Reze Arc");
  await expect(
    tmdbMainPage.page.locator("p[class='text-blue-500 font-bold py-1']")
  ).toHaveCount(1);
});

test("Happy flow - Multiple page multiple result", async ({ page }) => {
  const tmdbMainPage = new MainPage(page);
  await tmdbMainPage.gotoMainPage();
  await tmdbMainPage.searchInBar("Ghibli");
  // Expect two pages of result
  await expect(tmdbMainPage.page.locator("a[aria-label^='Page']")).toHaveCount(
    2
  );
  // Expect the first result to have word "Ghibli" in it
  await expect(
    tmdbMainPage.page.locator("p[class='text-blue-500 font-bold py-1']").first()
  ).toContainText("Ghibli");
});

test("Happy flow - One page multiple results", async ({ page }) => {
  const tmdbMainPage = new MainPage(page);
  await tmdbMainPage.gotoMainPage();
  await tmdbMainPage.searchInBar("Bee Movie");
  // Expect one page of result
  await expect(tmdbMainPage.page.locator("a[aria-label^='Page']")).toHaveCount(
    1
  );
  // Expect first result to have phrase "Bee Movie" in it
  await expect(
    tmdbMainPage.page.locator("p[class='text-blue-500 font-bold py-1']").first()
  ).toContainText("Bee Movie");
  // Expect three results
  await expect(
    tmdbMainPage.page.locator("p[class='text-blue-500 font-bold py-1']")
  ).toHaveCount(3);
});

test("Blank search", async ({ page }) => {
  const tmdbMainPage = new MainPage(page);
  await tmdbMainPage.gotoMainPage();
  // To make changes in the search bar first
  await tmdbMainPage.searchInBar("a", false);
  await tmdbMainPage.searchInBar("");
  // Expect all pages as result (7 page buttons)
  await expect(tmdbMainPage.page.locator("a[aria-label^='Page']")).toHaveCount(
    7
  );
  // Expect 20 shown movies in landing page
  await expect(
    tmdbMainPage.page.locator("p[class='text-blue-500 font-bold py-1']")
  ).toHaveCount(20);
});

test("No results", async ({ page }) => {
  const tmdbMainPage = new MainPage(page);
  await tmdbMainPage.gotoMainPage();
  await tmdbMainPage.searchInBar("aasdf");
  // Expect all pages as result (7 page buttons)
  await expect(tmdbMainPage.page.locator("a[aria-label^='Page']")).toHaveCount(
    0
  );
  // Expect no results found text shown
  await expect(tmdbMainPage.page.getByText("No results found.")).toHaveCount(1);
});
