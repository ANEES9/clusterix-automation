const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const sessionPath = path.join(__dirname, '../sessions/storageState.testing.en.json');
  if (!fs.existsSync(sessionPath)) {
    console.error('Session file not found!');
    return;
  }
  
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: sessionPath });
  const page = await context.newPage();
  
  console.log('Navigating to employees page...');
  await page.goto('https://app-testing.clusterix.io/hr/employees');
  
  console.log('Waiting 5 seconds...');
  await page.waitForTimeout(5000);
  
  console.log('Current URL:', page.url());
  const screenshotPath = path.join(__dirname, 'debug-session.png');
  await page.screenshot({ path: screenshotPath });
  console.log('Screenshot saved to:', screenshotPath);
  
  await browser.close();
}

run().catch(console.error);
