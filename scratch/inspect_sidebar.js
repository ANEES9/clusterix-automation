const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function run() {
  const sessionPath = path.join(__dirname, '../sessions/storageState.testing.en.json');
  if (!fs.existsSync(sessionPath)) {
    console.error('Session file not found!');
    return;
  }
  
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ storageState: sessionPath });
  const page = await context.newPage();
  
  await page.goto('https://app-testing.clusterix.io/hr/employees');
  await page.waitForLoadState('networkidle');
  
  try {
    // Wait for sidebar wrapper to load
    await page.waitForSelector('text=Employees', { timeout: 10000 });
  } catch (err) {
    console.log('Failed to load. Current URL is:', page.url());
    await page.screenshot({ path: path.join(__dirname, 'debug-hr-employees.png') });
    console.log('Saved screenshot to scratch/debug-hr-employees.png');
    await browser.close();
    return;
  }
  
  // Print all links and buttons in the sidebar
  const items = await page.evaluate(() => {
    const list = [];
    // Select all potential sidebar elements
    document.querySelectorAll('a, button, div[class*="_sidebar"], div[class*="_wrapper"]').forEach(el => {
      const text = el.innerText || '';
      if (text.includes('Employees') || text.includes('Request') || text.includes('Activity') || text.includes('Bonus') || text.includes('Reassignments') || text.includes('Vacation')) {
        list.push({
          tagName: el.tagName,
          className: el.className,
          text: text.trim().split('\n')[0],
          html: el.outerHTML.substring(0, 150)
        });
      }
    });
    return list;
  });
  
  console.log(JSON.stringify(items, null, 2));
  await browser.close();
}

run().catch(console.error);
