import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'


// Class representing the Company Page
export class CompanyPage {
  private page: Page;
  // Navigation Bar Locators
  public companySearcherLink: Locator; // Link to the Company Searcher page
  public topNavBar: Locator; // Top navigation bar locator
  public searchInput: Locator; // Search input field locator
  public filterButton: Locator; // Filter button locator
  public searchButton: Locator; // Search button locator
  public tableItemsLabel: Locator; // Label showing the number of table items
  public saveSearchButton: Locator; // Button to save the current search
  public addCompanyButton: Locator; // Button to add a new company
  public selectItemsCheckbox: Locator; // Checkbox to select items in the table
  public additionalButton: Locator; // Additional settings button

  // Table Locators
  public primaryCells: Locator; // Primary cells in the table
  public iconButton: Locator; // Icon button within table rows
  public rows: Locator; // All rows in the table
  public headers: Locator; // Table headers
  public firstRowCells: Locator; // Cells in the first row of the table
  public linkInTable: Locator; // Links within table cells
  public columnHeader: Locator; // Locator for the "Company Name" column header
  public table: Locator; // Main table locator

  // Pagination and Results Per Page
  public resultsPerPageDropdown: Locator; // Dropdown to select results per page
  public dropdownOptions: Locator; // Options in the dropdown
  public paginationButtons: Locator; // Pagination buttons
  public goToPageInput: Locator; // Input field for page navigation
  public goToPageButton: Locator; // Button to confirm page navigation
  public paginationOptions: Locator; // Options in the pagination settings
  public activePageLocator: Locator; // Locator for the active page
  public paginationElements: Locator; // All pagination elements
  public dropdownOption: (option: string) => Locator; // Function to get a specific dropdown option
 

  // Constructor to initialize the locators
  constructor(page: Page) {
    this.page = page;

    // Initialize Navigation Bar Locators
    this.companySearcherLink = page.getByRole('link', { name: 'Company Searcher Find the' });
    this.topNavBar = page.locator('section[data-testid="app-searchbar"]');
    this.searchInput = page.locator('input[name="query"]');
    this.filterButton = page.locator('.PartWrapper-module_partWrapper__I8EIP').nth(1);
    this.searchButton = page.locator('.PartWrapper-module_partWrapper__I8EIP').nth(2);
    this.tableItemsLabel = page.locator('.PartWrapper-module_partWrapper__I8EIP.ItemCountLabel-module_itemCountLabel__h2sTJ');
    this.saveSearchButton = page.locator('button[aria-label="Save search"]');
    this.addCompanyButton = page.locator('button:has(svg path[d="M8 0C7.6 0 6.9 0 6 0V6H0V8H6V14H8V8H14V6H8V0Z"])');
    this.selectItemsCheckbox = page.locator('button[role="checkbox"]');
    this.additionalButton = page.locator('button:has(svg path[d="M6 9L4.6 7.6L2 10.2V6.9H0V13.7H6.8V11.7H3.4L6 9ZM6.9 0V2H10.2L7.6 4.6L9 6L11.6 3.4V6.7H13.6V0H6.9Z"])');

    // Initialize Table Locators
    this.primaryCells = page.locator('.SmartTable-module_primaryCell__YnG6n');
    this.iconButton = page.locator('.O5WoT2424rXsuCi4fFYd');
    this.rows = page.locator('.SmartTable-module_primaryCell__YnG6n');
    this.headers = page.locator('thead th');
    this.firstRowCells = page.locator('.SmartTable-module_primaryCell__YnG6n >> div.SmartTable-module_cellContentWrapper__ppYvz');
    this.linkInTable = page.locator('div.BaseCellWrapper-module_wrapper__XCaQu a');
    this.columnHeader = page.locator('text=Company Name');
    this.table = page.locator('.SmartTable-module_tableWrapper__O2vT5').nth(0);

    // Initialize Pagination and Results Per Page Locators
    this.resultsPerPageDropdown = page.locator('input[readonly][value]');
    this.dropdownOptions = page.locator('.PaginationBar-module_perPageDropdown__Z9QfS div[data-value]');
    this.paginationButtons = page.locator('.PaginationBar-module_barButton__o4GQx');
    this.goToPageInput = page.locator('div.PaginationBar-module_goToPageWrapper__Ub49T input');
    this.goToPageButton = page.locator('.PaginationBar-module_goToPageButton__fcjeK');
    this.paginationOptions = page.locator('PaginationBar-module_settings__4abwR PaginationBar-module_settingsOpen__Tk5pc');
    this.activePageLocator = page.locator('.PaginationBar-module_pages__hF8oC .ca-bg-theme');
    this.paginationElements = page.locator('.PaginationBar-module_pages__hF8oC .ca-whitespace-nowrap');
    this.dropdownOption = (option: string) => page.locator(`.PaginationBar-module_perPageDropdown__Z9QfS div[data-value="${option}"]`);
  

  }

  // Method to search for a company using the search input
  async searchCompany(query: string) {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  // Method to validate search results contain the expected text
  async validateSearchResults(expectedText: string) {
    await expect(this.primaryCells).toContainText(expectedText);
  }

  // Method to navigate to a specific page using the pagination input
  async goToPage(targetPage: string | number) {
    const targetPageString = typeof targetPage === 'number' ? targetPage.toString() : targetPage.trim();

    await this.paginationButtons.nth(2).click(); // Open pagination input
    await this.goToPageInput.fill(targetPageString);
    await this.goToPageButton.click();
    await this.page.waitForTimeout(2000); // Wait for navigation
  }

  // Method to verify the top navigation bar elements and table content
  async verifyUIElements() {
    await Allure.step('Verify top navigation bar elements', async () => {
      await expect(this.topNavBar).toBeVisible();
      console.log('Top navigation bar is visible.');
      await expect(this.searchInput).toBeVisible();
      console.log('Search input is visible.');
      await expect(this.searchInput).toHaveAttribute('placeholder', 'Search');
      console.log('Search input has the correct placeholder text.');
      await expect(this.filterButton).toBeVisible();
      console.log('Filter button is visible.');
      await expect(this.searchButton).toBeVisible();
      console.log('Search button is visible.');
      await expect(this.tableItemsLabel).toBeVisible();
      console.log('Table items label is visible.');
      await expect(this.tableItemsLabel).toHaveText(/Table Items/);
      console.log('Table items label text is correct.');
      await expect(this.saveSearchButton).toBeVisible();
      console.log('Save search button is visible.');
      await expect(this.addCompanyButton).toBeVisible();
      console.log('Add company button is visible.');
      await expect(this.selectItemsCheckbox).toBeVisible();
      console.log('Select items checkbox is visible.');
      await expect(this.additionalButton).toBeVisible();
      console.log('Additional button is visible.');
    });

    await Allure.step('Verify table content', async () => {
      await expect(this.primaryCells.first()).toBeVisible();
      console.log('Primary cell in the table is visible.');
    });

    await Allure.step('Verify comment icon button', async () => {
      await expect(this.iconButton.first()).toBeVisible();
      console.log('Comment icon button is visible.');
    });

    await Allure.step('Verify table headers', async () => {
      const expectedHeaders = ['Company Name', 'Children', 'Country', 'Employee Count', 'Customer Type', 'Contacts'];
      for (const header of expectedHeaders) {
        const headerLocator = this.headers.locator(`text=${header}`);
        await expect(headerLocator).toBeVisible();
        console.log(`Header "${header}" is visible.`);
      }
    });

    console.log('All UI Elements are verified successfully.✔️');
  }

// Method to select a dropdown option and count rows
  async selectDropdownOptionAndCountRows(option: string): Promise<number> {
    await this.paginationButtons.nth(2).click(); // Open dropdown
    await this.resultsPerPageDropdown.click();
    await this.dropdownOption(option).click();
    await this.page.waitForTimeout(2000); // Wait for rows to update
    return this.rows.count(); // Return the count of rows
  }
  // Method to retrieve dropdown options
  async getDropdownOptions(): Promise<string[]> {
    await this.paginationButtons.nth(2).click(); // Open dropdown
    const options = await this.dropdownOptions.allTextContents();
    await this.paginationButtons.nth(2).click(); // Close dropdown
    return options;
  }


// Method to perform a search
async performSearch(searchTerm: string) {
  await this.searchInput.fill(searchTerm);
  await this.searchButton.click();
  await this.page.waitForTimeout(2000); // Wait for results to load
}

// Method to reset the search input
async resetSearch() {
  await this.searchInput.fill('');
  await this.searchButton.click();
  await this.page.waitForTimeout(1000); // Wait for reset to complete
}

// Method to fetch all search results
async getSearchResults(): Promise<string[]> {
  return await this.primaryCells.allTextContents();
}


// Method to fetch all pagination numbers
async getPaginationNumbers(): Promise<string[]> {
  return await this.paginationElements.allTextContents();
}

// Method to navigate to a specific page
async navigateToPage(pageNumber: string) {
  const targetPageElement = this.paginationElements.filter({ hasText: pageNumber }).first();
  await targetPageElement.click();
  await this.page.waitForTimeout(2000);
}

// Method to get active page number
async getActivePageNumber(): Promise<string | undefined> {
  return (await this.activePageLocator.textContent())?.trim();
}

// Method to fetch current page data
async getCurrentPageData(): Promise<string[]> {
  return await this.primaryCells.allTextContents();
}

// Method to reset search input
async resetSearchInput() {
  await this.searchInput.fill('');
  await this.searchButton.click();
  await this.page.waitForTimeout(1000);
}

// Method to handle pagination
async handlePagination(maxPagesToCheck: number | -1): Promise<{ visitedPages: Set<string>; allPageData: string[][]; }> {
  let visitedPages = new Set<string>();
  let allPageData: string[][] = [];
  let pagesChecked = 0;

  while (maxPagesToCheck === -1 || pagesChecked < maxPagesToCheck) {
    const paginationNumbers = await this.getPaginationNumbers();
    const unvisitedPages = paginationNumbers.filter((page) => !visitedPages.has(page.trim()));

    if (unvisitedPages.length === 0) {
      break;
    }

    const targetPage = unvisitedPages[Math.floor(Math.random() * unvisitedPages.length)];
    await this.navigateToPage(targetPage);

    const activePageNumber = await this.getActivePageNumber();
    if (activePageNumber !== targetPage.trim()) {
      continue;
    }

    const currentPageData = await this.getCurrentPageData();
    allPageData.push(currentPageData);

    visitedPages.add(activePageNumber || '');
    pagesChecked++;
  }

  return { visitedPages, allPageData };
}

async reloadPage() {
  await this.page.reload();
  await this.page.waitForTimeout(3000); // Wait for page to reload
}



 // Method to get total pages
 async getTotalPages(): Promise<number> {
  return await this.paginationElements.count();
}

// Method to get page number text by index
async getPageNumberByIndex(index: number): Promise<string | null> {
  return await this.paginationElements.nth(index).textContent();
}

// Method to select a page by index
async selectPageByIndex(index: number) {
  await this.paginationElements.nth(index).click();
  await this.page.waitForTimeout(1000); // Wait for selection to take effect
}

// Method to check if the "Go to Page" button is disabled
async isGoToPageButtonDisabled(): Promise<boolean> {
  return await this.goToPageButton.evaluate((el) => el.classList.contains('hover:ca-cursor-not-allowed'));
}

// Method to fill "Go to Page" input field
async fillGoToPageInput(pageNumber: string) {
  await this.paginationButtons.nth(2).click(); // Open input
  await this.goToPageInput.fill(pageNumber);
}
}






















