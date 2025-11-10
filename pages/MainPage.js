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

  /**
   *
   * @param { import("@playwright/test").Page} page
   */
  constructor(page) {
    this.page = page;
  }

  async gotoMainPage() {
    await this.page.goto("https://tmdb-discover.surge.sh/");
    await expect(
      this.page.locator("p[class='text-blue-500 font-bold py-1']")
    ).toHaveCount(20);
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

  async searchInBar(searchTerm) {
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

  async getTitles() {
    return await this.page
      .locator("p[class='text-blue-500 font-bold py-1']")
      .allTextContents();
  }

  async waitForTitles() {
    const lastTitle = this.page
      .locator("p[class='text-blue-500 font-bold py-1']")
      .nth(19);
    await expect(lastTitle).toBeVisible();
    const titleContent = await lastTitle.textContent();
    await expect(titleContent.length).toBeGreaterThan(1);
  }

  async openTypeDropdown() {
    const typeDropdown = this.page.locator(".css-yk16xz-control").first();
    await typeDropdown.dispatchEvent("mousedown");
    await typeDropdown.dispatchEvent("mouseup");
    await expect(this.page.getByText("MovieTV Shows")).toBeVisible();
  }

  async clickRating(rating) {
    const hasHalf = rating % 0.5 == 0; // 4 => true, 4.5 => false
    const ratingInteger = hasHalf ? Math.floor(rating) : rating - 1;
    await this.page
      .getByRole("radio")
      .nth(ratingInteger)
      .locator(hasHalf ? ".rc-rate-star-first" : ".rc-rate-star-second")
      .click();
  }

  getPageNumbers() {
    return this.page.locator("a[aria-label^='Page']");
  }

  getFirstMovie() {
    return this.page.locator("p[class='text-blue-500 font-bold py-1']").first();
  }

  getMovies() {
    return this.page.locator("p[class='text-blue-500 font-bold py-1']");
  }

  moviesDropdown() {
    return this.page.locator("#react-select-2-option-0");
  }
  tvShowDropdown() {
    return this.page.getByText("TV Shows");
  }
}
