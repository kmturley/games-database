export interface SiteInterface {
  id: string;
  url: string;
  score?: number | string;
}

export interface SiteOptions {
  root: string;
  search: string;
  js?: boolean;
}

export enum SiteType {
  Amazon = 'amazon',
  Battlenet = 'battlenet',
  EA = 'ea',
  Epic = 'epic',
  Gog = 'gog',
  Humble = 'humble',
  Itchio = 'itchio',
  Metacritic = 'metacritic',
  Steam = 'steam',
  Ubisoft = 'ubisoft',
}
