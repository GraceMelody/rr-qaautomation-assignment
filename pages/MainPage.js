// @ts-check
import { expect } from "@playwright/test";
export class MainPage {
  constructor(page) {
    this.page = page;
  }
  async gotoTmdb() {
    await this.page.goto("https://tmdb-discover.surge.sh/");
  }

  async checkSlugUrl(slug) {
    await expect(this.page).toHaveURL("https://tmdb-discover.surge.sh/" + slug);
  }
}
