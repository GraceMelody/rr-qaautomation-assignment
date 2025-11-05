import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/MainPage";

test("Happy flow - One page one result", async ({ page }) => {
  const tmdbMainPage = new MainPage(page);
  const API_URL_PATTERN = "https://api.themoviedb.org/3/search/movie?query";
  await tmdbMainPage.gotoMainPage();
  await tmdbMainPage.searchInBar("Chainsaw Man - The Movie: Reze Arc");

  const [response] = await Promise.all([
    tmdbMainPage.page.waitForResponse(
      (response) =>
        response.url().includes(API_URL_PATTERN) && response.status() === 200
    ),
  ]);
  // Expect one result only (Chainsaw Man)
  expect(
    tmdbMainPage.page.locator("p[class='text-blue-500 font-bold py-1']")
  ).toHaveText("Chainsaw Man - The Movie: Reze Arc");
  expect(
    tmdbMainPage.page.locator("p[class='text-blue-500 font-bold py-1']")
  ).toHaveCount(1);
});
