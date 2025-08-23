import { test, expect } from '@playwright/test';

test('Get registry', async ({ request }) => {
  const endpoint = await request.get('');
  expect(endpoint.ok()).toBeTruthy();
});
