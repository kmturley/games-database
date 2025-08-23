import { PlatformInterface, PlatformType } from './Platform.js';
import { RatingInterface } from './Rating.js';
import { SiteInterface, SiteType } from './Site.js';

export interface GameInterface {
  slug: string;
  title: string;
  description: string;
  developer: string;
  publisher: string;
  genres: string[];
  released: string;
  players?: Players;
  rating?: RatingInterface;
  languages?: string[];
  sites: Partial<Record<SiteType, SiteInterface>>;
  platforms: Partial<Record<PlatformType, PlatformInterface>>;
}

export interface Players {
  min: number;
  max: number;
}
