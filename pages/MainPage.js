// @ts-check
import { expect } from "@playwright/test";
export class MainPage {
  slugList = {
    trend: "Trend",
    new: "Newest",
    top: "Top rated",
    popular: "Popular",
  };
  API_URL_PATTERN = "https://api.themoviedb.org/";

  constructor(page) {
    this.page = page;
  }

  async gotoMainPage() {
    await this.page.goto("https://tmdb-discover.surge.sh/");
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
    await this.page.locator("input[name='search']").fill(searchTerm);
    await this.page.locator("img[alt='Search Icon']").click();
    if (!!wait) {
      const [response] = await Promise.all([
        this.page.waitForResponse(
          (response) =>
            response.url().includes(this.API_URL_PATTERN) &&
            response.status() === 200
        ),
      ]);
    }
  }
}
