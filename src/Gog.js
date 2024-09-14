import Site from "./Site.js";

export default class Gog extends Site {
  constructor() {
    const callback = async (page) => {
      const title = await page.$eval('a[data-product-id] product-title', (el) => [].slice.call(el.querySelectorAll('span')).pop().innerText);
      return {
        id: await page.$eval('a[data-product-id]', (el) => el.getAttribute('data-product-id')),
        slug: this.generateSlug(title),
        title,
        url: await page.$eval('a[data-product-id]', (el) => el.getAttribute('href')),
      }
    };
    const options = {
      js: true,
      root: 'https://www.gog.com',
      search: '/en/games?query='
    };
    super(options, callback);
  }
}
