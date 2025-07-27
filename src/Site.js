import { CheerioCrawler, PuppeteerCrawler } from "crawlee";
import slugify from "slugify";
import path from "path";

export default class Site {
  constructor(options, callback) {
    this.callback = callback;
    this.options = options;
  }

  generateSlug(title) {
    return slugify(this.sanitizeTitle(title), { lower: true, strict: true });
  }

  generateUrls(queries) {
    const urls = [];
    for (let i = 0; i < queries.length; i++) {
      urls.push(`${this.options.root}${this.options.search}${queries[i]}${this.options.params}`);
    }
    return urls;
  }

  sanitizeTitle(title) {
    return title.replace(/[^0-9a-z :-]/gi, '');
  }

  async search(queries) {
    const callback = this.callback;
    const items = [];
    const that = this;
    let crawler = {};
    if (this.options.js === true) {
      crawler = new PuppeteerCrawler({
        async requestHandler({ request, page }) {
          const item = await callback(page);
          const query = path.dirname(request.url).split('/').at(-1);
          if (that.generateSlug(item.title) === that.generateSlug(query)) {
            items.push(item);
          } else {
            console.log('Did not find a good match', request.url, item);
          }
        },
      });
    } else {
      crawler = new CheerioCrawler({
        async requestHandler({ request, $ }) {
          const item = callback($);
          const query = path.dirname(request.url).split('/').at(-1);
          if (that.generateSlug(item.title) === that.generateSlug(query)) {
            items.push(item);
          } else {
            console.log('Did not find a good match', request.url, item);
          }
        },
      });
    }
    const urls = this.generateUrls(queries);
    await crawler.run(urls);
    return items;
  }
}
