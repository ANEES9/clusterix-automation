import { Browser, Page, test, TestInfo} from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { BrowserContext } from 'playwright'
import { setupTestContext } from 'utils/test-context'
import { OverviewPage } from 'pages/project-management/projects/overview-page'
import { ProjectOverview } from 'pages/project-management/projects/project-overview-page'
import { ResourceAllocation } from 'pages/project-management/projects/resource-allocation-page'

let browser: Browser
  let context: BrowserContext
  let page: Page
  let overviewPage: OverviewPage
  let projectOverview: ProjectOverview
  let resourceAllocation: ResourceAllocation
  let locale: string
  
  test.describe('Project management overview', () => {
    test.beforeAll(
      async ({ browser: testBrowser, baseURL }, testInfo: TestInfo) => {
        test.setTimeout(60000)
        browser = testBrowser
        context = await browser.newContext()
        page = await context.newPage()
  
        Allure.addAppOwner('Project Management')
        Allure.addSeverity('normal')
        Allure.addTag('smoke')
  
        const testContext = await setupTestContext(page, testInfo)
        locale = testContext.locale
        overviewPage = new OverviewPage(page, locale)
        projectOverview = new ProjectOverview(page, locale)
        resourceAllocation = new ResourceAllocation(page, locale)
        await page.waitForTimeout(5000)
        await overviewPage.goto(baseURL)
        await page.waitForLoadState('networkidle')
      }
    )

        test('Validate the navigation to selected project overview through clicking on search icon and edit the project details', async () => {
                    Allure.addDescription(
                      'Verifies the navigation to project overview and edit the project details.'
                )
                    await Allure.step(
                      'Validate the working of search icon that navigation to project overview and validate the changes',
                      async () => {
                        
                        await overviewPage.searchIconForProjectVisible()
                        await projectOverview.projectOverviewMainVisible()
                        await projectOverview.clickEditButton()
                        await projectOverview.editBasicDataOfForm()
                        await projectOverview.validateUpdatedDetails()
                        
                      }
              )
        })

        test('Validate the hide project functionality', async () => {
            Allure.addDescription(
              'Verifies that project is hidden succssesfully.'
         )
            await Allure.step(
              'Validate the working of hide project button and its function',
              async () => {
                await projectOverview.projectOverviewMainVisible()
                await projectOverview.clickHideProject()
                await projectOverview.validateHideProject()
            }
        )
        })
      
        test('Validate the hidden filter functionality in overview', async () => {
            Allure.addDescription(
              'Verifies that project is hidden succssesfully.'
           )
            await Allure.step(
              'Validate the working of hidden filter and its function',
              async () => {
                await resourceAllocation.expandSidebarContent()
                await overviewPage.navigateToOverview()
                await resourceAllocation.closeExpandSidebar()
                await overviewPage.clickFilterInOverview()
                await overviewPage.validateHiddenFilter()
                }
          )
        })
         
        test('Validate the reveal project functionality', async () => {
          Allure.addDescription(
            'Verifies that project is revealed succssesfully.'
        )
          await Allure.step(
            'Validate the working of reveal project button and its function',
            async () => {
              await overviewPage.searchIconForProjectVisible() 
              await projectOverview.projectOverviewMainVisible()
              await projectOverview.clickRevealProject()
              await page.waitForLoadState('networkidle')
              await projectOverview.validateRevealProject()
              
            }
       )
        })
      
      
        test('Verify the navigation to personnel allocation page when clicked on arrow icon', async () => {
            const projectOverview = new ProjectOverview(page, locale)
          
            Allure.addDescription(
              'Verifies that when clicked on the allocate employee arrow icon, it is navigating to the new page that is personnel allocation');
             await Allure.step(
              'Click on the arrow icon and verify the page elements', async () => {
                const newPage = await projectOverview.navigateToProjectPlan()
                await projectOverview.verifyHeadingInNewPage(newPage!)
              }
            )
        })

        test.skip('Validate the deletion of project', async () => {
            Allure.addDescription(
              'Verifies that project is deleted succssesfully.'
        )
            await Allure.step(
              'Validate the deletion of project',
              async () => {
                await overviewPage.searchIconForProjectVisible()
                await projectOverview.projectOverviewMainVisible()
                await projectOverview.validateDeleteProject() 
              }
       )
  })
      

})    