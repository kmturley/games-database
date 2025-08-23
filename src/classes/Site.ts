import { CheerioCrawler, PuppeteerCrawler } from 'crawlee';
import slugify from 'slugify';
import { SiteOptions } from '../types/Site.js';
import { GameInterface } from '../types/Game.js';

export default class Site {
  callback: Function;
  options: SiteOptions;

  constructor(options: SiteOptions, callback: Function) {
    this.callback = callback;
    this.options = options;
  }

  generateSlug(title: string) {
    return slugify.default(title.replace(/®/g, ''), { lower: true, strict: true });
  }

  generateUrls(queries: string[]) {
    const urls: string[] = [];
    for (let i = 0; i < queries.length; i++) {
      urls.push(`${this.options.root}${this.options.search}${queries[i]}`);
    }
    return urls;
  }

  async search(queries: string[]) {
    const callback: Function = this.callback;
    const items: GameInterface[] = [];
    let crawler: PuppeteerCrawler | CheerioCrawler;
    if (this.options.js === true) {
      crawler = new PuppeteerCrawler({
        async requestHandler({ request, page }) {
          const item: GameInterface = await callback(page);
          console.log(request.url, item);
          items.push(item);
        },
      });
    } else {
      crawler = new CheerioCrawler({
        async requestHandler({ request, $ }) {
          const item: GameInterface = callback($);
          console.log(request.url, item);
          items.push(item);
        },
      });
    }
    const urls: string[] = this.generateUrls(queries);
    await crawler.run(urls);
    return items;
  }
}
