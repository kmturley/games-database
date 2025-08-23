import Epic from './sites/Epic.js';
import Gog from './sites/Gog.js';
import Metacritic from './sites/Metacritic.js';
import Steam from './sites/Steam.js';
import { SiteType } from './types/Site.js';
import Registry from './classes/Registry.js';
import path from 'path';
import { GameInterface } from './types/Game.js';

// Hardcoded query example
// const queries = ['Baldur\'s Gate 3', 'Counter-Strike 2', 'LEGO® Bricktales'];
const queries = ['Borderlands 3', 'Fall Guys', "Y's Origin"];

const registry: Registry = new Registry();

const epic: Epic = new Epic();
const epicItems: GameInterface[] = await epic.search(queries);
registry.addAll(SiteType.Epic, epicItems);

const gog: Gog = new Gog();
const gogItems: GameInterface[] = await gog.search(queries);
registry.addAll(SiteType.Gog, gogItems);

const metacritic: Metacritic = new Metacritic();
const metacriticItems: GameInterface[] = await metacritic.search(queries);
registry.addAll(SiteType.Metacritic, metacriticItems);

const steam: Steam = new Steam();
const steamItems: GameInterface[] = await steam.search(queries);
registry.addAll(SiteType.Steam, steamItems);

console.log(registry.toJSON());
registry.exportYaml(path.join('src', 'games'));
