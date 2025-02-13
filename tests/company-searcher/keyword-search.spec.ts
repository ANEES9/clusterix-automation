import { BrowserContext, Page, test, expect } from '@playwright/test'
import { KeywordPage } from 'pages/company-searcher/keyword-page'
import { CompanyPage } from 'pages/company-searcher/company-page'
import { closeCurrentlyActivePopup } from 'helpers/ui/company-searcher/currently-active-popup'
import { collapseSidebar } from 'helpers/ui/company-searcher/sidebar-helper'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import * as keywords from 'utils/test-data/company-searcher/keywords.json'
import { Allure } from 'common/allure-helper'
import { setupTestContext } from 'utils/test-context'
let sharedPage: Page
let sharedContext: BrowserContext
// Function to pick random items from an array
const pickRandomItems = <T>(array: T[], count: number): T[] => {
  return array.sort(() => 0.5 - Math.random()).slice(0, count) // Shuffle and pick random items
}

test.beforeAll(async ({ browser, baseURL }, testInfo) => {
  sharedContext = await browser.newContext()
  sharedPage = await sharedContext.newPage()
  const { locale } = await setupTestContext(sharedPage, testInfo)
  await sharedPage.goto(baseURL!)
  await sharedPage.waitForLoadState('networkidle')
  await addCursorStyleAndScript(sharedPage)
  const companyPage = new CompanyPage(sharedPage, locale)
  await companyPage.companySearcherLink.click()
})

test.afterAll(async () => {
  await sharedContext.close()
})

test.describe('Keyword search tests', () => {
  let keywordPage: KeywordPage
  let searchTerms: string[]

  test.beforeEach(async ({}, testInfo) => {
    const locale = (testInfo.project.use?.locale ?? 'en') as 'en' | 'de'
    keywordPage = new KeywordPage(sharedPage, locale)
    searchTerms = keywords[locale] // Load keywords based on locale
    await sharedPage.waitForTimeout(1000)
    await keywordPage.openSearch()
    await closeCurrentlyActivePopup(sharedPage)
    await collapseSidebar(sharedPage)
  })

  test('Verify keyword page navigation and initial state', async () => {
    // Allure tags and metadata
    Allure.addSeverity('critical')
    Allure.addDescription(
      'Test to verify that the keyword search page is accessible and initial state is as expected.'
    )
    await keywordPage.verifySearchInput()
    await keywordPage.verifyInitialMessage()
    await keywordPage.verifyButtonVisible('save_search')
    await keywordPage.reloadPage()
  })

  test('Verify all UI elements are present', async () => {
    Allure.addSeverity('critical')
    Allure.addDescription(
      'Test to verify that the keyword search page is accessible and ui elements are present.'
    )
    await keywordPage.verifyElementsPresence()
    await keywordPage.reloadPage()
  })

  test('Verify keyword search functionality', async () => {
    Allure.addSeverity('critical')
    Allure.addTag('search')
    Allure.addDescription(
      'Test to verify that the keyword search functionality works as expected.'
    )
    const numberOfTermsToCheck = 1 // Set this to control how many terms to check
    // Pick random search terms from the searchTerms array
    const randomSearchTerms = pickRandomItems(searchTerms, numberOfTermsToCheck)
    for (const term of randomSearchTerms) {
      await keywordPage.performSearch(term)
      await keywordPage.verifySearchResultsHaveData(term)
      await keywordPage.resetSearch()
    }
    await keywordPage.reloadPage()
  })
  test('Verify Next Page Button Functionality', async () => {
    // Allure tags and metadata
    Allure.addSeverity('critical')
    Allure.addTag('navigation')
    Allure.addDescription(
      'Test to verify that clicking the Next button navigates to the next page and each page has data.'
    )

    const numberOfTermsToCheck = 1 // Set this to control how many terms to check
    const randomSearchTerms = pickRandomItems(searchTerms, numberOfTermsToCheck)

    for (const term of randomSearchTerms) {
      await keywordPage.performSearch(term)
      await sharedPage.waitForLoadState('networkidle') // Wait for the page to load fully
      await keywordPage.verifySearchResultsHaveData(term) // Verify data on the new page
      const pagesToNavigate = 3 // Configurable variable: number of pages to navigate
      let currentPageNumber = await keywordPage.getActivePageNumber() // Get the current active page number

      if (!currentPageNumber) {
        throw new Error('Failed to retrieve the current page number.')
      }
      let numericCurrentPageNumber = parseInt(currentPageNumber, 10)

      if (isNaN(numericCurrentPageNumber)) {
        throw new Error(`Invalid current page number: "${currentPageNumber}"`)
      }

      // Navigate through the pages and verify data
      for (let i = 0; i < pagesToNavigate; i++) {
        numericCurrentPageNumber = await keywordPage.navigateAndVerifyNextPage(
          numericCurrentPageNumber + 1
        )
        ;``
      }
    }
  })
})
