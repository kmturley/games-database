import { CheerioCrawler, PuppeteerCrawler } from "crawlee";
import slugify from "slugify";

export default class Site {
  constructor(options, callback) {
    this.callback = callback;
    this.options = options;
  }

  generateSlug(title) {
    return slugify(title.replace(/®/g, ''), { lower: true, strict: true });
  }

  generateUrls(queries) {
    const urls = [];
    for (let i = 0; i < queries.length; i++) {
      urls.push(`${this.options.root}${this.options.search}${queries[i]}`);
    }
    return urls;
  }

  async search(queries) {
    const callback = this.callback;
    const items = [];
    let crawler = {};
    if (this.options.js === true) {
      crawler = new PuppeteerCrawler({
        async requestHandler({ request, page }) {
          const item = await callback(page);
          console.log(request.url, item);
          items.push(item);
        },
      });
    } else {
      crawler = new CheerioCrawler({
        async requestHandler({ request, $ }) {
          const item = callback($);
          console.log(request.url, item);
          items.push(item);
        },
      });
    }
    const urls = this.generateUrls(queries);
    await crawler.run(urls);
    return items;
  }
}
