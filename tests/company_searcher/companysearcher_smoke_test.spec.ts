import { test, expect } from '@playwright/test';
import { CompanyPage } from 'pages/companysearcher/Company-Page';
import { closeCurrentlyActivePopup } from '../../helpers/company_searcher_helpers/currentlyactivepopup';
import { collapseSidebar } from '../../helpers/company_searcher_helpers/collapseSidebar';
import { addCursorStyleAndScript } from '../../helpers/common/cursor-helper';
import chalk from 'chalk';
import { searchData } from '../../utils/companysearcher/searchdata';
import { closeProductTour } from 'common/product-tour-helper'
import { skipSurvey } from 'common/skip-survey';
import { Allure } from 'common/allure-helper';

const printStep = (step:string) => console.log(chalk.blue.bold(`\n${step}\n`));
const printSuccess = (message: string) => console.log(chalk.green(`✔️ ${message}`));
const printWarning = (message: string) => console.warn(chalk.yellow(`⚠️ ${message}`));
const printError = (message: string) => console.error(chalk.red(`❌ ${message}`));
const separator = chalk.gray('==========');


test.describe('Company Searcher Smoke Test', () => {
  let companyPage: CompanyPage;
  test.beforeEach(async ({ page, baseURL }) => {
    
    await page.goto(baseURL!);
    await skipSurvey (page);
    printSuccess('Survey pop-up closed. ');
    await closeProductTour (page);
    printSuccess('Product Tour Closed');
    await page.waitForLoadState('networkidle');
    await addCursorStyleAndScript(page);
    companyPage = new CompanyPage(page);
    await companyPage.companySearcherLink.click();
    await page.waitForTimeout(20000);
    printSuccess('Page loaded successfully.');
    await closeCurrentlyActivePopup(page);
    printSuccess('Active pop-ups closed.');
    await collapseSidebar(page);
    printSuccess('Sidebar collapsed.');
  });

    // Define the structure of the search data
interface SearchData {
  searchTerm: string;
  expectedResults: string[];
}
// Use the imported search data and type it explicitly
const searchItems: SearchData[] = searchData;


  test('Verifying Company page UI Elements to be visible', async ({ page, context }) => {
    companyPage = new CompanyPage(page); 
        Allure.addSeverity('critical')
        Allure.addTag('smoke')
        Allure.addDescription(
          'Verifying Company page UI Elements to be visible'
        )  
      console.log(separator);
      // Step 1: Navigate to the "Company Searcher" page
      await companyPage.verifyUIElements();
      console.log(separator);
      console.log('All UI Elements are Visible.✔️');
      console.log(separator);
  });

  test('Rows count matches the selected dropdown option', async () => {
    printStep('Retrieve dropdown options');
    Allure.addSeverity('normal')
        Allure.addDescription(
          'Rows count matches the selected dropdown option'
        )  
    const options = await companyPage.getDropdownOptions();
    printSuccess(`Dropdown options retrieved: ${options.join(', ')}`);

    const mismatches: string[] = [];

    for (const option of options) {
      printStep(`Testing dropdown option "${option}"`);

      const rowCount = await companyPage.selectDropdownOptionAndCountRows(option);

      if (rowCount !== parseInt(option, 10)) {
        const errorMessage = `Option "${option}": Expected rows (${option}), Actual rows (${rowCount}) do not match.`;
        printError(errorMessage);
        mismatches.push(errorMessage);
      } else {
       console.log(`Option "${option}": Expected rows (${option}), Actual rows (${rowCount}) match.`);
      }
    }

    if (mismatches.length > 0) {
      console.error('Test completed with mismatches:');
      mismatches.forEach((mismatch) => console.error(mismatch));
      expect(mismatches).toHaveLength(0); // This will fail the test if there are mismatches
    } else {
      console.log('All dropdown options validated successfully.');
    }
  });
   
  

  test('Verify random company search terms', async ({ page }) => {
    Allure.addSeverity('critical')
    Allure.addTag('search')
    Allure.addDescription(
      'Verify seacrch feature with random search terms'
    )  

    // Helper function to pick random items
    const pickRandomItems = (array: any[], count: number) => {
      return array.sort(() => 0.5 - Math.random()).slice(0, count); // Shuffle and pick random items
    };

    // Step 2: Test search functionality with random terms
    printStep('Step 2: Testing search functionality with random search terms');
    for (const { searchTerm } of searchItems) {
      printStep(`Testing search functionality with term: "${searchTerm}"`);

      // Perform the search
      await companyPage.performSearch(searchTerm);

      // Fetch search results
      const primaryCells = await companyPage.getSearchResults();
      printSuccess(`Search Results: ${primaryCells.join(', ')}`);

      // Validate that the search term appears in the results
      const termFound = primaryCells.some((result) =>
        result.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (termFound) {
        printSuccess(`Search term "${searchTerm}" found in the results.`);
      } else {
        printWarning(`Search term "${searchTerm}" not found in the results.`);
      }

      expect(termFound).toBeTruthy();

      // Reset search for the next iteration
      await companyPage.resetSearch();
      console.log(separator);
    }
    printStep('Test completed successfully. ✔️');
    console.log(separator);
  });

  test('Verify Search, Pagination, and Data Validation with Flexible Page Check', async ({ page }) => {
    const pickRandomItems = <T>(array: T[], count: number): T[] =>
      array.sort(() => 0.5 - Math.random()).slice(0, count);

    const numberOfSearchTerms = 5; // Number of random search terms to test
    const maxPagesToCheck: number | -1 = 3; // Limit for pages to check (-1 for all)

    const searchItems = pickRandomItems(searchData, numberOfSearchTerms);

    console.log('Step 1: Testing search and pagination with flexible page checking');

    for (const { searchTerm } of searchItems) {
      console.log(`Testing search term: "${searchTerm}"`);

      // Perform the search
      await companyPage.performSearch(searchTerm);

      // Handle pagination
      const { visitedPages, allPageData } = await companyPage.handlePagination(maxPagesToCheck);

      // Validation logic
      console.log(`Visited Pages: ${Array.from(visitedPages).join(', ')}`);


      allPageData.forEach((pageData, index) => {
        console.log(`Page ${index + 1} Data: ${pageData.join(', ')}`);
     

        if (index > 0 && JSON.stringify(allPageData[index - 1]) === JSON.stringify(pageData)) {
          console.warn(`Page ${index + 1} has the same data as Page ${index}.`);
      
        } else {
          console.log(`Page ${index + 1} data is unique.`);
   
        }
      });

      // Reset search for the next term
      await companyPage.resetSearchInput();
      console.log(separator);
    }

    console.log('Test completed successfully.');
  });



  test('Verify Go-To-Page Functionality', async ({ page }) => {
    const maxPagesToCheck: number | -1 = 8; // Set to -1 to check all pages, or a positive number to limit

    console.log('Step 1: Testing go-to-page functionality without search.');
 

    let visitedPages = new Set<string>(); // Track visited pages to avoid duplicates
    let pagesChecked = 0; // Counter for pages checked

    while (maxPagesToCheck === -1 || pagesChecked < maxPagesToCheck) {
      // Fetch all visible page numbers from the pagination block
      const paginationNumbers = await companyPage.getPaginationNumbers();

      // Filter out pages already visited
      const unvisitedPages = paginationNumbers.filter((page) => !visitedPages.has(page.trim()));

      if (unvisitedPages.length === 0) {
        console.log('No more unvisited pages. Exiting loop.');
        break;
      }

      // Pick a random page number to navigate to
      const targetPage = unvisitedPages[Math.floor(Math.random() * unvisitedPages.length)];
      console.log(`Navigating to random page: ${targetPage.trim()}`);

      // Use the go-to-page functionality
      await companyPage.goToPage(targetPage);

      // Verify the active page
      const activePageNumber = await companyPage.getActivePageNumber();

      if (activePageNumber !== targetPage.trim()) {
        console.warn(`Expected page: ${targetPage.trim()}, but active page is: ${activePageNumber}`);
        continue;
      }

      console.log(`Currently on page: ${activePageNumber}`);

      // Mark the current page as visited
      visitedPages.add(activePageNumber || '');

      // Increment pages checked counter
      pagesChecked++;
    }

    console.log('Go-to-page navigation test completed successfully.');
    console.log(separator);
  });


  test('Verify Search, Pagination, and Go-to-Page Functionality', async ({ page }) => {
    Allure.addSeverity('critical');
    Allure.addDescription('Test to validate search, pagination, and go-to-page functionalities.');

    // Helper function to pick random items from an array
    const pickRandomItems = <T>(array: T[], count: number): T[] =>
      array.sort(() => 0.5 - Math.random()).slice(0, count);

    const numberOfSearchTerms = 3; // Adjust as needed
    const maxPagesToCheck: number | -1 = 3; // Limit for pages to check (-1 for all)

    const searchItems = pickRandomItems(searchData, numberOfSearchTerms);
    console.log('Step 1: Testing search, pagination, and go-to-page functionality.');

    for (const { searchTerm } of searchItems) {
      console.log(`Testing search term: "${searchTerm}"`);

      // Perform the search
      await companyPage.performSearch(searchTerm);

      let visitedPages = new Set<string>(); // Track visited pages to avoid duplicates
      let pagesChecked = 0; // Counter for pages checked

      while (maxPagesToCheck === -1 || pagesChecked < maxPagesToCheck) {
        // Fetch all visible page numbers from the pagination block
        const paginationNumbers = await companyPage.getPaginationNumbers();

        // Filter out pages already visited
        const unvisitedPages = paginationNumbers.filter((page) => !visitedPages.has(page.trim()));

        if (unvisitedPages.length === 0) {
     
          console.log('No more unvisited pages. Exiting loop.');
          break;
        }

        // Pick a random page number to navigate to
        const targetPage = unvisitedPages[Math.floor(Math.random() * unvisitedPages.length)];

        console.log(`Navigating to random page: ${targetPage.trim()}`);

        // Use the go-to-page functionality
        await companyPage.goToPage(targetPage);

        // Verify the active page
        const activePageNumber = await companyPage.getActivePageNumber();

        if (activePageNumber !== targetPage.trim()) {
          console.warn(`Expected page: ${targetPage.trim()}, but active page is: ${activePageNumber}`);
          continue;
        }

        console.log(`Currently on page: ${activePageNumber}`);

        // Mark the current page as visited
        visitedPages.add(activePageNumber || '');

        // Increment pages checked counter
        pagesChecked++;
      }

     console.log('Resetting the page for the next search term.');
      // Reset for the next search term
      await companyPage.reloadPage();
    await page.waitForLoadState('networkidle');
      await closeCurrentlyActivePopup(page);
      printSuccess('Active pop-ups closed.');
      await collapseSidebar(page);
      printSuccess('Sidebar collapsed.');
      console.log(separator);
    }

 
    console.log('Test completed successfully.');
    console.log(separator);
  });

  test.only('Verify Go to Page Button is Disabled for Already Selected Pages', async ({ page }) => {
    // Wait for the page to load fully
    await page.waitForTimeout(5000);
    Allure.addSeverity('critical');
    Allure.addDescription('Verify Go to Page Button is Disabled for Already Selected Pages');
    // Get the total count of pages available
    const totalPages = await companyPage.getTotalPages();

    // Ensure there are pages to test
    expect(totalPages).toBeGreaterThan(0);

    // Determine the indices for boundary value analysis
    const pagesToTest = [0]; // First page
    if (totalPages > 1) pagesToTest.push(totalPages - 1); // Last page
    if (totalPages > 2) pagesToTest.push(Math.floor(totalPages / 2)); // Middle page

    for (const pageIndex of pagesToTest) {
      // Get the page number from the current pagination element
      const pageNumber = await companyPage.getPageNumberByIndex(pageIndex);
      console.log(`Testing page: ${pageNumber?.trim()} at index: ${pageIndex}`);

      // Select the page
      await companyPage.selectPageByIndex(pageIndex);

      // Fill the same page number in the "Go to Page" input field
      await companyPage.fillGoToPageInput(pageNumber?.trim() || '');

      // Verify the "Go to Page" button is disabled
      const isButtonDisabled = await companyPage.isGoToPageButtonDisabled();
      expect(isButtonDisabled).toBe(true);
      console.log(`Go to Page button is disabled for already selected page: ${pageNumber?.trim()}`);
    }

    // Additional test for sequential pages (first 5 or less)
    const pagesToCheck = 5;
    const limit = Math.min(pagesToCheck, totalPages);

    for (let i = 0; i < limit; i++) {
      const pageNumber = await companyPage.getPageNumberByIndex(i);
      console.log(`Testing sequential page: ${pageNumber?.trim()} at index: ${i}`);

      // Select the page
      await companyPage.selectPageByIndex(i);

      // Fill the same page number in the "Go to Page" input field
      await companyPage.fillGoToPageInput(pageNumber?.trim() || '');

      // Verify the "Go to Page" button is disabled
      const isButtonDisabled = await companyPage.isGoToPageButtonDisabled();
      expect(isButtonDisabled).toBe(true);
      console.log(`Go to Page button is disabled for already selected page: ${pageNumber?.trim()}`);
    }

    console.log(separator);
    console.log('Test completed successfully.');
  });










});