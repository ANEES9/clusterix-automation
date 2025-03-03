import { Browser, Page, test, TestInfo} from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { BrowserContext } from 'playwright'
import { setupTestContext } from 'utils/test-context'
import { OverviewPage } from 'pages/project-management/projects/overview-page'
import { ProjectOverview } from 'pages/project-management/projects/project-overview-page'

  let browser: Browser
  let context: BrowserContext
  let page: Page
  let overviewPage: OverviewPage
  let projectOverview: ProjectOverview
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
        await page.waitForTimeout(5000)
        await overviewPage.goto(baseURL)
        await page.waitForLoadState('networkidle')
      }
    )

      test('Verify "all filters" functinality in overview', async () => {
            Allure.addDescription(
              'Verifies the functionality of the all projects filter and ensures expected elements are loaded correctly.'
        )
            await Allure.step(
              'Click all projocts filter button and verify the page elements',
              async () => {
                await overviewPage.TableProjectloaded()
                await overviewPage.clickAllTypesFilter()
                await overviewPage.allTypesFilterDropdownListVisible 
                await overviewPage.clickFirstDropdownOption() 
                await overviewPage.sffHeaderVisible()  
                }                                                
      )
    })

    test('Click on make grouping on/off button and verify it', async () => {
        Allure.addDescription(
          'Verifiy the make grouping button'
        )
        await Allure.step(
          'Click make grouping button and verify the page elements',
          async () => {
            await overviewPage.makeGroupingOn()
            await overviewPage.makeGroupingOff()
          }
        )
    })

        
      test('Verify all view types in overview', async () => {
            Allure.addDescription(
              'Verifies the different view types and ensures expected elements are loaded correctly.'
        )
            await Allure.step(
              'Click view button and verify different view with there page elements',
              async () => {
                await overviewPage.clickViewButton()
                await overviewPage.clickTileViewButton() 
                //await page.waitForTimeout(1000)
                await overviewPage.tileViewVisible() 
                await overviewPage.tileButtonClick()
                await overviewPage.clickKanbanViewButton()
                await overviewPage.kanbanViewVisible() 
              }                                                
      )
    }) 

    test('Click on add project button and verify modal appears', async () => {
                    Allure.addDescription(
                      'Verifiy the add project button and modal elements'
                    )
                    await Allure.step(
                      'Click add project button and verify the modal elements',
                      async () => {
                        await overviewPage.clickAddProjectButton()
                        await overviewPage.validateAddProjectModal()
                      }
                    )
    })


    test('Validate the title input field for character counts in add projct modal', async () => {
            Allure.addDescription(
              'Verifies the character count of the short title and project title input fields for add project modal.'
        )
            await Allure.step(
              'Validate the character count of the short title and project title input fields',
              async () => {
                await overviewPage.fillShortTitleInputCharaterCount()
                await overviewPage.fillProjectTitleInputCharaterCount()
                await overviewPage.validateClosingProjectModal()
              }
      )
    })

    test('Verfify that create project button working and new project added', async () => {
      Allure.addDescription(
        'Verifies the working of add project button by modal elements and validate that project is created.'
  )
      await Allure.step(
        'Click add project and verify modal elements and create project',
        async () => {
          await overviewPage.clickAddProjectButton()
          await overviewPage.validateAddProjectModal()
          await overviewPage.selectProjectTypeVisible() 
          await overviewPage.selectProjectTypeSff()
          await overviewPage.fillShortTitleInput()
          await overviewPage.fillProjectTitleInput()
          await overviewPage.projectStartDateSelected() 
          await overviewPage.projectEndDateSelected()
          await overviewPage.clickCreateProjectButton()
          await page.waitForLoadState('networkidle')
          await page.waitForLoadState('domcontentloaded')
          }
)
    })

  })