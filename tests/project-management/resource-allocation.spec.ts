import { test , expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { OverviewPage } from 'pages/project-management/projects/overview-page'
import { ProjectOverview } from 'pages/project-management/projects/project-overview-page' 
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { ResourceAllocation } from 'pages/project-management/projects/resource-allocation-page'

test.describe('Project management all filters', () => {
    let overviewPage: OverviewPage
    let projectOverview: ProjectOverview
    let resourceAllocation: ResourceAllocation
    test.setTimeout(150000);
    test.beforeEach(async ({ page, baseURL }, testInfo) => {
        projectOverview = new ProjectOverview(page, 'en')
        overviewPage = new OverviewPage(page, 'en')
        resourceAllocation = new ResourceAllocation(page, 'en')

        await Allure.step('Navigate to project management overview', async () => {
            await resourceAllocation.goto(baseURL)
          })
      
          await Allure.step('Skip survey', async () => {
            await skipSurveyHelper(page, testInfo)
          })
      
          await Allure.step('Close welcome popup', async () => {
            await skipProductTourHelper(page, testInfo)
          })
      
          await Allure.step('Close timer popup', async () => {
            await closeTimerPopUp(page)
          })
      
          await Allure.step('Add cursor style and script', async () => {
            await addCursorStyleAndScript(page)
          })
      
          await Allure.step('Wait for network idle', async () => {
            await page.waitForLoadState('networkidle')
          
    })
  })
    test.setTimeout(150000);

test('Verify "all project" functinality in personnel allocation', async () => {
  Allure.addDescription(
    'Verifies the functionality of the all projects filter and ensures expected elements are loaded correctly.'
)
  await Allure.step(
    'Click all projcts filter button and verify the page elements',
    async () => {
      await resourceAllocation.clcikAllProjectsFilter()
      await resourceAllocation.validateAllProjectsFilter()

    }                                                
  )
})
       

})
