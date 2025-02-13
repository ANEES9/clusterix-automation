import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'

export class CompanyPage {
  private page: Page
  private translations: Record<string, any>

  // Navigation Bar Locators
  public companySearcherLink: Locator
  public topNavBar: Locator
  public searchInput: Locator
  public filterButton: Locator
  public searchButton: Locator
  public tableItemsLabel: Locator
  public saveSearchButton: Locator
  public addCompanyButton: Locator
  public selectItemsCheckbox: Locator
  public additionalButton: Locator

  // Table Locators
  public primaryCell: Locator
  public iconButton: Locator
  public rows: Locator
  public headers: Locator
  public firstRowCells: Locator
  public linkInTable: Locator
  public columnHeader: Locator
  public table: Locator

  // Pagination and Results Per Page
  public resultsPerPageDropdown: Locator
  public dropdownOptions: Locator
  public paginationButtons: Locator
  public goToPageInput: Locator
  public goToPageButton: Locator
  public paginationOptions: Locator
  public activePageLocator: Locator
  public paginationElements: Locator
  public nextPageButton: Locator
  public previousPageButton: Locator
  public dropdownOption: (option: string) => Locator

  //Children Table Locators
  public expandableButtonLocator: Locator
  public childLabelLocator: Locator
  public rowLocator: Locator

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('company-searcher', locale)

     // Initialize Navigation Bar Locators
   // Initialize Navigation Bar Locators
   this.companySearcherLink = page.locator('.c23hNRvdqiyaVUBzNggU>>nth=11');
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
    this.primaryCell = page.locator('.SmartTable-module_primaryCell__YnG6n')
    this.iconButton = page.locator('.O5WoT2424rXsuCi4fFYd')
    this.rows = page.locator('.SmartTable-module_primaryCell__YnG6n')
    this.headers = page.locator('thead th')
    this.firstRowCells = page.locator(
      '.SmartTable-module_primaryCell__YnG6n >> div.SmartTable-module_cellContentWrapper__ppYvz'
    )
    this.linkInTable = page.locator(
      'div.BaseCellWrapper-module_wrapper__XCaQu a'
    )
    this.columnHeader = page.locator('text=Company Name')
    this.table = page.locator('.SmartTable-module_tableWrapper__O2vT5').nth(0)

    // Initialize Pagination and Results Per Page Locators
    this.resultsPerPageDropdown = page.locator('input[readonly][value]')
    this.dropdownOptions = page.locator(
      '.PaginationBar-module_perPageDropdown__Z9QfS div[data-value]'
    )
    this.paginationButtons = page.locator(
      '.PaginationBar-module_barButton__o4GQx'
    )
    this.goToPageInput = page.locator(
      'div.PaginationBar-module_goToPageWrapper__Ub49T input'
    )
    this.goToPageButton = page.locator(
      '.PaginationBar-module_goToPageButton__fcjeK'
    )
    this.paginationOptions = page.locator(
      'PaginationBar-module_settings__4abwR PaginationBar-module_settingsOpen__Tk5pc'
    )
    this.activePageLocator = page.locator(
      '.PaginationBar-module_pages__hF8oC .ca-bg-theme'
    )
    this.paginationElements = page.locator(
      '.PaginationBar-module_pages__hF8oC .ca-whitespace-nowrap'
    )
    this.dropdownOption = (option: string) =>
      page.locator(
        `.PaginationBar-module_perPageDropdown__Z9QfS div[data-value="${option}"]`
      )
    this.nextPageButton = page
      .locator('.PaginationBar-module_barButton__o4GQx')
      .nth(1)
    this.previousPageButton = page
      .locator('.PaginationBar-module_barButton__o4GQx')
      .first()

    //Chlidren Table Locators
    this.expandableButtonLocator = page.locator(
      '.DhYGoNgYdTOkFRc5uGjb.BaseCellWrapper-module_wrapper__XCaQu[role="button"]:has(.ca-font-sans.ca-text-sm.ca-tracking-wide:has-text("Children"))'
    )
    this.childLabelLocator = page.locator(
      '.ca-font-sans.ca-text-sm.ca-tracking-wide'
    )
    this.rowLocator = page.locator('.SmartTable-module_primaryCell__YnG6n')
  }

  async searchCompany(query: string) {
    await this.searchInput.fill(query)
    await this.searchButton.click()
  }

  async validateSearchResults(expectedText: string) {
    await expect(this.primaryCell).toContainText(expectedText)
  }

  async goToPage(targetPage: string | number) {
    const targetPageString =
      typeof targetPage === 'number' ? targetPage.toString() : targetPage.trim()
    await this.paginationButtons.nth(2).click()
    await this.goToPageInput.fill(targetPageString)
    await this.goToPageButton.click()
    await this.page.waitForTimeout(2000)
  }

  async verifyUIElements() {
    await Allure.step('Verify top navigation bar elements', async () => {
      await expect(this.topNavBar).toBeVisible()
      await expect(this.searchInput).toBeVisible()
      await expect(this.searchInput).toHaveAttribute('placeholder', 'Search')
      await expect(this.filterButton).toBeVisible()
      await expect(this.searchButton).toBeVisible()
      await expect(this.tableItemsLabel).toBeVisible()
      await expect(this.saveSearchButton).toBeVisible()
      await expect(this.addCompanyButton).toBeVisible()
      await expect(this.selectItemsCheckbox).toBeVisible()
      await expect(this.additionalButton).toBeVisible()
    })

    await Allure.step('Verify table content', async () => {
      await expect(this.primaryCell.first()).toBeVisible()
    })

    await Allure.step('Verify comment icon button', async () => {
      await expect(this.iconButton.first()).toBeVisible()
    })

    await Allure.step('Verify table headers', async () => {
      const expectedHeaders = [
        'Company Name',
        'Children',
        'Country',
        'Employee Count',
        'Customer Type',
        'Contacts',
      ]
      for (const header of expectedHeaders) {
        const headerLocator = this.headers.locator(`text=${header}`)
        await expect(headerLocator).toBeVisible()
      }
    })
  }

  async selectDropdownOptionAndCountRows(option: string): Promise<number> {
    await this.paginationButtons.nth(2).click()
    await this.resultsPerPageDropdown.click()
    await this.dropdownOption(option).click()
    await this.page.waitForTimeout(2000)
    return this.rows.count()
  }

  async getDropdownOptions(): Promise<string[]> {
    await this.paginationButtons.nth(2).click()
    const options = await this.dropdownOptions.allTextContents()
    await this.paginationButtons.nth(2).click()
    return options
  }

  async performSearch(searchTerm: string) {
    await this.page.waitForTimeout(1000)
    await this.searchInput.fill(searchTerm)
    await this.searchButton.click()
  }

  async resetSearch() {
    await this.searchInput.fill('')
    await this.searchButton.click()
    await this.page.waitForTimeout(1000)
  }

  async getSearchResults(): Promise<string[]> {
    await this.page.waitForTimeout(2000)
    return await this.primaryCell.allTextContents()
  }

  async getPaginationNumbers(): Promise<string[]> {
    await this.page.waitForTimeout(2000)
    return await this.paginationElements.allTextContents()
  }

  async navigateToPage(pageNumber: string) {
    const targetPageElement = this.paginationElements
      .filter({ hasText: pageNumber })
      .first()
    await targetPageElement.click()
    await this.page.waitForTimeout(2000)
  }

  async getActivePageNumber(): Promise<string | undefined> {
    await this.page.waitForTimeout(2000)
    return (await this.activePageLocator.textContent())?.trim()
  }

  async getCurrentPageData(): Promise<string[]> {
    return await this.primaryCell.allTextContents()
  }

  async resetSearchInput() {
    await this.searchInput.fill('')
    await this.searchButton.click()
    await this.page.waitForTimeout(1000)
  }

  async handlePagination(
    maxPagesToCheck: number | -1
  ): Promise<{ visitedPages: Set<string>; allPageData: string[][] }> {
    const visitedPages = new Set<string>()
    const allPageData: string[][] = []
    let pagesChecked = 0

    while (maxPagesToCheck === -1 || pagesChecked < maxPagesToCheck) {
      const paginationNumbers = await this.getPaginationNumbers()
      const unvisitedPages = paginationNumbers.filter(
        (page) => !visitedPages.has(page.trim())
      )

      if (unvisitedPages.length === 0) {
        break
      }

      const targetPage =
        unvisitedPages[Math.floor(Math.random() * unvisitedPages.length)]
      await this.navigateToPage(targetPage)

      const activePageNumber = await this.getActivePageNumber()
      if (activePageNumber !== targetPage.trim()) {
        continue
      }

      const currentPageData = await this.getCurrentPageData()
      allPageData.push(currentPageData)

      visitedPages.add(activePageNumber || '')
      pagesChecked++
    }

    return { visitedPages, allPageData }
  }

  async reloadPage() {
    await this.page.reload()
    await this.page.waitForTimeout(2000)
  }

  async getTotalPages(): Promise<number> {
    return await this.paginationElements.count()
  }

  async getPageNumberByIndex(index: number): Promise<string | null> {
    await this.page.waitForTimeout(2000)
    return await this.paginationElements.nth(index).textContent()
  }

  async selectPageByIndex(index: number) {
    await this.paginationElements.nth(index).click()
    await this.page.waitForTimeout(1000)
  }

  async isGoToPageButtonDisabled(): Promise<boolean> {
    return await this.goToPageButton.evaluate((el) =>
      el.classList.contains('hover:ca-cursor-not-allowed')
    )
  }

  async fillGoToPageInput(pageNumber: string) {
    await this.paginationButtons.nth(2).click()
    await this.goToPageInput.fill(pageNumber)
  }

  async clickNextPageButton(expectedNextPage: string): Promise<void> {
    const isDisabled = await this.nextPageButton.isDisabled()
    if (!isDisabled) {
      await this.nextPageButton.click()
    } else {
      throw new Error('Next button is disabled.')
    }
  }

  async clickPreviousPageButton(): Promise<void> {
    const isDisabled = await this.previousPageButton.isDisabled()
    if (!isDisabled) {
      await this.previousPageButton.click()
    } else {
      throw new Error('Previous button is disabled.')
    }
  }

  // Dynamic locators
  getChildCountLocator(button: Locator): Locator {
    return button.locator(
      '.DhYGoNgYdTOkFRc5uGjb BaseCellWrapper-module_wrapper__XCaQu'
    )
  }

  getExpandedRows(): Locator {
    return this.rows.locator(`[style*="--smart-table-row-depth: 1;"]`)
  }

  // Get the total number of expandable buttons
  public async getExpandableButtonCount(): Promise<number> {
    return await this.expandableButtonLocator.count()
  }

  // Get the expected number of children for a specific row
  public async getExpectedChildrenCount(index: number): Promise<number> {
    const childLabel = await this.expandableButtonLocator
      .nth(index)
      .locator(this.childLabelLocator)
      .innerText()
    return parseInt(childLabel.match(/\d+/)?.[0] || '0', 10)
  }

  // Get the current row count
  public async getRowCount(): Promise<number> {
    return await this.rowLocator.count()
  }

  // Expand a specific row
  public async expandRow(index: number): Promise<void> {
    await this.expandableButtonLocator.nth(index).click()
  }

  // Collapse a specific row
  public async collapseRow(index: number): Promise<void> {
    await this.expandableButtonLocator.nth(index).click()
  }

  // Wait for rows to expand
  public async waitForRowExpansion(): Promise<void> {
    await this.page.waitForTimeout(1000) // Replace with more robust waiting logic if needed
  }
}




//***************************************Filter Components*******************************************************************************

export class FiltersPage {
  private page: Page;

  public countryFilter: Locator;
  public keywordsFilter: Locator;
  public websiteFilter: Locator;
  public numberOfEmployeesFilter: Locator;
  public actionsFilter: Locator;
  public companiesWithoutCampaignsFilter: Locator;
  public customersOfProcessFilter: Locator;
  public clearAllFiltersButton: Locator;
  public applyFilterButton: Locator;
  public nestedcountryDropdown: Locator;

  constructor(page: Page) {
    this.page = page;

    // Initialize locators
    this.countryFilter = this.page.locator('div[aria-label="Country"]');
    this.keywordsFilter = this.page.locator('div[aria-label="Keywords"]');
    this.websiteFilter = this.page.locator('div[aria-label="Website"]');
    this.numberOfEmployeesFilter = this.page.locator('div[aria-label="Number of employees"]');
    this.actionsFilter = this.page.locator('div[aria-label="Actions"]');
    this.companiesWithoutCampaignsFilter = this.page.locator('div[aria-label="Companies without campaigns"]');
    this.customersOfProcessFilter = this.page.locator('div[aria-label="Customers of Process"]');
    this.clearAllFiltersButton = this.page.locator('div[role="button"]:has-text("Clear all filters")');
    this.applyFilterButton = this.page.locator('button:has-text("Apply")');
    this.nestedcountryDropdown = this.page.locator('div[aria-label="Country dropdown"]');
  }

  // Apply Country Filter
  public async applyCountryFilter(country: string) {
    await this.countryFilter.click();
    await this.page.locator(`div[data-ui-element="dropdown-list"] >> text=${country}`).click();
    await this.applyFilterButton.click();
  }

  // Apply Keywords Filter
  public async applyKeywordsFilter(keyword: string) {
    await this.keywordsFilter.click();
    const keywordInput = this.page.locator('input[placeholder="Search for keywords"]');
    await keywordInput.fill(keyword);
    await this.applyFilterButton.click();
  }

  // Apply Website Filter
  public async applyWebsiteFilter() {
    await this.websiteFilter.click();
    await this.applyFilterButton.click();
  }

  // Apply Number of Employees Filter
  public async applyNumberOfEmployeesFilter(range: string) {
    await this.numberOfEmployeesFilter.click();
    await this.page.locator(`text=${range}`).click();
    await this.applyFilterButton.click();
  }

  // Apply Actions Filter
  public async applyActionsFilter(action: string) {
    await this.actionsFilter.click();
    await this.page.locator(`text=${action}`).click();
    await this.applyFilterButton.click();
  }

  // Apply Companies Without Campaigns Filter
  public async applyCompaniesWithoutCampaignsFilter() {
    await this.companiesWithoutCampaignsFilter.click();
    await this.applyFilterButton.click();
  }

  // Apply Customers of Process Filter
  public async applyCustomersOfProcessFilter() {
    await this.customersOfProcessFilter.click();
    await this.applyFilterButton.click();
  }

  // Apply Additional Filters (Handles all available filters)
  public async applyAdditionalFilters() {
    await this.applyCountryFilter('France');
    await this.applyKeywordsFilter('Automation');
    await this.applyWebsiteFilter();
    await this.applyNumberOfEmployeesFilter('50-200');
    await this.applyActionsFilter('Active');
    await this.applyCompaniesWithoutCampaignsFilter();
    await this.applyCustomersOfProcessFilter();
  }

  // Clear All Filters
  public async clearAllFilters() {
    await this.clearAllFiltersButton.click();
  }

  // Verify Filters Reset
  public async verifyFiltersReset() {
    await this.page.waitForTimeout(1000); // Adjust this timeout as per application response time
    const filtersApplied = await this.page.locator('.applied-filter').count();
    if (filtersApplied > 0) {
      throw new Error('Filters were not cleared properly.');
    }
  }

  // Verify All Filters are Visible
  public async verifyAllFiltersVisible() {
    const filters = [
      this.countryFilter,
      this.keywordsFilter,
      this.websiteFilter,
      this.numberOfEmployeesFilter,
      this.actionsFilter,
      this.companiesWithoutCampaignsFilter,
      this.customersOfProcessFilter,
    ];
    for (const filter of filters) {
      await expect(filter).toBeVisible();
    }
  }
  public async openCountryDropdown(): Promise<void> {
    await this.nestedcountryDropdown.click(); // Click to open the dropdown
  }



  public async selectRandomCountryFromDropdown(): Promise<string> {
    // Open the country dropdown
    await this.openCountryDropdown();

    // Wait for the dropdown options to appear
    const dropdownVisible = this.page.locator('.ljYmaf0oxECrqq3P3FPK.ca-max-h-64.ca-overflow-auto.ca-inno-scroll.ca-py-aqua');
    await expect(dropdownVisible).toBeVisible();

    // Get all visible country options
    const countryOptions = await dropdownVisible.locator('.ca-font-sans.ca-text-base').allTextContents();

    // Ensure there are options to select
    if (countryOptions.length === 0) {
        throw new Error('No country options available in the dropdown.');
    }

    // Randomly pick a country from the options
    const randomIndex = Math.floor(Math.random() * countryOptions.length);
    const selectedCountry = countryOptions[randomIndex];

    // Click the randomly selected country
    const countryLocator = dropdownVisible.locator(`.ca-font-sans.ca-text-base:has-text("${selectedCountry}")`);
    await countryLocator.scrollIntoViewIfNeeded();
    await countryLocator.click();
    // Return the selected country for verification or logging
    return selectedCountry;
}

public async verifySelectedCountry(selectedCountry: string): Promise<void> {
  // Locator for the dropdown element
  const dropdownLocator = this.page.locator(`input[placeholder="${selectedCountry}"]`);

  // Verify that the dropdown has the selected country as a placeholder
  await expect(dropdownLocator).toHaveAttribute('placeholder', selectedCountry);


}

}
  





