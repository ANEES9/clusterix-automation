import { test , expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { ProjectTypesPage } from 'pages/project-management/projects/project-types-page' 
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { addCursorStyleAndScript } from 'common/cursor-helper'


test.describe('Project management project type ', () => {
    let projectTypesPage: ProjectTypesPage
    test.setTimeout(150000);
    test.beforeEach(async ({ page, baseURL }, testInfo) => {
        projectTypesPage = new ProjectTypesPage(page, 'en')

        await Allure.step('Navigate to project management overview', async () => {
            await projectTypesPage.goto(baseURL)
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
      test.setTimeout(150000)
      
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


      test('Delete project type', async () => {
        Allure.addDescription(
            'Verifies that project type is deleted and validate through its existence on the main page.'
        )
        await Allure.step(
            'Delete project type and validate the deletion',
            async () => {
                await projectTypesPage.deleteProjectType()
                await projectTypesPage.validateDeleteProjectType
        })
    })

})