import { chromium } from '@playwright/test';
import path from 'path';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const storageState = path.join(__dirname, '../sessions/storageState.testing.en.json');
  const context = await browser.newContext({ storageState });
  const page = await context.newPage();

  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  console.log('Navigating to base URL...');
  await page.goto('https://app-testing.clusterix.io/', { waitUntil: 'load' });
  console.log('URL after loading base:', page.url());

  console.log('Navigating to HR dashboard...');
  const response = await page.goto('https://app-testing.clusterix.io/hr/dashboard', { waitUntil: 'load' });
  console.log('URL after navigating to /hr/dashboard:', page.url());
  console.log('Response Status:', response?.status());

  await page.screenshot({ path: 'scratch/debug-hr-dashboard.png' });
  console.log('Screenshot saved to scratch/debug-hr-dashboard.png');

  await browser.close();
}

run().catch(console.error);
