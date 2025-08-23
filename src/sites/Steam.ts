import { SiteOptions, SiteType } from '../types/Site.js';
import Site from '../classes/Site.js';
import { GameInterface } from '../types/Game.js';

export default class Steam extends Site {
  constructor() {
    const callback = ($: any): GameInterface => {
      const el = $('a[data-ds-appid]').first();
      const title = el.find('.title').text();
      return {
        slug: this.generateSlug(title),
        title,
        description: '',
        developer: '',
        publisher: '',
        genres: [],
        released: '',
        sites: {
          [SiteType.Steam]: {
            id: el.attr('data-ds-appid'),
            url: el.attr('href'),
          },
        },
        platforms: {},
      };
    };
    const options: SiteOptions = {
      root: 'https://store.steampowered.com',
      search: '/search/?category1=998&term=',
    };
    super(options, callback);
  }
}
