import { test } from '@playwright/test'
import { expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { ApiResponse } from 'common/api-response'
import { closeTimerPopUp } from 'common/timer-helper'
import { TaskManagementPage } from 'pages/task-management'
import { closeProductTour } from 'common/product-tour-helper'
import { generateRandomFileName } from 'common/random-data-generator'
import { skipSurvey } from 'common/skip-survey'

test.describe('Clusterix Project Managament', () => {
    test.beforeEach(async ({ page, baseURL },testInfo) => {
      await Allure.step('Navigate to Base URL and Close Popups', async () => {
        await page.goto(baseURL!)
        await skipSurvey(page, testInfo)
        await closeProductTour(page)
        await closeTimerPopUp(page)
        await page.waitForLoadState('networkidle')
      })
    })

    test.setTimeout(80000);
    test('All Projects Filter', async ({ page }) => {
      
      // Scroll into view for project management
      await page.locator('.ajRcq_m1OOoO3cbSsbzI.XSnRb6hz2HghB3Jl7GnF').scrollIntoViewIfNeeded()
    
      // Wait for the project management link and click it
      await page.waitForSelector('div.pkts8W8G1QydflaH1hBZ a[href="/project-management"]')
      await page.click('div.pkts8W8G1QydflaH1hBZ a[href="/project-management"]')
      await page.waitForLoadState('domcontentloaded')
      //console.log('Navigated to Project Management.');
    
      // Wait for the project overview title to become visible
      await page.locator('.project-management-overview-title') 
      await page.waitForLoadState('domcontentloaded')
      console.log('Navigated to Project Management.')
    
    // Ensure page and elements are loaded
    await page.waitForLoadState('domcontentloaded')
    await page.waitForTimeout(1000)
    await page.waitForSelector("div.td-project", { state: 'visible' })
    
    // Log the number of elements
    const elementCount = await page.locator("div.td-project").count()
    console.log("Number of project elements found:", elementCount)
    
      // Wait for and list all project names
      await page.locator("div.td-project").first()
      const projects = await page.locator("div.td-project").allTextContents()
      console.log(projects)
      
      const tableProject= await page.locator('.BaseCellWrapper-module_wrapper__XCaQu').first()
      await tableProject.isVisible()
      await page.waitForTimeout(1000)
      
        // Click on "All Types" dropdown
        const dropdown = await page.getByPlaceholder('All Types')
        await dropdown.waitFor({ state: 'visible' })
        await dropdown.click()
      
      
        // Wait for dropdown list to be visible
        await page.waitForSelector('._list_dd6fb_14', { state: 'visible' })
        console.log('Dropdown List is Visible on the page')
      
        // Select the first and second checkboxes
        await page.click('span:has-text("SFF")')          
        await page.waitForTimeout(1000)
        const isSFFChecked = page.getByRole('button', { name: 'SFF' }).getByLabel('').isChecked()  // Validate checkboxes are selected
        const sffHeader = await page.locator('div.project-management-overview-title b') // This will locate the 'SFF' in the header
        await expect(sffHeader).toHaveText('SFF')  // Ensure the header text is 'SFF'
        console.log('First Project Type are selected') 
        await page.click ('span:has-text("Agile Software Projects")')                                                                                                   //('div[data-ui-element="dropdown-list"] > div:nth-child(2)');
        const isAgileChecked = await page.getByRole('button', { name: 'Agile Software Projects' }).getByLabel('').isChecked(); // Validate checkboxes are selected
        const filteredProjectsHeader = await page.locator('div.project-management-overview-title b')
        await expect(filteredProjectsHeader).toHaveText('Filtered Projects')
        console.log('Second Project Type are selected')
        console.log('Projects of SFF & Agile types are displayed')

})


test('Change the view types', async ({ page }) => {

// Scroll into view for project management
await page.locator('.ajRcq_m1OOoO3cbSsbzI.XSnRb6hz2HghB3Jl7GnF').scrollIntoViewIfNeeded()
    
// Wait for the project management link and click it
await page.waitForSelector('div.pkts8W8G1QydflaH1hBZ a[href="/project-management"]')
await page.click('div.pkts8W8G1QydflaH1hBZ a[href="/project-management"]')
await page.waitForLoadState('domcontentloaded')
//console.log('Navigated to Project Management.');

// Wait for the project overview title to become visible
await page.locator('.project-management-overview-title') 
await page.waitForLoadState('domcontentloaded')
console.log('Navigated to Project Management.')

// Ensure page and elements are loaded
await page.waitForLoadState('domcontentloaded')
await page.waitForSelector('button.Bar-module_part__CpFuS:nth-of-type(2)', { state: 'visible' })

  // Click on the List View button
  await page.click('button.Bar-module_part__CpFuS:nth-of-type(1)')

  // Wait for the Tile View button in the dropdown to be visible
  await page.waitForSelector('button:has(span:has-text("Tile view"))', { state: 'visible' })

  // Click on the Tile View button
  await page.click('button:has(span:has-text("Tile view"))')
  await page.waitForSelector('div.project-management-overview-tilesview-status-cards-card-header', { state: 'visible' })

  // Select the first element inside the tile view
  const firstTileViewCardHeader = page.locator('div.project-management-overview-tilesview-status-cards-card-header').first()
  
  // Verify that the first tile view card header is visible
  const isFirstTileViewCardHeaderVisible = await firstTileViewCardHeader.isVisible()
  await page.waitForTimeout(6000);
  expect(isFirstTileViewCardHeaderVisible).toBeTruthy()
  
  console.log('The view has successfully changed to Tile View.')

  // Click on the Tile View button
  await page.click('button.Bar-module_part__CpFuS:nth-of-type(1)')

  // Wait for the Kanban View button in the dropdown to be visible
  await page.waitForSelector('button:has(span:has-text("Kanban"))', { state: 'visible' })

  // Click on the Kanban button
  await page.click('button:has(span:has-text("Kanban"))')
  await page.waitForSelector('.project-management-overview-kanbanview', { state: 'visible' })

  const firstKanbanViewCardHeader = page.locator('.project-management-overview-kanbanview')

  // Verify that the first kanban view card header is visible
  const isFirstKanbanViewCardHeaderVisible = await firstKanbanViewCardHeader.isVisible()
  await page.waitForTimeout(6000)
  expect(isFirstKanbanViewCardHeaderVisible).toBeTruthy()
  
  console.log('The view has successfully changed to Kanban.')



})

})