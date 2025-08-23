import Datastore from './src/Datastore.js';
import Epic from './src/Epic.js';
import Gog from './src/Gog.js';
import Metacritic from './src/Metacritic.js';
import Steam from './src/Steam.js';
// import xmljs from 'xml-js';

// Hardcoded query example
const queries = ["Baldur's Gate 3", 'Counter-Strike 2', 'LEGO® Bricktales'];

// Steam query example
// const STEAM_USERNAME = 'kmtlondon';
// const STEAM_URL = `https://steamcommunity.com/id/${STEAM_USERNAME}/games?xml=1`;
// const steamXml = await fetch(STEAM_URL);
// const steamJson = xmljs.xml2js(await steamXml.text(), {compact: true});
// const steamTitles = steamJson.gamesList.games.game.map((game) => {
//   return game.name._cdata;
// });
// const queries = steamTitles.slice(0, 5);
// console.log('queries', queries);

const epic = new Epic();
const epicItems = await epic.search(queries);
const epicData = new Datastore('epic');
epicData.save(epicItems);

const gog = new Gog();
const gogItems = await gog.search(queries);
const gogData = new Datastore('gog');
gogData.save(gogItems);

const metacritic = new Metacritic();
const metacriticItems = await metacritic.search(queries);
const metacriticData = new Datastore('metacritic');
metacriticData.save(metacriticItems);

const steam = new Steam();
const steamItems = await steam.search(queries);
const steamData = new Datastore('steam');
steamData.save(steamItems);

const indexData = new Datastore();
let indexItems = {};
indexItems = indexData.createIndex(indexItems, 'epic', epicItems);
indexItems = indexData.createIndex(indexItems, 'gog', gogItems);
indexItems = indexData.createIndex(indexItems, 'metacritic', metacriticItems);
indexItems = indexData.createIndex(indexItems, 'steam', steamItems);
indexData.saveIndex(indexItems);
