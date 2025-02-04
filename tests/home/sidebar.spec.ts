import { test } from '@playwright/test'
import { HomePage } from 'pages/home/home-page'
import { Allure } from 'common/allure-helper'
import { APP_NAMES } from 'constants/app-names'
import { setupTestContext } from 'utils/test-context'

test.describe('Container App Sidebar Navigation Tests', () => {
  let homePage: HomePage
  let locale: string

  test.beforeEach(async ({ page }, testInfo) => {
    Allure.addFeature('Sidebar navigation')
    Allure.addAppOwner('Home')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    homePage = new HomePage(page, locale)
  })
  test('Validate Home Page Navigation from Sidebar', async () => {
    await Allure.step('Navigate to Home Page', async () => {
      await homePage.navigateToHomeFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateNoAppSelected()
    })
  })
  test('Validate Files Navigation from Sidebar', async () => {
    await Allure.step('Navigate to Home Page', async () => {
      await homePage.navigateToFilesFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.files)
    })
  })
  test('Validate Office Navigation from Sidebar', async () => {
    await Allure.step('Navigate to Office Page', async () => {
      await homePage.navigateToOfficeFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.office)
    })
  })
  test('Validate PDF Navigation from Sidebar', async () => {
    await Allure.step('Navigate to PDF Page', async () => {
      await homePage.navigateToPdfFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.pdf)
    })
  })
  test('Validate Project Management Navigation from Sidebar', async () => {
    await Allure.step('Navigate to HR Page', async () => {
      await homePage.navigateToProjectManagementFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.projectManagement)
    })
  })
  test('Validate Task Management Navigation from Sidebar', async () => {
    await Allure.step('Navigate to Task Management Page', async () => {
      await homePage.navigateToTaskManagementFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.taskManagement)
    })
  })
  test('Validate Time Tracking Navigation from Sidebar', async () => {
    await Allure.step('Navigate to Time Tracking Page', async () => {
      await homePage.navigateToTimeTrackingFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.timeTracking)
    })
  })
  test('Validate Accounting Navigation from Sidebar', async () => {
    await Allure.step('Navigate to Accounting Page', async () => {
      await homePage.navigateToAccountingFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.accounting)
    })
  })
  test('Validate Subsidies Navigation from Sidebar', async () => {
    await Allure.step('Navigate to Subsidies Page', async () => {
      await homePage.navigateToSubsidiesFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.subsidies)
    })
  })
  test('Validate Bulk Mailing Navigation from Sidebar', async () => {
    await Allure.step('Navigate to Bulk Mailing Page', async () => {
      await homePage.navigateToBulkMailingFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.bulkMailing)
    })
  })
  test('Validate Company Searcher Navigation from Sidebar', async () => {
    await Allure.step('Navigate to Company Searcher Page', async () => {
      await homePage.navigateToCompanySearcherFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.companySearcher)
    })
  })
  test('Validate Customers Navigation from Sidebar', async () => {
    await Allure.step('Navigate to Company Searcher Page', async () => {
      await homePage.navigateToCustomersFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.customers)
    })
  })
  test('Validate External Forms Navigation from Sidebar', async () => {
    await Allure.step('Navigate to External Forms Page', async () => {
      await homePage.navigateToExternalFormsFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.externalForms)
    })
  })
  test('Validate Byte Builder Navigation from Sidebar', async () => {
    await Allure.step('Navigate to Byte Builder Page', async () => {
      await homePage.navigateToByteBuilderFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.byteBuilder)
    })
  })
  test('Validate Integration Navigation from Sidebar', async () => {
    await Allure.step('Navigate to Integration Page', async () => {
      await homePage.navigateToIntegrationFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.integration)
    })
  })
  test('Validate No Code Navigation from Sidebar', async () => {
    await Allure.step('Navigate to no code Page', async () => {
      await homePage.navigateToNoCodeFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.noCode)
    })
  })
  test('Validate Template Manager Navigation from Sidebar', async () => {
    await Allure.step('Navigate to Template Manager Page', async () => {
      await homePage.navigateToTemplateManagerFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.templateManager)
    })
  })
})
