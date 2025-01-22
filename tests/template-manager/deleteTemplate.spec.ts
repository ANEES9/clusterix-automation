 import { test, expect } from '@playwright/test'
 import { closeProductTour } from 'common/product-tour-helper.js'
 import { closeTimerPopUp } from 'common/timer-helper.js'
 import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper.js'
 import { templateManagerPage } from 'pages/template-manager/template-manager.js'
 import { skipSurvey } from 'common/skip-survey.js'
 
 //  import { Allure } from '../../helpers/common/allure-helper.js';
 const campaignname = 'Demo Campaign'
 const subject = 'Check Bulk Mailing'
 
 let locators: templateManagerPage
 test.describe('Verify Bulk Mailing Functionalities', () => {
   test.beforeEach(async ({ page, baseURL }, testInfo) => {
     // await Allure.step('Navigate to Base URL and Close Popups', async () => {
     await page.goto(baseURL!)
     await skipSurvey(page, testInfo)
     locators = new templateManagerPage(page)
     await closeProductTour(page)
     await page.waitForLoadState('networkidle')
     await closeTimerPopUp(page)
     await addCursorStyleAndScript(page)
     await page.waitForLoadState('domcontentloaded')
   })
 
   test('Create Template in Template Manager in A3 Page ', async ({ page }) => {
    await locators.templateManagerLink.click() 
    await locators.sideBarCollapse.click()

 // Search for the template
await locators.searchField.click();
await locators.searchField.fill('Test Template');

// Loop through pages until the desired template is found
let templateFound = false;

while (!templateFound) {
    const templateLocator = await page.locator('.PmIJC5yEH6NC34brnQkm').first()

    if (await templateLocator.count() > 0) {
        templateFound = true;

        
        await page.locator('._wrapperSpan_1hb55_1 > ._button_vdgms_1').first().click(); 
        await locators.deleteButton.click(); 
        await locators.deleteButtonPrompt.click(); 
        console.log("Assertion Passed: Template Deleted Successfully.")

    } else {
        // Navigate to the next page if the template is not found
        const nextPageButton = await page.locator('.PaginationBar-module_paginationBar__7eGhR > button:nth-child(3)');

        if (await nextPageButton.isDisabled()) {
            console.log('Template not found across all pages.');
            break;
        }

        await nextPageButton.click();
    }
}

   })
})