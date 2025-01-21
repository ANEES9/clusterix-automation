import { test } from '@playwright/test'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { closeTimerPopUp } from 'common/timer-helper'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { ContainerPage } from 'pages/container-app/container-page'
import { Allure } from 'common/allure-helper'
import { APP_NAMES } from 'config/constants/app-names'

test.describe('Container App Sidebar Navigation Tests', () => {
  let containerPage: ContainerPage

  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    containerPage = new ContainerPage(page)
    await page.goto(baseURL!)
    await addCursorStyleAndScript(page)
    await skipSurveyHelper(page, testInfo)
    await skipProductTourHelper(page, testInfo)
    await closeTimerPopUp(page)
    await page.waitForLoadState('networkidle')
  })
  test('Validate Home Page Navigation from Sidebar', async () => {
    Allure.addFeature('Home Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Home Page', async () => {
      await containerPage.navigateToHomeFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp('No app selected')
    })
  })
  test('Validate Files Navigation from Sidebar', async () => {
    Allure.addFeature('Files Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Home Page', async () => {
      await containerPage.navigateToFilesFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.files)
    })
  })
  test('Validate Office Navigation from Sidebar', async () => {
    Allure.addFeature('Office Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Office Page', async () => {
      await containerPage.navigateToOfficeFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.office)
    })
  })
  test('Validate PDF Navigation from Sidebar', async () => {
    Allure.addFeature('PDF Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to PDF Page', async () => {
      await containerPage.navigateToPdfFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.pdf)
    })
  })
  test('Validate Project Management Navigation from Sidebar', async () => {
    Allure.addFeature('HR Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to HR Page', async () => {
      await containerPage.navigateToProjectManagementFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.projectManagement)
    })
  })
  test('Validate Task Management Navigation from Sidebar', async () => {
    Allure.addFeature('Task Management Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Task Management Page', async () => {
      await containerPage.navigateToTaskManagementFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.taskManagement)
    })
  })
  test('Validate Time Tracking Navigation from Sidebar', async () => {
    Allure.addFeature('Task Management Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Time Tracking Page', async () => {
      await containerPage.navigateToTimeTrackingFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.timeTracking)
    })
  })
  test('Validate Accounting Navigation from Sidebar', async () => {
    Allure.addFeature('Accounting Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Accounting Page', async () => {
      await containerPage.navigateToAccountingFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.accounting)
    })
  })
  test('Validate Subsidies Navigation from Sidebar', async () => {
    Allure.addFeature('Subsidies Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Subsidies Page', async () => {
      await containerPage.navigateToSubsidiesFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.subsidies)
    })
  })
  test('Validate Bulk Mailing Navigation from Sidebar', async () => {
    Allure.addFeature('Bulk Mailing Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Bulk Mailing Page', async () => {
      await containerPage.navigateToBulkMailingFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.bulkMailing)
    })
  })
  test('Validate Company Searcher Navigation from Sidebar', async () => {
    Allure.addFeature('Company Searcher Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Company Searcher Page', async () => {
      await containerPage.navigateToCompanySearcherFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.companySearcher)
    })
  })
  test('Validate Customers Navigation from Sidebar', async () => {
    Allure.addFeature('Company Searcher Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Company Searcher Page', async () => {
      await containerPage.navigateToCustomersFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.customers)
    })
  })
  test('Validate External Forms Navigation from Sidebar', async () => {
    Allure.addFeature('External Forms Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to External Forms Page', async () => {
      await containerPage.navigateToExternalFormsFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.externalForms)
    })
  })
  test('Validate Byte Builder Navigation from Sidebar', async () => {
    Allure.addFeature('Byte Builder Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Byte Builder Page', async () => {
      await containerPage.navigateToByteBuilderFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.byteBuilder)
    })
  })
  test('Validate Integration Navigation from Sidebar', async () => {
    Allure.addFeature('Integration Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Integration Page', async () => {
      await containerPage.navigateToIntegrationFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.integration)
    })
  })
  test('Validate No Code Navigation from Sidebar', async () => {
    Allure.addFeature('No Code Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to no code Page', async () => {
      await containerPage.navigateToNoCodeFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.noCode)
    })
  })
  test('Validate Template Manager Navigation from Sidebar', async () => {
    Allure.addFeature('Template Manager Navigation')
    Allure.addSeverity('normal')
    await Allure.step('Navigate to Template Manager Page', async () => {
      await containerPage.navigateToTemplateManagerFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await containerPage.validateCurrentApp(APP_NAMES.templateManager)
    })
  })
})
