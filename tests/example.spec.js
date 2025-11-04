// @ts-check
import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/MainPage";

test("has title", async ({ page }) => {
  await page.goto("https://tmdb-discover.surge.sh/");

  await expect(page).toHaveTitle(/Discover/);
});

test("trends link", async ({ page }) => {
  await page.goto("https://tmdb-discover.surge.sh/");

  await page.getByRole("link", { name: "Trend" }).click();

  const tmdbMainPage = new MainPage(page);
  await tmdbMainPage.checkSlugUrl("trends");
});
