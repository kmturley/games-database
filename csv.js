import { readFileSync, writeFileSync } from 'fs';

// Load data from out directory
const items = JSON.parse(readFileSync('./out/index.json'));

// Create csv content
let rows = [['Metacritic score', 'Title', 'Steam URL', 'Metacritic URL']];
for (const slug in items) {
  const item = items[slug];
  rows.push([item.metacritic?.score, item.steam?.title, item.steam?.url, item.metacritic?.url]);
}

// Convert to csv
let csvContent = rows.map(e => e.join(',')).join("\n");
writeFileSync('./out/index.csv', csvContent);
