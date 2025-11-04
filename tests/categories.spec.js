// @ts-check
import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/MainPage";

test("has title", async ({ page }) => {
  await page.goto("https://tmdb-discover.surge.sh/");

  await expect(page).toHaveTitle(/Discover/);
});

test("Check categories by clicking tab - popular, trending, newest, top rated", async ({
  page,
}) => {
  const tmdbMainPage = new MainPage(page);
  // Check if landing page is popular tab
  await tmdbMainPage.gotoMainPage();
  await tmdbMainPage.checkSlugUrl("popular");
  // Loop through dictionary of tab/slug list
  for (const key in tmdbMainPage.slugList) {
    const value = tmdbMainPage.slugList[key];
    await tmdbMainPage.clickTab(value);
    await tmdbMainPage.checkSlugUrl(key);
    await tmdbMainPage.checkUnfilteredTabLoaded();
  }
});

test("Negative test flow - check categories by URL", async ({ page }) => {
  const tmdbMainPage = new MainPage(page);
  for (const key in tmdbMainPage.slugList) {
    await tmdbMainPage.gotoMainPageWithSlug(key);
    await tmdbMainPage.checkSlugUrl(key);
    await tmdbMainPage.checkUnfilteredTabLoaded();
  }
});
