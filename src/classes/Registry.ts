import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { GameInterface } from '../types/Game.js';
import { SiteType } from '../types/Site.js';
import path from 'path';
import yaml from 'js-yaml';

export default class Registry {
  protected games: Record<string, GameInterface>;

  constructor() {
    this.games = {};
  }

  add(type: SiteType, result: GameInterface) {
    if (!this.games[result.slug]) {
      this.games[result.slug] = result;
    } else {
      this.games[result.slug].sites[type] = result.sites[type];
    }
  }

  addAll(type: SiteType, results: GameInterface[]) {
    results.forEach(result => {
      this.add(type, result);
    });
  }

  createDir(dir: string) {
    console.log('+', dir);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
  }

  createFile(filepath: string, contents: any) {
    console.log('+', filepath);
    writeFileSync(filepath, contents);
  }

  readDir(dir: string) {
    console.log('o', dir);
    if (existsSync(dir)) {
      return readdirSync(dir);
    }
  }

  readFile(filePath: string) {
    console.log('o', filePath);
    return readFileSync(filePath, 'utf8');
  }

  importYaml(dir: string) {
    const files: string[] = this.readDir(dir) || [];
    files.forEach(filename => {
      if (filename.endsWith('.yaml')) {
        const filePath = path.join(dir, filename);
        const fileYaml = this.readFile(filePath);
        const fileJson = yaml.load(fileYaml) as GameInterface;
        this.games[fileJson.slug] = fileJson;
      }
    });
  }

  exportJson(dir: string) {
    this.createDir(dir);
    Object.keys(this.games).forEach(slug => {
      this.createFile(path.join(dir, slug + '.json'), JSON.stringify(this.games[slug], null, 2));
    });
  }

  exportYaml(dir: string) {
    this.createDir(dir);
    Object.keys(this.games).forEach(slug => {
      this.createFile(path.join(dir, slug + '.yaml'), yaml.dump(this.games[slug], { lineWidth: -1 }));
    });
  }

  toJSON() {
    return JSON.stringify(this.games, null, 2);
  }
}
