import { test, expect } from '@playwright/test'
import { closeTimerPopUp } from '../../helpers/common/timer-helper'
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper'
import { EmployeeManagementPage } from '../../pages/hr/employee-management-page'
import { Allure } from '../../helpers/common/allure-helper'
import { VacationAbsenceDaysPage } from '../../pages/my-profile/vacation-absence-days.page'
import { skipSurvey } from 'common/skip-survey'
import { closeProductTour } from 'common/product-tour-helper'

let employeeId: number | null = null

test.describe('Regression Test Suite', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    Allure.addDefaultLabels()

    console.log('Base URL:', baseURL);
    console.log('Navigating to:', `${baseURL}/profile/vacation-and-absence-days`);
  
    await page.goto(`${baseURL}/profile/vacation-and-absence-days`)
    await page.waitForLoadState('networkidle');
  
    await skipSurvey(page)
    await closeProductTour(page)
    await closeTimerPopUp(page)
    await addCursorStyleAndScript(page)
    await page.waitForLoadState('networkidle')
  })

  test('TC01: Verify All Available Absence Types', async ({ page }) => {
    Allure.addDescription('Verify all available absence types in the system')
    Allure.addTag('Vacation')
    Allure.addSeverity('normal')

    const vacationAbsenceDaysPage = new VacationAbsenceDaysPage(page)

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: Verify available absence types', async () => {
      await vacationAbsenceDaysPage.VerifyAvailableAbsenceTypes()
    })
  })

  test.only('TC02: Apply Vacation Days', async ({ page }) => {
    Allure.addDescription('Test the application of vacation days in the system')
    Allure.addTag('Vacation')
    Allure.addSeverity('critical')

    const vacationAbsenceDaysPage = new VacationAbsenceDaysPage(page)
    const employeeManagementPage = new EmployeeManagementPage(page)

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: Add a paid vacation', async () => {
      await vacationAbsenceDaysPage.selectPaidVacation()
      await vacationAbsenceDaysPage.clickCreateButton()
    })

    await Allure.step('Step 3: Select a dynamic vacation date and proceed', async () => {
      await vacationAbsenceDaysPage.selectADay()
      await vacationAbsenceDaysPage.clickOnNextButton()
    })

    await Allure.step('Step 4: Select a co-worker and proceed', async () => {
      await vacationAbsenceDaysPage.selectACoWorker()
      await vacationAbsenceDaysPage.clickOnNextButton()
    })

    await Allure.step('Step 5: Submit vacation request', async () => {
      employeeId = await vacationAbsenceDaysPage.getEmployeeIdFromResponse()

      if (employeeId === null) {
        throw new Error('Failed to retrieve employee ID')
      }

      console.log('Vacation request successfully submitted with Employee ID:', employeeId)
    })

    await Allure.step('Step 6: Verify and clean up vacation request', async () => {
      if (employeeId) {
        await vacationAbsenceDaysPage.verifyConfirmationMessageForVacationDialog()
        await vacationAbsenceDaysPage.verifyVacationAppliedDate()
        await vacationAbsenceDaysPage.verifyDescriptionForVacationConfirmationDialog()
        await vacationAbsenceDaysPage.verifyVacationDialogCloseButton()

        console.log('Cleaning up: Deleting the applied leave')
        await employeeManagementPage.deleteAppliedLeave(employeeId)
      } else {
        throw new Error('Employee ID is missing. Cannot proceed with verification')
      }
    })
  })
})
