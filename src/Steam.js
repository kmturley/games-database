import Site from "./Site.js";
import xmljs from "xml-js";

export default class Steam extends Site {
  constructor() {
    const callback = ($) => {
      const el = $('a[data-ds-appid]').first();
      const title = el.find('.title').text();
      return {
        id: el.attr('data-ds-appid'),
        slug: this.generateSlug(title),
        title: this.sanitizeTitle(title),
        url: el.attr('href'),
      }
    };
    const options = {
      root: 'https://store.steampowered.com',
      search: '/search/?term=',
      params: ''
    };
    super(options, callback);
  }

  async getLibrary(username) {
    const steamXml = await fetch(`https://steamcommunity.com/id/${username}/games?xml=1`);
    const steamJson = xmljs.xml2js(await steamXml.text(), {compact: true});
    return steamJson.gamesList.games.game.map((game) => {
      return {
        id: game.appID._text,
        slug: this.generateSlug(game.name._cdata),
        title: this.sanitizeTitle(game.name._cdata),
        url: game.storeLink._cdata
      };
    });
  }
}
