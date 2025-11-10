import { test, expect } from "@playwright/test";
import { MainPage } from "../pages/MainPage";

test("Filter by rating five and above", async ({ page, request }) => {
  let resp = await request.get(
    "/3/discover/movie?sort_by=popularity.desc&release_date.gte=1900-01-01&release_date.lte=2025-12-31&vote_average.gte=4.5&vote_average.lte=5&page=1&with_genres=&api_key=add494e96808c55b3ee7f940c9d5e5b6"
  );
  let body = await resp.json();
  let results = body.results.map((v) => v.title);

  const tmdbMainPage = new MainPage(page);
  await tmdbMainPage.gotoMainPage();
  await tmdbMainPage.clickRating(4.5);
  await tmdbMainPage.waitForTitles();
  const titles = await tmdbMainPage.getTitles();

  expect(titles).toStrictEqual(results);
});
