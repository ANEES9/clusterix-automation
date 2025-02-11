import { test } from '@playwright/test'
import { EmployeeManagementPage } from 'pages/hr/employee-management-page'
import { Allure } from 'common/allure-helper'
import { VacationAbsenceDaysPage } from 'pages/my-profile/vacation-absence-days.page'
import { setupTestContext } from 'utils/test-context'

let employeeId: number | null = null

test.describe('Regression Test Suite', () => {
  let vacationAbsenceDaysPage: VacationAbsenceDaysPage
  let employeeManagementPage: EmployeeManagementPage
  let locale: string
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await vacationAbsenceDaysPage.goto(baseURL)
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    vacationAbsenceDaysPage = new VacationAbsenceDaysPage(page, locale)
    employeeManagementPage = new EmployeeManagementPage(page, locale)
    await page.waitForTimeout(4000)
    await page.waitForLoadState('networkidle')
  })

  test('Verify selecting available filter', async () => {
    Allure.addDescription('Verify remaining number of Leaves')
    Allure.addTag('regression') // Tag the test for categorization in reports
    Allure.addSeverity('normal') // Set severity level for the test

    await Allure.step('Step 1: Choose all the filters', async () => {
      await vacationAbsenceDaysPage.VerifyAllStatusesFilter()
    })
  })

  test('Verify All Available Absence Types', async ({ page }) => {
    Allure.addDescription('Verify all available absence types in the system')
    Allure.addTag('regression')
    Allure.addSeverity('normal')

    const vacationAbsenceDaysPage = new VacationAbsenceDaysPage(page, locale)

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: Verify available absence types', async () => {
      await vacationAbsenceDaysPage.VerifyAvailableAbsenceTypes()
    })
  })

  test('Verify remaining number of Leaves in Vacation Days section', async ({
    page,
  }) => {
    Allure.addDescription('Verify remaining number of Leaves')
    Allure.addTag('regression') // Tag the test for categorization in reports
    Allure.addSeverity('normal') // Set severity level for the test

    const vacationAbsenceDaysPage = new VacationAbsenceDaysPage(page, locale)

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: Add a paid vacation', async () => {
      await vacationAbsenceDaysPage.selectPaidVacation()
      await vacationAbsenceDaysPage.clickCreateButton()
    })

    await Allure.step('Step 3: Verify remaining number of leaves', async () => {
      await vacationAbsenceDaysPage.verifyRemainingNumberOfPaidLeaves()
    })
  })

  test('Verify remaining number of Leaves in Sick Days section', async () => {
    Allure.addDescription('Verify remaining number of Leaves')
    Allure.addTag('regression') // Tag the test for categorization in reports
    Allure.addSeverity('normal') // Set severity level for the test

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: Add a paid vacation', async () => {
      await vacationAbsenceDaysPage.selectSickLeave()
      await vacationAbsenceDaysPage.clickCreateButton()
    })

    await Allure.step(
      'Step 3: Verify remaining number of sick leaves',
      async () => {
        await vacationAbsenceDaysPage.verifyRemainingNumberOfSickLeaves()
      }
    )
  })

  test('Verify selected days text in the absence modal', async ({ page }) => {
    Allure.addDescription('Verify remaining number of Leaves')
    Allure.addTag('regression') // Tag the test for categorization in reports
    Allure.addSeverity('normal') // Set severity level for the test

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: Add a paid vacation', async () => {
      await vacationAbsenceDaysPage.selectPaidVacation()
      await vacationAbsenceDaysPage.clickCreateButton()
    })

    await Allure.step(
      'Step 3: Verify remaining number of sick leaves',
      async () => {
        await vacationAbsenceDaysPage.selectADay()
        await page.waitForTimeout(2000)
        await vacationAbsenceDaysPage.VerifySelectedDaysText()
      }
    )
  })

  test('Apply Vacation Days', async ({ page }) => {
    Allure.addDescription('Test the application of vacation days in the system')
    Allure.addTag('regression')
    Allure.addSeverity('critical')

    const employeeManagementPage = new EmployeeManagementPage(page, locale)

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: Add a paid vacation', async () => {
      await vacationAbsenceDaysPage.selectPaidVacation()
      await vacationAbsenceDaysPage.clickCreateButton()
    })

    await Allure.step(
      'Step 3: Select a dynamic vacation date and proceed',
      async () => {
        await vacationAbsenceDaysPage.selectADay()
        await page.waitForTimeout(2000)
        await vacationAbsenceDaysPage.clickOnNextButton()
        await page.waitForTimeout(2000)
      }
    )

    await Allure.step('Step 4: Select a co-worker and proceed', async () => {
      await vacationAbsenceDaysPage.selectACoWorker()
      await vacationAbsenceDaysPage.clickOnNextButton()
      await page.waitForTimeout(2000)
    })

    await Allure.step('Step 5: Submit vacation request', async () => {
      employeeId = await vacationAbsenceDaysPage.getEmployeeIdFromResponse()
      await page.waitForTimeout(2000)

      if (employeeId === null) {
        throw new Error('Failed to retrieve employee ID')
      }

      console.log(
        'Vacation request successfully submitted with Employee ID:',
        employeeId
      )
    })

    await Allure.step(
      'Step 6: Verify and clean up vacation request',
      async () => {
        if (employeeId) {
          await vacationAbsenceDaysPage.verifyConfirmationMessageForVacationDialog()
          await vacationAbsenceDaysPage.verifyVacationAppliedDate()
          await vacationAbsenceDaysPage.verifyDescriptionForVacationConfirmationDialog()
          await vacationAbsenceDaysPage.verifyVacationDialogCloseButton()

          console.log('Cleaning up: Deleting the applied leave')
          await employeeManagementPage.deleteAppliedLeave(223)
        } else {
          throw new Error(
            'Employee ID is missing. Cannot proceed with verification'
          )
        }
      }
    )
  })

  test('Apply Half Day Vacation', async ({ page }) => {
    Allure.addDescription(
      'Test the application of vacation days in the system.'
    )
    Allure.addTag('regression')
    Allure.addSeverity('critical')

    const employeeManagementPage = new EmployeeManagementPage(page, locale)

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: Add a paid vacation', async () => {
      await vacationAbsenceDaysPage.selectPaidVacation()
      await vacationAbsenceDaysPage.clickCreateButton()
    })

    await Allure.step(
      'Step 3: Select a dynamic vacation date and choose half dayproceed',
      async () => {
        await vacationAbsenceDaysPage.selectADay()
        await page.waitForTimeout(3000)
        await vacationAbsenceDaysPage.clickOnHalfDayCheckBox()
        await page.waitForTimeout(2000)
        await vacationAbsenceDaysPage.clickOnNextButton()
      }
    )

    await Allure.step('Step 4: Select a co-worker and proceed', async () => {
      await vacationAbsenceDaysPage.selectACoWorker()
      await page.waitForTimeout(2000)
      await vacationAbsenceDaysPage.clickOnNextButton()
    })

    await Allure.step('Step 5: Submit vacation request', async () => {
      employeeId = await vacationAbsenceDaysPage.getEmployeeIdFromResponse()
      await page.waitForTimeout(2000)

      if (employeeId === null) {
        throw new Error('Failed to retrieve employee ID.')
      }

      console.log(
        'Vacation request successfully submitted with Employee ID:',
        employeeId
      )
    })

    await Allure.step(
      'Step 6: Verify and clean up vacation request',
      async () => {
        if (employeeId) {
          await page.waitForTimeout(2000)
          await vacationAbsenceDaysPage.verifyConfirmationMessageForVacationDialog()
          await vacationAbsenceDaysPage.verifyVacationAppliedDate()
          await vacationAbsenceDaysPage.verifyDescriptionForVacationConfirmationDialog()
          await vacationAbsenceDaysPage.verifyVacationDialogCloseButton()

          console.log('Cleaning up: Deleting the applied leave.')
          await employeeManagementPage.deleteAppliedLeave(employeeId)
        } else {
          throw new Error(
            'Employee ID is missing. Cannot proceed with verification.'
          )
        }
      }
    )
  })

  test('Apply Sick Day Leave', async ({ page }) => {
    Allure.addDescription(
      'Test the application of vacation days in the system.'
    )
    Allure.addTag('regression')
    Allure.addSeverity('critical')

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: Add a paid vacation', async () => {
      await vacationAbsenceDaysPage.selectSickLeave()
      await vacationAbsenceDaysPage.clickCreateButton()
    })

    await Allure.step(
      'Step 3: Select a dynamic vacation date and enter some message proceed',
      async () => {
        await test.setTimeout(60000)
        await vacationAbsenceDaysPage.selectADay()
        await vacationAbsenceDaysPage.enterAMessage()
      }
    )

    await Allure.step('Step 5: Submit sick request', async () => {
      await test.setTimeout(100000)
      employeeId = await vacationAbsenceDaysPage.getEmployeeIdFromResponse()

      if (employeeId === null) {
        throw new Error('Failed to retrieve employee ID.')
      }

      console.log(
        'sick request successfully submitted with Employee ID:',
        employeeId
      )
    })

    await Allure.step('Step 6: Verify and comfirmation doalge', async () => {
      if (employeeId) {
        await vacationAbsenceDaysPage.verifyConfirmationMessageForSickDialog()
        await vacationAbsenceDaysPage.verifyVacationAppliedDate()
        await vacationAbsenceDaysPage.verifyDescriptionForSickConfirmationDialog()
        await vacationAbsenceDaysPage.verifyVacationDialogCloseButton()

        console.log('Cleaning up: Deleting the applied leave.')
        await employeeManagementPage.deleteAppliedLeave(employeeId)
        await page.waitForTimeout(2000)
      } else {
        throw new Error(
          'Employee ID is missing. Cannot proceed with verification.'
        )
      }
    })
  })

  test('Apply Home Office Days', async ({ page }) => {
    Allure.addDescription(
      'Test the application of vacation days in the system.'
    )
    Allure.addTag('regression')
    Allure.addSeverity('critical')

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: Choose Home Office Option', async () => {
      await vacationAbsenceDaysPage.selectHomeOffice()
      await page.waitForTimeout(2000)
      await vacationAbsenceDaysPage.clickCreateButton()
    })

    await Allure.step(
      'Step 3: Select a dynamic vacation date and proceed',
      async () => {
        await page.waitForTimeout(2000)
        await vacationAbsenceDaysPage.selectADay()
        await vacationAbsenceDaysPage.clickOnNextButton()
      }
    )

    await Allure.step(
      'Step 5: Submit Home office request request',
      async () => {
        await page.waitForTimeout(2000)
        employeeId = await vacationAbsenceDaysPage.getEmployeeIdFromResponse()

        if (employeeId === null) {
          throw new Error('Failed to retrieve employee ID.')
        }

        console.log(
          'Home Office request successfully submitted with Employee ID:',
          employeeId
        )
      }
    )

    await Allure.step(
      'Step 6: Verify and clean up vacation request',
      async () => {
        if (employeeId) {
          await vacationAbsenceDaysPage.verifyConfirmationMessageForHomeOfficeDialog()
          await vacationAbsenceDaysPage.verifyVacationAppliedDate()
          await vacationAbsenceDaysPage.verifyDescriptionForHomeOfficeConfirmationDialog()
          await vacationAbsenceDaysPage.verifyVacationDialogCloseButton()

          console.log('Cleaning up: Deleting the Home office request.')
          await employeeManagementPage.deleteAppliedLeave(employeeId)
        } else {
          throw new Error(
            'Employee ID is missing. Cannot proceed with verification.'
          )
        }
      }
    )
  })

  test('Apply Other Vacation Days', async ({ page }) => {
    Allure.addDescription('Test the application of vacation days in the system')
    Allure.addTag('regression')
    Allure.addSeverity('critical')

    await Allure.step('Step 1: Open New Request section', async () => {
      await vacationAbsenceDaysPage.openNewRequest()
    })

    await Allure.step('Step 2: Add a paid vacation', async () => {
      await vacationAbsenceDaysPage.selectOtherAbsence()
      await page.waitForTimeout(2000)
      await vacationAbsenceDaysPage.clickCreateButton()
    })

    await Allure.step(
      'Step 3: Select a dynamic vacation date and proceed',
      async () => {
        await page.waitForTimeout(3000)
        await vacationAbsenceDaysPage.selectADay()
        await vacationAbsenceDaysPage.clickOnNextButton()
      }
    )

    await Allure.step('Step 4: Select a co-worker and proceed', async () => {
      await page.waitForTimeout(2000)
      await vacationAbsenceDaysPage.selectACoWorker()
      await vacationAbsenceDaysPage.clickOnNextButton()
    })

    await Allure.step('Step 5: Submit vacation request', async () => {
      await page.waitForTimeout(2000)
      employeeId = await vacationAbsenceDaysPage.getEmployeeIdFromResponse()

      if (employeeId === null) {
        throw new Error('Failed to retrieve employee ID')
      }

      console.log(
        'Vacation request successfully submitted with Employee ID:',
        employeeId
      )
    })

    await Allure.step(
      'Step 6: Verify and clean up vacation request',
      async () => {
        if (employeeId) {
          await vacationAbsenceDaysPage.verifyVacationAppliedDate()
          await vacationAbsenceDaysPage.verifyDescriptionOtherVacationConfirmationDialog()
          await vacationAbsenceDaysPage.verifyVacationDialogCloseButton()

          console.log('Cleaning up: Deleting the applied leave.')
          await employeeManagementPage.deleteAppliedLeave(employeeId)
        } else {
          throw new Error(
            'Employee ID is missing. Cannot proceed with verification.'
          )
        }
      }
    )
  })
})
