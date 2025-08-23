import { GameInterface } from './Game.js';

export interface RegistryGames {
  [slug: string]: GameInterface;
}
