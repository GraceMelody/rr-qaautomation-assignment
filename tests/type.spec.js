import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/MainPage";

test("Check if default filter is on for both Movies and TV Shows", async ({
  page,
}) => {
  const tmdbMainPage = new MainPage(page);
  await tmdbMainPage.gotoMainPage();
  // Wait for both Movie and TV show queries
  await tmdbMainPage.waitForQuery();
});
