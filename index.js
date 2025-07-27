
import Datastore from "./src/Datastore.js";
import Epic from "./src/Epic.js";
import Gog from "./src/Gog.js";
import Metacritic from "./src/Metacritic.js";
import Steam from "./src/Steam.js";

// Hardcoded query example
// const queries = ['Baldur\'s Gate 3', 'Counter-Strike 2', 'LEGO® Bricktales'];

// const epic = new Epic();
// console.log(await epic.getLibrary());
// const epicItems = await epic.search(queries);
// const epicData = new Datastore('epic');
// epicData.save(epicItems);

// const gog = new Gog();
// const gogItems = await gog.search(queries);
// const gogData = new Datastore('gog');
// gogData.save(gogItems);

const steam = new Steam();
const steamItems = await steam.getLibrary('kmtlondon');
// const steamItems = await steam.search(queries);
const steamData = new Datastore('steam');
const steamIndex = steamData.createIndex(steamItems);
steamData.save(steamItems);
steamData.saveIndex(steamIndex);

const queries = steamItems.map((game) => game.title);
console.log(queries);

const metacritic = new Metacritic();
const metacriticItems = await metacritic.search(queries);
const metacriticData = new Datastore('metacritic');
const metacriticIndex = metacriticData.createIndex(metacriticItems);
metacriticData.save(metacriticItems);
metacriticData.saveIndex(metacriticIndex);

const indexData = new Datastore();
let indexItems = {};
// indexItems = indexData.createIndex(epicItems, indexItems, 'epic');
// indexItems = indexData.createIndex(gogItems, indexItems, 'gog');
indexItems = indexData.createIndex(metacriticItems, indexItems, 'metacritic');
indexItems = indexData.createIndex(steamItems, indexItems, 'steam');
indexData.saveIndex(indexItems);
