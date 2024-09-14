import Site from "./Site.js";

export default class Epic extends Site {
  constructor() {
    const callback = ($) => {
      const el = $('div[data-component] a').first();
      const parts = el.attr('aria-label').split(', ');
      console.log(parts);
      const title = parts[0] === 'New To The Epic Games Store' ? parts.at(-2) : parts[1];
      return {
        id: el.attr('href').split('/').pop(),
        slug: this.generateSlug(title),
        title,
        url: options.root + el.attr('href'),
      }
    };
    const options = {
      root: 'https://store.epicgames.com',
      search: '/en-US/browse?q='
    };
    super(options, callback);
  }
}
