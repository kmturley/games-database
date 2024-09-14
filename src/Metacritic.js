import Site from "./Site.js";

export default class Metacritic extends Site {
  constructor() {
    const callback = ($) => {
      const el = $('.c-pageSiteSearch-results-item').first();
      const title = $(el).find('p').text().replace(/\n/g, '').trim();
      return {
        id: el.attr('href').split('/').at(-2),
        slug: this.generateSlug(title),
        score: Number($(el).find(`.c-siteReviewScore span`).first().text()),
        title,
        url: options.root + el.attr('href'),
      }
    };
    const options = {
      root: 'https://www.metacritic.com',
      search: '/search/'
    };
    super(options, callback);
  }
}
