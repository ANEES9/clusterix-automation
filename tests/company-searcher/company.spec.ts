import { BrowserContext, Page, test, expect } from '@playwright/test'
import { CompanyPage } from 'pages/company-searcher/company-page'
import { FiltersPage } from 'pages/company-searcher/company-page'
import { closeCurrentlyActivePopup } from 'helpers/ui/company-searcher/currently-active-popup'
import { collapseSidebar } from 'helpers/ui/company-searcher/sidebar-helper'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { searchData } from 'utils/test-data/company-searcher/search-data'
import { Allure } from 'common/allure-helper'
import { setupTestContext } from 'utils/test-context'

let sharedPage: Page
let sharedContext: BrowserContext
let locale: string
let companyPage: CompanyPage
let filtersPage: FiltersPage

test.describe('Company Page Test Suite', () => {
  test.beforeAll(async ({ browser, baseURL }, testInfo) => {
    test.setTimeout(60000)
    sharedContext = await browser.newContext()
    sharedPage = await sharedContext.newPage()
    locale = (await setupTestContext(sharedPage, testInfo)).locale
    await sharedPage.goto(baseURL!)
    await sharedPage.waitForLoadState('networkidle')
    await addCursorStyleAndScript(sharedPage)
    companyPage = new CompanyPage(sharedPage, locale)
    filtersPage = new FiltersPage(sharedPage)
    await companyPage.naviagtetoCompanySearcher()
    await sharedPage.waitForLoadState('networkidle')
    await collapseSidebar(sharedPage)
    await closeCurrentlyActivePopup(sharedPage)
  })

  test('Verifying Company page UI Elements to be visible', async () => {
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    Allure.addDescription('Verifying Company page UI Elements to be visible')
    await companyPage.verifyUIElements()
  })
  test('Rows count matches the selected dropdown option', async () => {
    Allure.addSeverity('normal')
    Allure.addDescription('Rows count matches the selected dropdown option')
    await companyPage.verifyDropdownOptionsMatchRowCount()
  })

  test('Verify random company search terms', async () => {
    Allure.addSeverity('critical')
    Allure.addTag('search')
    Allure.addDescription('Verify search feature with random search terms')
    await companyPage.performAndVerifySearches(searchData, 2) // Adjust Number of search terms
  })

  test('Verify Search, Pagination, and Data Validation with Flexible Page Check', async () => {
    Allure.addSeverity('critical')
    Allure.addTag('search')
    Allure.addDescription(
      'Verify Search, Pagination, and Data Validation with Flexible Page Check'
    )

    const searchItems = companyPage.pickRandomItems(searchData, 1) // Adjust Number of search terms
    for (const { searchTerm } of searchItems) {
      await companyPage.performSearchAndValidatePagination(searchTerm, 2) // Adjust Number of pages
    }
  })

  test('Verify Go-To-Page Functionality', async () => {
    Allure.addSeverity('critical')
    Allure.addTag('navigation')
    Allure.addDescription('Verify Go-To-Page Functionality')
    const maxPagesToCheck = 1 // Adjust Number of pages
    await companyPage.testGoToPageFunctionality(maxPagesToCheck)
    await companyPage.reloadAndResetSearch() // Todo Pagination Bug needs to be fixed
  })

  test('Verify Search, Pagination, and Go-to-Page Functionality', async () => {
    Allure.addSeverity('critical')
    Allure.addDescription(
      'Test to validate search, pagination, and go-to-page functionalities.'
    )
    const searchItems = companyPage.pickRandomItems(searchData, 1) // Assuming pickRandomItems is implemented in POM
    for (const { searchTerm } of searchItems) {
      await companyPage.performSearchAndNavigatePages(searchTerm, 2) // Test with 2 pages
      await companyPage.reloadAndResetSearch() // Todo Pagination Bug needs to be fixed
    }
  })

  test('Verify Go to Page Button is Disabled for Already Selected Pages', async () => {
    Allure.addSeverity('critical')
    Allure.addDescription(
      'Verify Go to Page Button is Disabled for Already Selected Pages'
    )
    await companyPage.verifyPageButtonDisabledForSelectedPages()
  })

  test('Verify Next Page Button Functionality', async () => {
    Allure.addSeverity('critical')
    Allure.addTag('navigation')
    Allure.addDescription(
      'Test to verify that clicking the Next button navigates to the next page.'
    )
    Allure.addFeature('NAVIGATION')
    const pagesToNavigate = 2 // Set the number of pages to navigate through
    await companyPage.navigateAndVerifyNextPage(pagesToNavigate)
  })

  test('Verify Backwards Navigation Functionality', async () => {
    Allure.addSeverity('critical')
    Allure.addTag('navigation')
    Allure.addDescription(
      'Test to verify that clicking the "Previous" button navigates to the previous page.'
    )
    const pagesToNavigateBack = 2 // Number of pages to navigate backwards
    const startingPage = 10 // Starting page number for the test
    await companyPage.verifyPreviousPageNavigation(
      startingPage,
      pagesToNavigateBack
    )
  })

  test('verify child row label matches expanded rows', async () => {
    Allure.addSeverity('critical')
    Allure.addTag('table')
    Allure.addDescription(
      'This test verifies that the number of rows expanded matches the child label for each expandable button in the table.'
    )
    const count = 1 // Number of rows to test
    await companyPage.verifyExpandedRowsMatchLabels(count)
  })

  test('Verify all filter elements are visible', async () => {
    Allure.addSeverity('critical')
    Allure.addTag('filter')
    Allure.addDescription(
      'Test to verify that filter elements are visible and functional.'
    )
    await companyPage.filterButton.click() // Open filters
    await filtersPage.verifyAllFiltersVisible()
  })

  test('Verify country selection from nested dropdown', async () => {
    Allure.addSeverity('critical')
    Allure.addTag('filter')
    Allure.addDescription(
      'Test to verify that nested dropdown is visible and functional.'
    )
    const selectedCountry = await filtersPage.selectRandomCountryFromDropdown()
    await filtersPage.verifySelectedCountry(selectedCountry)
  })
  test.afterAll(async () => {
    await sharedContext.close()
  })
})
