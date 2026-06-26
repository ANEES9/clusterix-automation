const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  console.log('Launching browser in headed mode...');
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Navigating to login page...');
  await page.goto('https://app-testing.clusterix.io/login');

  console.log('Please log in manually in the browser window.');
  console.log('The script will wait until you successfully log in and reach the dashboard...');

  // Wait for navigation/successful login
  // We check if the user object exists in localStorage
  while (true) {
    try {
      const isLoggedIn = await page.evaluate(() => {
        try {
          const userStr = localStorage.getItem('user');
          if (userStr) {
            const user = JSON.parse(userStr);
            return user.isLoggedIn === true;
          }
        } catch (e) {}
        return false;
      });

      if (isLoggedIn) {
        console.log('Successful login detected!');
        break;
      }
    } catch (e) {
      // Browser might have been closed
      console.log('Browser was closed or connection lost.');
      await browser.close();
      return;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Get language
  const lang = await page.evaluate(() => localStorage.getItem('i18nextLng') || 'en');
  console.log(`Detected language: ${lang}`);

  // Save state
  const state = await context.storageState();
  
  // Write to both locales
  fs.writeFileSync(
    path.join(__dirname, '../sessions/storageState.testing.en.json'),
    JSON.stringify(state, null, 2)
  );

  const deState = JSON.parse(JSON.stringify(state));
  const deLngItem = deState.origins[0].localStorage.find(item => item.name === 'i18nextLng');
  if (deLngItem) deLngItem.value = 'de';
  
  fs.writeFileSync(
    path.join(__dirname, '../sessions/storageState.testing.de.json'),
    JSON.stringify(deState, null, 2)
  );

  console.log('Session files successfully generated and saved!');
  await browser.close();
}

run().catch(console.error);
