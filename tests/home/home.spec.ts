import { Browser, Page, test } from '@playwright/test'
import { HomePage } from 'pages/home/home-page'
import { Allure } from 'common/allure-helper'
import { NotificationsPanelPage } from 'pages/notifications/notifications-panel-page'
import { APP_NAMES } from 'constants/app-names'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'
import { CompanyPage } from 'pages/company-searcher/company-page'

let browser: Browser
let context: BrowserContext
let page: Page
let homePage: HomePage
let notificationsPanelPage: NotificationsPanelPage
let companyPage: CompanyPage
let locale: string

test.describe.parallel('Home Page Tests', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()

    Allure.addAppOwner('Home')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')

    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    homePage = new HomePage(page, locale)
    notificationsPanelPage = new NotificationsPanelPage(page, locale)
    companyPage = new CompanyPage(page, locale)
    await homePage.goto(baseURL)
    await page.waitForLoadState('domcontentloaded')
  })

  //Header Navigation Tests
  test('Validate Notifications Panel Opens on Button Click', async () => {
    Allure.addFeature('HEADER')
    await Allure.step('Open Notifications Panel', async () => {
      await homePage.openNotificationsPanel()
    })
    await Allure.step('Check Navigation Panel Header', async () => {
      await notificationsPanelPage.validateNotificationsPanelHeader()
    })
  })
  test('Validate Calendar Navigation on Button Click', async () => {
    Allure.addFeature('HEADER')
    await Allure.step('Navigate to Calendar Page', async () => {
      await homePage.navigateToCalendarFromHeader()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.calendar)
    })
  })
  test('Validate Time Tracking Navigation on Button Click', async () => {
    Allure.addFeature('HEADER')
    await Allure.step('Navigate to Time Tracking Page', async () => {
      await homePage.navigateToTimeTrackingFromHeader()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.timeTracking)
    })
  })
  test('Validate Email Navigation on Button Click', async () => {
    Allure.addFeature('HEADER')
    await Allure.step('Navigate to Email Page', async () => {
      await homePage.navigateToEmailFromHeader()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.email)
    })
  })
  test('Validate Live Chat Navigation on Button Click', async () => {
    Allure.addFeature('HEADER')
    await Allure.step('Open Live Chat in New Tab and Validate', async () => {
      await homePage.openLiveChatAndValidate(context, locale)
    })
  })

  //Sidebar Navigation Tests
  test('Validate Files Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Home Page', async () => {
      await homePage.navigateToFilesFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.files)
    })
  })
  test('Validate Office Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Office Page', async () => {
      await homePage.navigateToOfficeFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.office)
    })
  })
  test('Validate PDF Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to PDF Page', async () => {
      await homePage.navigateToPdfFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.pdf)
    })
  })
  test('Validate Human Resources Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to HR Page', async () => {
      await homePage.navigateToHrFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.hr)
    })
  })
  test('Validate Inventory Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Inventory Page', async () => {
      await homePage.navigateToInventoryFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.inventory)
    })
  })
  test('Validate Project Management Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Project Management Page', async () => {
      await homePage.navigateToProjectManagementFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.projectManagement)
    })
  })
  test('Validate Task Management Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Task Management Page', async () => {
      await homePage.navigateToTaskManagementFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.taskManagement)
    })
  })
  test('Validate Time Tracking Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Time Tracking Page', async () => {
      await homePage.navigateToTimeTrackingFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.timeTracking)
    })
  })
  test('Validate Accounting Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Accounting Page', async () => {
      await homePage.navigateToAccountingFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.accounting)
    })
  })
  test('Validate Subsidies Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Subsidies Page', async () => {
      await homePage.navigateToSubsidiesFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.subsidies)
    })
  })
  test('Validate Bulk Mailing Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Bulk Mailing Page', async () => {
      await homePage.navigateToBulkMailingFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.bulkMailing)
    })
  })
  test('Validate Company Searcher Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Company Searcher Page', async () => {
      await homePage.navigateToCompanySearcherFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.companySearcher)
    })
    await Allure.step('Check Current App', async () => {
      await companyPage.skipCurrentlyActiveModal()
    })
  })
  test('Validate Customers Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Company Searcher Page', async () => {
      await homePage.navigateToCustomersFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.customers)
    })
  })
  test('Validate External Forms Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to External Forms Page', async () => {
      await homePage.navigateToExternalFormsFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.externalForms)
    })
  })
  test('Validate Byte Builder Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Byte Builder Page', async () => {
      await homePage.navigateToByteBuilderFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.byteBuilder)
    })
  })
  test('Validate Integration Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Integration Page', async () => {
      await homePage.navigateToIntegrationFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.integration)
    })
  })
  test('Validate No Code Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to no code Page', async () => {
      await homePage.navigateToNoCodeFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.noCode)
    })
  })
  test('Validate Template Manager Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Template Manager Page', async () => {
      await homePage.navigateToTemplateManagerFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateCurrentApp(APP_NAMES.templateManager)
    })
  })
  test('Validate Home Page Navigation from Sidebar', async () => {
    Allure.addFeature('SIDEBAR')
    await Allure.step('Navigate to Home Page', async () => {
      await homePage.navigateToHomeFromSideBar()
    })
    await Allure.step('Check Current App', async () => {
      await homePage.validateNoAppSelected()
    })
  })

  //Dashboard Item Tests
  test('Validate Files Content in Dashboard', async () => {
    await Allure.step('Hover File and Check', async () => {
      await homePage.validateFilesSection()
    })
  })
  test('Validate PDF Content in Dashboard', async () => {
    await Allure.step('Hover PDF and Check', async () => {
      await homePage.validatePdfSection()
    })
  })
  test('Validate Office Content in Dashboard', async () => {
    await Allure.step('Hover Office and Check', async () => {
      await homePage.validateOfficeSection()
    })
  })
})
