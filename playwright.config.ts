import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '*.spec.ts',
  use: {
    baseURL: 'https://kmturley.github.io/games-database/',
  },
});
