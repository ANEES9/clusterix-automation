import { chromium } from '@playwright/test';
import path from 'path';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const storageState = path.join(__dirname, '../sessions/storageState.testing.en.json');
  const context = await browser.newContext({ storageState });
  const page = await context.newPage();

  console.log('Navigating to HR dashboard...');
  const start = Date.now();
  await page.goto('https://app-testing.clusterix.io/hr/dashboard', { waitUntil: 'load' });
  console.log('Page load event fired in', (Date.now() - start) / 1000, 's');

  console.log('Waiting for the dashboard heading to appear (up to 60s)...');
  try {
    const heading = page.getByRole('heading', { name: /Dashboard/i });
    await heading.waitFor({ state: 'visible', timeout: 60000 });
    console.log('Dashboard heading appeared after', (Date.now() - start) / 1000, 's');
  } catch (e) {
    console.log('Dashboard heading did not appear within 60s.');
  }

  await page.screenshot({ path: 'scratch/load-time-result.png' });
  console.log('Saved screenshot to scratch/load-time-result.png');
  await browser.close();
}

run().catch(console.error);
