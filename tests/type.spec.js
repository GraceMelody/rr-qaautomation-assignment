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
