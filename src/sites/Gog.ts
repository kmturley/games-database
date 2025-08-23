import { SiteOptions, SiteType } from '../types/Site.js';
import Site from '../classes/Site.js';
import { GameInterface } from '../types/Game.js';

export default class Gog extends Site {
  constructor() {
    const callback = async (page: any): Promise<GameInterface> => {
      const title = await page.$eval('a[data-product-id] product-title', (el: HTMLElement) => {
        const spans = [].slice.call(el?.querySelectorAll('span')) as HTMLElement[];
        return spans.pop()?.innerText;
      });
      return {
        slug: this.generateSlug(title),
        title,
        description: '',
        developer: '',
        publisher: '',
        genres: [],
        released: '',
        sites: {
          [SiteType.Gog]: {
            id: await page.$eval('a[data-product-id]', (el: HTMLElement) => el.getAttribute('data-product-id')),
            url: await page.$eval('a[data-product-id]', (el: HTMLElement) => el.getAttribute('href')),
          },
        },
        platforms: {},
      };
    };
    const options: SiteOptions = {
      js: true,
      root: 'https://www.gog.com',
      search: '/en/games?hideDLCs=true&query=',
    };
    super(options, callback);
  }
}
