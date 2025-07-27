import fs from 'fs';
import path from 'path';

export default class Datastore {
  dirRoot = 'out';

  constructor(name) {
    if (name) {
      this.name = name;
      this.dirIndex = path.join(this.dirRoot, name);
      this.dirId = path.join(this.dirRoot, name, 'id');
      this.dirSlug = path.join(this.dirRoot, name, 'slug');
      this.createDir(this.dirId);
      this.createDir(this.dirSlug);
    }
  }

  createDir(dir) {
    console.log('+', dir);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  createFile(filepath, contents) {
    console.log('+', filepath);
    fs.writeFileSync(filepath, JSON.stringify(contents, null, 2));
  }

  save(items) {
    items.forEach((item) => {
      this.createFile(path.join(this.dirId, `${item.id}.json`), item);
      this.createFile(path.join(this.dirSlug, `${item.slug}.json`), item);
    });
  }

  createIndex(items, index = {}, name) {
    items.forEach((item) => {
      if (name) {
        if (!index[item.slug]) index[item.slug] = {};
        if (!index[item.slug][name]) index[item.slug][name] = item;
      } else {
        if (!index[item.slug]) index[item.slug] = item;
      }
      
    });
    return index;
  }

  saveIndex(data) {
    this.createFile(path.join(this.dirIndex ||  this.dirRoot, 'index.json'), data);
  }
}
