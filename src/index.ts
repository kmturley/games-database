import path from 'path';
import Registry from './classes/Registry.js';

const registry: Registry = new Registry();
registry.importYaml(path.join('src', 'games'));
registry.exportJson('out');
