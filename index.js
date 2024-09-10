import fs from 'fs';
import path from 'path';
import { CheerioCrawler } from "crawlee";

const selector = '.c-finderProductCard';
const pages = 5;
const list = {
  "games": []
};
const urls = [];
const folder = './out';
if (!fs.existsSync(folder)) {
  fs.mkdirSync(folder);
}

const crawler = new CheerioCrawler({
  async requestHandler({ $ }) {
    $(`${selector}-game`).each((index, el) => {
      const game = {
        slug: $(el).find(`${selector} a`).attr('href').split('/').at(-2),
        title: $(el).find(`${selector}_title`).attr('data-title'),
        date: new Date($(el).find(`${selector}_meta span`).first().text().replace(/\n/g, '').trim()),
        score: Number($(el).find(`${selector}_score span`).first().text())
      }
      const filePath = path.join(folder, `${game.slug}.json`);
      list.games.push(game);
      fs.writeFileSync(filePath, JSON.stringify(game, null, 2));
      console.log(`+ ${filePath}`);
    });
  },
});

for (let i = 0; i < pages; i++) {
  urls.push(`https://www.metacritic.com/browse/game/?page=${i}`);
}

await crawler.run(urls);
fs.writeFileSync(path.join(folder, 'index.json'), JSON.stringify(list, null, 2));
