import Site from "./Site.js";

export default class Steam extends Site {
  constructor() {
    const callback = ($) => {
      const el = $('a[data-ds-appid]').first();
      const title = el.find('.title').text();
      return {
        id: el.attr('data-ds-appid'),
        slug: this.generateSlug(title),
        title,
        url: el.attr('href'),
      }
    };
    const options = {
      root: 'https://store.steampowered.com',
      search: '/search/?term='
    };
    super(options, callback);
  }
}
