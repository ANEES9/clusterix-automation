import { Browser, Page, test, TestInfo} from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { BrowserContext } from 'playwright'
import { setupTestContext } from 'utils/test-context'
import { ProjectTypesPage } from 'pages/project-management/projects/project-types-page' 

let browser: Browser
  let context: BrowserContext
  let page: Page
  let projectTypesPage: ProjectTypesPage
  let locale: string
  
  test.describe('Project management project type', () => {
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
        projectTypesPage = new ProjectTypesPage(page, locale)
        //await page.waitForTimeout(50000)
        await projectTypesPage.goto(baseURL)
        await page.waitForLoadState('networkidle')
      }
    )
        


      
        test('Verify the new project type button & create a new project type', async () => {
            Allure.addDescription(
                'Verifies the functionality of the new project type button and ensures new project type created successfully.'
            )
            await Allure.step(
                'Click new project type button and verify the page elements',
                async () => {
                    await projectTypesPage.clickNewProjectTypeButton()
                    await projectTypesPage.fillTitleInput()
                    await projectTypesPage.selectColorByIndex(1)
                    await projectTypesPage.fillDescriptionInput()
                    await projectTypesPage.selectWorkflowCategory()
                    await projectTypesPage.clickManageParticipantsButton()
                    await projectTypesPage.rdtoggleProjectType()
                    await projectTypesPage.clickCreateButton()
                    await projectTypesPage.verifyProjectTypeVisible()

            })
        }) 
  
        test('Edit the project type', async () => {
          Allure.addDescription(
              'Verifies that changes done to project type is loaded correclty on main page.'
          )
          await Allure.step(
              'Edit project type and validate the changes',
              async () => {
                  await projectTypesPage.clickOnEditButton()
                  await projectTypesPage.editProjectType()
                  await projectTypesPage.updatedProjectType()

          })
      })

      test('Validate the search for project type filter', async () => {
        Allure.addDescription(
            'Verifies that project type is searched and validate through its existence on the main page.'
        )
        await Allure.step(
            'Validate the search for project type filter',
            async () => {
                await projectTypesPage.validatingSearchForProjectTypeFilter()

        })
    })


      test('Delete project type', async () => {
        Allure.addDescription(
            'Verifies that project type is deleted and validate through its existence on the main page.'
        )
        await Allure.step(
            'Delete project type and validate the deletion',
            async () => {
                await projectTypesPage.deleteProjectType()
                await projectTypesPage.validateDeleteProjectType
                await page.waitForLoadState('networkidle')

        })
    })

})