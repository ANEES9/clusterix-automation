import { test, expect } from '@playwright/test'
import { CompanyPage } from '../../pages/company-searcher/company-page'
import { closeCurrentlyActivePopup } from 'helpers/ui/company-searcher/currently-active-popup'
import { collapseSidebar } from 'helpers/ui/company-searcher/sidebar-helper'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { searchData } from 'utils/test-data/company-searcher/search-data'
import { skipProductTourHelper } from 'common/skip-product-tour-helper'
import { skipSurveyHelper } from 'common/skip-survey-helper'
import { Allure } from 'common/allure-helper'
import { skipTutorialHelper } from '../../helpers/common/skip-tutorial-helper'    

test.describe('Company Searcher Smoke Test', () => {
  let companyPage: CompanyPage
  test.beforeEach(async ({ page, baseURL }, testInfo) => {
    await page.goto(baseURL!)
    await skipTutorialHelper(page, testInfo)
    await skipSurveyHelper(page, testInfo)
    await skipProductTourHelper(page, testInfo)
    await page.waitForLoadState('networkidle')
    await addCursorStyleAndScript(page)
    companyPage = new CompanyPage(page)
    await companyPage.companySearcherLink.click()
    await page.waitForTimeout(1000)
    await closeCurrentlyActivePopup(page)
    await collapseSidebar(page)
  })
  // Define the structure of the search data
  interface SearchData {
    searchTerm: string
    expectedResults: string[]
  }
  // Use the imported search data and type it explicitly
  const searchItems: SearchData[] = searchData
  test('Verifying Company page UI Elements to be visible', async ({
    page,
    context,
  }) => {
    companyPage = new CompanyPage(page)
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    Allure.addDescription('Verifying Company page UI Elements to be visible')
    await companyPage.verifyUIElements()
    console.log('All UI Elements are Visible.✔️')
  })

  test('Rows count matches the selected dropdown option', async () => {
    Allure.addSeverity('normal')
    Allure.addDescription('Rows count matches the selected dropdown option')
    const options = await companyPage.getDropdownOptions()
    const mismatches = []
    for (const option of options) {
      const rowCount =
        await companyPage.selectDropdownOptionAndCountRows(option)
      if (rowCount !== parseInt(option, 10)) {
        const errorMessage = `Option "${option}": Expected rows (${option}), Actual rows (${rowCount}) do not match.`
        mismatches.push(errorMessage)
      }
    }
    if (mismatches.length > 0) {
      expect(mismatches).toHaveLength(0) // This will fail the test if there are mismatches
    }
  })

  test('Verify random company search terms', async ({ page }) => {
    Allure.addSeverity('critical');
    Allure.addTag('search');
    Allure.addDescription('Verify search feature with random search terms');  
    // Number of terms to test
    const numberOfTermsToCheck = 2; // Set this to control how many terms to check
    // Helper function to pick random items
    const pickRandomItems = <T>(array: T[], count: number): T[] => {
      return array.sort(() => 0.5 - Math.random()).slice(0, count); // Shuffle and pick random items
    };
    // Pick random search terms
    const randomSearchItems = pickRandomItems(searchItems, numberOfTermsToCheck);  
    for (const { searchTerm } of randomSearchItems) {
      // Perform the search
      await companyPage.performSearch(searchTerm);
      // Fetch search results
      const primaryCells = await companyPage.getSearchResults();
      // Validate that the search term appears in the results
      const termFound = primaryCells.some((result) =>
        result.toLowerCase().includes(searchTerm.toLowerCase())
      );
      expect(termFound).toBeTruthy();
      // Reset search for the next iteration
      await companyPage.resetSearch();
    }
  });

  test('Verify Search, Pagination, and Data Validation with Flexible Page Check', async ({
    page,
  }) => {
    const pickRandomItems = <T>(array: T[], count: number): T[] =>
      array.sort(() => 0.5 - Math.random()).slice(0, count)
    const numberOfSearchTerms = 2 // Number of random search terms to test
    const maxPagesToCheck: number | -1 = 3 // Limit for pages to check (-1 for all)
    const searchItems = pickRandomItems(searchData, numberOfSearchTerms)
    for (const { searchTerm } of searchItems) {
      // Perform the search
      await companyPage.performSearch(searchTerm)
      // Handle pagination
      const { visitedPages, allPageData } =
        await companyPage.handlePagination(maxPagesToCheck)
      // Validation logic
      allPageData.forEach((pageData, index) => {
        if (
          index > 0 &&
          JSON.stringify(allPageData[index - 1]) === JSON.stringify(pageData)
        ) {
          throw new Error(
            `Page ${index + 1} has the same data as Page ${index}.`
          )
        }
      })
      // Reset search for the next term
      await companyPage.resetSearchInput()
      await page.reload(); // Reload the page to reset the search
      await closeCurrentlyActivePopup(page)
      await collapseSidebar(page)
    }
  })

  test('Verify Go-To-Page Functionality', async ({ page }) => {
    const maxPagesToCheck: number | -1 = 5// Set to -1 to check all pages, or a positive number to limit
    const visitedPages = new Set<string>() // Track visited pages to avoid duplicates
    let pagesChecked = 0 // Counter for pages checked
    while (maxPagesToCheck === -1 || pagesChecked < maxPagesToCheck) {
      // Fetch all visible page numbers from the pagination block
      const paginationNumbers = await companyPage.getPaginationNumbers()
      // Filter out pages already visited
      const unvisitedPages = paginationNumbers.filter(
        (page) => !visitedPages.has(page.trim())
      )
      if (unvisitedPages.length === 0) {
        break
      }
      // Pick a random page number to navigate to
      const targetPage =
        unvisitedPages[Math.floor(Math.random() * unvisitedPages.length)]
      // Use the go-to-page functionality
      await page.waitForTimeout(5000)
      await companyPage.goToPage(targetPage)
      // Verify the active page
      const activePageNumber = await companyPage.getActivePageNumber()
      if (activePageNumber !== targetPage.trim()) {
        throw new Error(
          `Expected page: ${targetPage.trim()}, but active page is: ${activePageNumber}`
        )
      }
      // Mark the current page as visited
      visitedPages.add(activePageNumber || '')
      // Increment pages checked counter
      pagesChecked++
    }
  })

  test('Verify Search, Pagination, and Go-to-Page Functionality', async ({
    page,
  }) => {
    Allure.addSeverity('critical')
    Allure.addDescription(
      'Test to validate search, pagination, and go-to-page functionalities.'
    )
    // Helper function to pick random items from an array
    const pickRandomItems = <T>(array: T[], count: number): T[] =>
    array.sort(() => 0.5 - Math.random()).slice(0, count)
    const numberOfSearchTerms = 1 // Adjust as needed
    const maxPagesToCheck: number | -1 = 4// Limit for pages to check (-1 for all)
    const searchItems = pickRandomItems(searchData, numberOfSearchTerms)
    for (const { searchTerm } of searchItems) {
      // Perform the search
      await companyPage.performSearch(searchTerm)

      const visitedPages = new Set<string>() // Track visited pages to avoid duplicates
      let pagesChecked = 0 // Counter for pages checked
      while (maxPagesToCheck === -1 || pagesChecked < maxPagesToCheck) {
        // Fetch all visible page numbers from the pagination block
        const paginationNumbers = await companyPage.getPaginationNumbers()

        // Filter out pages already visited
        const unvisitedPages = paginationNumbers.filter(
          (page) => !visitedPages.has(page.trim())
        )
        if (unvisitedPages.length === 0) {
          break
        }
        // Pick a random page number to navigate to
        const targetPage =
          unvisitedPages[Math.floor(Math.random() * unvisitedPages.length)]
        // Use the go-to-page functionality
        await companyPage.goToPage(targetPage)
        // Verify the active page
        const activePageNumber = await companyPage.getActivePageNumber()

        if (activePageNumber !== targetPage.trim()) {
          continue
        }
        // Mark the current page as visited
        visitedPages.add(activePageNumber || '')
        // Increment pages checked counter
        pagesChecked++
      }
      // Reset for the next search term
      await companyPage.reloadPage()
      await page.waitForLoadState('networkidle')
      await closeCurrentlyActivePopup(page)
      await collapseSidebar(page)
    }
  })

  test('Verify Go to Page Button is Disabled for Already Selected Pages', async ({
    page,
  }) => {
    // Wait for the page to load fully
    await page.waitForTimeout(5000)
    Allure.addSeverity('critical')
    Allure.addDescription(
      'Verify Go to Page Button is Disabled for Already Selected Pages'
    )

    // Get the total count of pages available
    const totalPages = await companyPage.getTotalPages()

    // Ensure there are pages to test
    expect(totalPages).toBeGreaterThan(0)

    // Determine the indices for boundary value analysis
    const pagesToTest = [0] // First page
    if (totalPages > 1) pagesToTest.push(totalPages - 1) // Last page
    if (totalPages > 2) pagesToTest.push(Math.floor(totalPages / 2)) // Middle page

    for (const pageIndex of pagesToTest) {
      // Get the page number from the current pagination element
      const pageNumber = await companyPage.getPageNumberByIndex(pageIndex)

      // Select the page
      await companyPage.selectPageByIndex(pageIndex)

      // Fill the same page number in the "Go to Page" input field
      await companyPage.fillGoToPageInput(pageNumber?.trim() || '')

      // Verify the "Go to Page" button is disabled
      const isButtonDisabled = await companyPage.isGoToPageButtonDisabled()
      expect(isButtonDisabled).toBe(true)
    }

    // Additional test for sequential pages (first 5 or less)
    const pagesToCheck = 5
    const limit = Math.min(pagesToCheck, totalPages)

    for (let i = 0; i < limit; i++) {
      const pageNumber = await companyPage.getPageNumberByIndex(i)

      // Select the page
      await companyPage.selectPageByIndex(i)

      // Fill the same page number in the "Go to Page" input field
      await companyPage.fillGoToPageInput(pageNumber?.trim() || '')

      // Verify the "Go to Page" button is disabled
      const isButtonDisabled = await companyPage.isGoToPageButtonDisabled()
      expect(isButtonDisabled).toBe(true)
    }
  })

  test('Verify Next Page Button Functionality', async ({ page }) => {
    const companyPage = new CompanyPage(page);
   // Allure tags and metadata
   Allure.addSeverity('critical');
   Allure.addTag('navigation');
   Allure.addDescription('Test to verify that clicking the Next button navigates to the next page.');
   Allure.addFeature('Pagination');
    // Configurable variable: number of pages to navigate
    const pagesToNavigate = 5; // Adjust as needed
    // Wait for the page to load fully
    await page.waitForLoadState('networkidle');
    // Get the current active page number
    let currentPageNumber = await companyPage.getActivePageNumber();
    if (!currentPageNumber) {
      throw new Error('Failed to retrieve the current page number.');
    }
    // Parse the current page number as an integer
    let numericCurrentPageNumber = parseInt(currentPageNumber, 10);
    if (isNaN(numericCurrentPageNumber)) {
      throw new Error(`Invalid current page number: "${currentPageNumber}"`);
    }
    // Navigate through the pages
    for (let i = 0; i < pagesToNavigate; i++) {
      // Calculate the expected next page number
      const expectedNextPage = numericCurrentPageNumber + 1;
      // Click the next page button
      await companyPage.clickNextPageButton(expectedNextPage.toString());
      // Verify the new active page number
      const newPageNumber = await companyPage.getActivePageNumber();
      if (!newPageNumber) {
        throw new Error('Failed to retrieve the new active page number.');
      }
      const numericNewPageNumber = parseInt(newPageNumber, 10);
      if (isNaN(numericNewPageNumber)) {
        throw new Error(`Invalid new page number: "${newPageNumber}"`);
      }
      expect(numericNewPageNumber).toBe(expectedNextPage);
      // Update the current page number for the next iteration
      numericCurrentPageNumber = numericNewPageNumber;
    }
  });

  test('Verify Backwards Navigation Functionality', async ({ page }) => {
    const companyPage = new CompanyPage(page);
   // Allure metadata
   Allure.addSeverity('critical');
   Allure.addTag('navigation');
   Allure.addDescription('Test to verify that clicking the "Previous" button navigates to the previous page.');

    // Configurable variable: Number of pages to navigate backwards
    const pagesToNavigateBack = 3;
  
    // Ensure the test starts from a valid page (not page 1)
    const startingPage = 10; // Adjust to a valid starting page number
    await companyPage.goToPage(startingPage);
  
    // Get the current active page number
    let currentPageNumber = await companyPage.getActivePageNumber();
    if (!currentPageNumber) {
      throw new Error('Failed to retrieve the current page number.');
    }
  
    let numericCurrentPageNumber = parseInt(currentPageNumber, 10);
    if (isNaN(numericCurrentPageNumber)) {
      throw new Error(`Invalid current page number: "${currentPageNumber}"`);
    }
    // Navigate backwards through the pages
    for (let i = 0; i < pagesToNavigateBack; i++) {
      // Ensure we are not on page 1
      if (numericCurrentPageNumber <= 1) {
        break;
      }
      // Calculate the expected previous page number
      const expectedPreviousPage = numericCurrentPageNumber - 1;
      // Click the "Previous" button
      await companyPage.clickPreviousPageButton();
      // Verify the new active page number
      const newPageNumber = await companyPage.getActivePageNumber();
      if (!newPageNumber) {
        throw new Error('Failed to retrieve the new active page number.');
      }
      const numericNewPageNumber = parseInt(newPageNumber, 10);
      if (isNaN(numericNewPageNumber)) {
        throw new Error(`Invalid new page number: "${newPageNumber}"`);
      }
      expect(numericNewPageNumber).toBe(expectedPreviousPage);
      console.log(`Successfully navigated back to page: ${numericNewPageNumber}`);
      // Update the current page number for the next iteration
      numericCurrentPageNumber = numericNewPageNumber;
    }
  });
  
  test.only('verify child row label matches expanded rows', async ({ page }) => {
     Allure.addSeverity('critical');
   Allure.addTag('table');
   Allure.addDescription('This test verifies that the number of rows expanded matches the child label for each expandable button in the table.');
    const companyPage = new CompanyPage(page);

    // Get the total number of expandable buttons
    const count = await companyPage.getExpandableButtonCount();
  
    console.log(`Total expandable buttons found with children: ${count}`);
  
    for (let i = 0; i < count; i++) {
      // Extract the expected children count
      const expectedChildren = await companyPage.getExpectedChildrenCount(i);
  
      console.log(`Row ${i} expected children: ${expectedChildren}`);
  
      // Get the initial row count
      const initialRowCount = await companyPage.getRowCount();
  
      // Expand the row
      await companyPage.expandRow(i);
  
      // Wait for the rows to expand
      await companyPage.waitForRowExpansion();
  
      // Get the updated row count
      const expandedRowCount = await companyPage.getRowCount();
  
      console.log(
        `Row ${i} initial count: ${initialRowCount}, expanded count: ${expandedRowCount}, expected children: ${expectedChildren}`
      );
      // Assert the difference matches the label
      expect(expandedRowCount - initialRowCount).toBe(expectedChildren);
  
      // Collapse the row
      await companyPage.collapseRow(i);
    }
});
});