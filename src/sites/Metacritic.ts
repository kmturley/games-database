import { SiteOptions, SiteType } from '../types/Site.js';
import Site from '../classes/Site.js';
import { GameInterface } from '../types/Game.js';

export default class Metacritic extends Site {
  constructor() {
    const callback = ($: any): GameInterface => {
      const el = $('.c-pageSiteSearch-results-item').first();
      const title = $(el).find('p').text().replace(/\n/g, '').trim();
      return {
        slug: this.generateSlug(title),
        title,
        description: '',
        developer: '',
        publisher: '',
        genres: [],
        released: '',
        sites: {
          [SiteType.Epic]: {
            id: el.attr('href').split('/').at(-2),
            score: Number($(el).find(`.c-siteReviewScore span`).first().text()),
            url: options.root + el.attr('href'),
          },
        },
        platforms: {},
      };
    };
    const options: SiteOptions = {
      root: 'https://www.metacritic.com',
      search: '/search/',
    };
    super(options, callback);
  }
}
