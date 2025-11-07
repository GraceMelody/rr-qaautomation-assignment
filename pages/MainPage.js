// @ts-check
import { expect } from "@playwright/test";
export class MainPage {
  slugList = {
    trend: "Trend",
    new: "Newest",
    top: "Top rated",
    popular: "Popular",
  };
  API_URL_PATTERN_BASE = "https://api.themoviedb.org/";
  API_URL_PATTERN_MOVIE = "https://api.themoviedb.org/3/genre/movie/";
  API_URL_PATTERN_TV = "https://api.themoviedb.org/3/genre/tv/";

  constructor(page) {
    this.page = page;
  }

  async gotoMainPage() {
    await Promise.all([
      expect(
        this.page.locator("p[class='text-blue-500 font-bold py-1']")
      ).toHaveCount(20),

      this.page.goto("https://tmdb-discover.surge.sh/"),
    ]);
  }

  async gotoMainPageWithSlug(slug) {
    await this.page.goto("https://tmdb-discover.surge.sh/" + slug);
  }

  async clickTab(tab) {
    await this.page.getByRole("link", { name: tab }).click();
  }

  async checkSlugUrl(slug) {
    await expect(this.page).toHaveURL("https://tmdb-discover.surge.sh/" + slug);
  }

  async checkUnfilteredTabLoaded() {
    // This checks if the unfiltered tab is loaded by seeing if there are 20 images + 1 search logo in the page
    await expect(this.page.locator("img")).toHaveCount(21);
  }

  async searchInBar(searchTerm, wait = true) {
    await Promise.all([
      this.page.locator("input[name='search']").fill(searchTerm),
      this.page.locator("img[alt='Search Icon']").click(),
    ]);
  }

  async waitForQuery(tv = true, movie = true) {
    let waits = [];

    if (!!tv) {
      waits.push(
        this.page.waitForResponse(
          (response) =>
            response.url().includes(this.API_URL_PATTERN_TV) &&
            response.status() === 200
        )
      );
    }
    if (!!movie) {
      waits.push(
        this.page.waitForResponse(
          (response) =>
            response.url().includes(this.API_URL_PATTERN_MOVIE) &&
            response.status() === 200
        )
      );
    }
    Promise.all(waits);
  }
}
