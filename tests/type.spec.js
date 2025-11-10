// @ts-check
import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/MainPage";

// !!Pending implementation due to not knowing expected behavior!!
// test("Check if default filter is on for both Movies and TV Shows", async ({
//   page,
// }) => {
//   const tmdbMainPage = new MainPage(page);
//   const [response] = await Promise.all([
//     tmdbMainPage.gotoMainPage(),
//     // Wait for both Movie and TV show queries
//     tmdbMainPage.waitForQuery(),
//   ]);
// });

test("Check when the type gets changed to TV Shows the list changes", async ({
  page,
}) => {
  const tmdbMainPage = new MainPage(page);
  await tmdbMainPage.gotoMainPage();
  // Saves the list of unfiltered movies
  const allDefaultMovies = await tmdbMainPage.getTitles();
  // Get the dropdown for types and click it
  await tmdbMainPage.openTypeDropdown();
  await tmdbMainPage.tvShowDropdown().click();
  // Wait for page to fully load
  await tmdbMainPage.waitForTitles();
  // Assert that what's shown is the TV shows and not the Movies
  const allTVShows = await tmdbMainPage.getTitles();
  await expect(allTVShows).not.toEqual(allDefaultMovies);
});

test("Check when the type gets changed to Movies the list changes", async ({
  page,
}) => {
  const tmdbMainPage = new MainPage(page);
  await tmdbMainPage.gotoMainPage();
  // Saves the list of unfiltered movies
  const allDefaultMovies = await tmdbMainPage.getTitles();
  // Get the dropdown for types and click it
  await tmdbMainPage.openTypeDropdown();
  await tmdbMainPage.moviesDropdown().click();
  // Wait for page to fully load
  await tmdbMainPage.waitForTitles();
  // Assert that what's shown is the TV shows and not the Movies
  const allMoviesAfterFilter = await tmdbMainPage.getTitles();
  await expect(allMoviesAfterFilter).toEqual(allDefaultMovies);
});
