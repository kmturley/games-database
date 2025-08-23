import { SiteOptions, SiteType } from '../types/Site.js';
import Site from '../classes/Site.js';
import { GameInterface } from '../types/Game.js';

const ignoreList: string[] = ['Base Game', 'New To The Epic Games Store', '1 of 2'];

export default class Epic extends Site {
  constructor() {
    const callback = ($: any): GameInterface => {
      const el = $('div[data-component] a').first();
      const parts = el.attr('aria-label').split(', ');
      const partsFiltered = parts.filter((val: string) => !ignoreList.includes(val));
      const title = partsFiltered[partsFiltered.length - 2];
      const imgsrc = el.find('img').attr('data-image');
      const id = imgsrc.split('/')[4];
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
            id,
            url: options.root + el.attr('href'),
          },
        },
        platforms: {},
      };
    };
    const options: SiteOptions = {
      root: 'https://store.epicgames.com',
      search: '/en-US/browse?category=Game&sortBy=relevancy&sortDir=DESC&q=',
    };
    super(options, callback);
  }
}
