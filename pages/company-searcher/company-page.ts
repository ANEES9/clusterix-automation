import { al } from '@faker-js/faker/dist/airline-BnpeTvY9'
import { Page, Locator, expect } from '@playwright/test'
import { all } from 'axios'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { closeCurrentlyActivePopup } from 'ui/company-searcher/currently-active-popup'
import { collapseSidebar } from 'ui/company-searcher/sidebar-helper'

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
    this.companySearcherLink = page.locator('.c23hNRvdqiyaVUBzNggU>>nth=11')
    this.topNavBar = page.locator('section[data-testid="app-searchbar"]')
    this.searchInput = page.locator('input[name="query"]')
    this.filterButton = page
      .locator('.PartWrapper-module_partWrapper__I8EIP')
      .nth(1)
    this.searchButton = page
      .locator('.PartWrapper-module_partWrapper__I8EIP')
      .nth(2)
    this.tableItemsLabel = page.locator(
      '.PartWrapper-module_partWrapper__I8EIP.ItemCountLabel-module_itemCountLabel__h2sTJ'
    )
    this.saveSearchButton = page.locator('button[aria-label="Save search"]')
    this.addCompanyButton = page.locator(
      'button:has(svg path[d="M8 0C7.6 0 6.9 0 6 0V6H0V8H6V14H8V8H14V6H8V0Z"])'
    )
    this.selectItemsCheckbox = page.locator('button[role="checkbox"]')
    this.additionalButton = page.locator(
      'button:has(svg path[d="M6 9L4.6 7.6L2 10.2V6.9H0V13.7H6.8V11.7H3.4L6 9ZM6.9 0V2H10.2L7.6 4.6L9 6L11.6 3.4V6.7H13.6V0H6.9Z"])'
    )

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

  async naviagtetoCompanySearcher() {
    this.companySearcherLink.click()
    await this.primaryCell.first().waitFor({ state: 'visible' })
  }

  async searchCompany(query: string) {
    await Allure.step(`Search for company: ${query}`, async () => {
      await this.searchInput.fill(query)
      await this.searchButton.click()
    })
  }

  async validateSearchResults(expectedText: string) {
    await Allure.step(
      `Validate search results for: ${expectedText}`,
      async () => {
        await expect(this.primaryCell).toContainText(expectedText)
      }
    )
  }

  async goToPage(targetPage: string | number) {
    await Allure.step(`Go to page: ${targetPage}`, async () => {
      const targetPageString =
        typeof targetPage === 'number'
          ? targetPage.toString()
          : targetPage.trim()
      await this.paginationButtons.nth(2).click()
      await this.goToPageInput.fill(targetPageString)
      await this.goToPageButton.click()
      await this.page.waitForLoadState('networkidle')
    })
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
    await Allure.step(`Select dropdown option: ${option}`, async () => {
      await this.paginationButtons.nth(2).click()
      await this.resultsPerPageDropdown.click()
      await this.dropdownOption(option).click()
      await this.rows.nth(1).waitFor({ state: 'visible' })
    })
    return this.rows.count()
  }

  async getDropdownOptions(): Promise<string[]> {
    await this.paginationButtons.nth(2).click()
    const options = await this.dropdownOptions.allTextContents()
    await this.paginationButtons.nth(2).click()
    return options
  }

  async performSearch(searchTerm: string): Promise<void> {
    await Allure.step(`Perform search for: ${searchTerm}`, async () => {
      await this.page.waitForSelector('.SmartTable-module_primaryCell__YnG6n')
      await this.searchInput.fill(searchTerm)
      await this.searchButton.click()
    })
  }

  async resetSearch() {
    await Allure.step('Reset search', async () => {
      await this.searchInput.fill('')
      await this.searchButton.click()
    })
  }
  async reloadAndResetSearch() {
    await Allure.step('Reload and reset search', async () => {
      await this.page.reload()
      await this.page.waitForLoadState('networkidle')
      await closeCurrentlyActivePopup(this.page)
      await collapseSidebar(this.page)
    })
  }

  async getSearchResults(): Promise<string[]> {
    await Allure.step('Get search results', async () => {
      await this.page.waitForTimeout(3000)
    })
    return await this.primaryCell.allTextContents()
  }

  async getPaginationNumbers(): Promise<string[]> {
    await Allure.step('Get pagination numbers', async () => {
      await this.paginationElements.nth(0).waitFor({ state: 'visible' })
    })
    return await this.paginationElements.allTextContents()
  }

  async navigateToPage(pageNumber: string) {
    await Allure.step(`Navigate to page: ${pageNumber}`, async () => {
      const targetPageElement = this.paginationElements
        .filter({ hasText: pageNumber })
        .first()
      await targetPageElement.click()
    })
  }

  async getActivePageNumber(): Promise<string | undefined> {
    await this.activePageLocator.waitFor({ state: 'visible' })
    return (await this.activePageLocator.textContent())?.trim()
  }

  async getCurrentPageData(): Promise<string[]> {
    await Allure.step('Get current page data', async () => {})
    return await this.primaryCell.allTextContents()
  }

  async resetSearchInput() {
    await Allure.step('Reset search input', async () => {
      await this.searchInput.fill('')
      await this.searchButton.click()
      await this.page.waitForTimeout(1000)
    })
  }

  async handlePagination(
    maxPagesToCheck: number | -1
  ): Promise<{ visitedPages: Set<string>; allPageData: string[][] }> {
    const visitedPages = new Set<string>()
    const allPageData: string[][] = []
    let pagesChecked = 0

    while (maxPagesToCheck === -1 || pagesChecked < Number(maxPagesToCheck)) {
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
    await Allure.step('Reload page', async () => {
      await this.page.reload()
      await this.page.waitForTimeout(2000)
    })
  }

  async getTotalPages(): Promise<number> {
    await Allure.step('Get total pages', async () => {})
    return await this.paginationElements.count()
  }

  async getPageNumberByIndex(index: number): Promise<string | null> {
    await Allure.step(`Get page number by index: ${index}`, async () => {})
    await this.page.waitForTimeout(2000)
    return await this.paginationElements.nth(index).textContent()
  }

  async selectPageByIndex(index: number) {
    await Allure.step(`Select page by index: ${index}`, async () => {})
    await this.paginationElements.nth(index).click()
    await this.page.waitForTimeout(1000)
  }

  async isGoToPageButtonDisabled(): Promise<boolean> {
    await Allure.step('Check if Go to Page button is disabled', async () => {})
    return await this.goToPageButton.evaluate((el) =>
      el.classList.contains('hover:ca-cursor-not-allowed')
    )
  }

  async fillGoToPageInput(pageNumber: string) {
    await Allure.step(
      `Fill Go to Page input with: ${pageNumber}`,
      async () => {}
    )
    await this.paginationButtons.nth(2).click()
    await this.goToPageInput.fill(pageNumber)
  }

  async clickNextPageButton(expectedNextPage: string): Promise<void> {
    await Allure.step(
      `Click Next Page button for page: ${expectedNextPage}`,
      async () => {}
    )
    const isDisabled = await this.nextPageButton.isDisabled()
    if (!isDisabled) {
      await this.nextPageButton.click()
    } else {
      throw new Error('Next button is disabled.')
    }
  }

  async clickPreviousPageButton(): Promise<void> {
    await Allure.step('Click Previous Page button', async () => {})
    const isDisabled = await this.previousPageButton.isDisabled()
    if (!isDisabled) {
      await this.previousPageButton.click()
    } else {
      throw new Error('Previous button is disabled.')
    }
  }

  // Dynamic locators
  async getChildCountLocator(button: Locator): Promise<Locator> {
    await Allure.step('Get child count locator', async () => {})
    return button.locator(
      '.DhYGoNgYdTOkFRc5uGjb BaseCellWrapper-module_wrapper__XCaQu'
    )
  }

  getExpandedRows(): Locator {
    return this.rows.locator(`[style*="--smart-table-row-depth: 1"]`)
  }

  // Get the total number of expandable buttons
  public async getExpandableButtonCount(): Promise<number> {
    await Allure.step('Get expandable button count', async () => {})
    return await this.expandableButtonLocator.count()
  }

  // Get the expected number of children for a specific row
  public async getExpectedChildrenCount(index: number): Promise<number> {
    await Allure.step(
      `Get expected children count for row: ${index}`,
      async () => {}
    )
    const childLabel = await this.expandableButtonLocator
      .nth(index)
      .locator(this.childLabelLocator)
      .innerText()
    return parseInt(childLabel.match(/\d+/)?.[0] || '0', 10)
  }

  // Get the current row count
  public async getRowCount(): Promise<number> {
    await Allure.step('Get row count', async () => {})
    return await this.rowLocator.count()
  }
  async moveToNextPage(): Promise<boolean> {
    await Allure.step('Move to next page', async () => {})
    const nextPageButton = this.nextPageButton
    await nextPageButton.click()
    await this.page.waitForLoadState('networkidle')
    return true
  }

  // Expand a specific row
  public async expandRow(index: number): Promise<void> {
    await Allure.step(`Expand row: ${index}`, async () => {
      await this.expandableButtonLocator.nth(index).click()
    })
  }

  // Collapse a specific row
  public async collapseRow(index: number): Promise<void> {
    await Allure.step(`Collapse row: ${index}`, async () => {
      await this.expandableButtonLocator.nth(index).click()
    })
  }

  // Wait for rows to expand
  public async waitForRowExpansion(): Promise<void> {
    await this.page.waitForTimeout(2000)
  }

  async verifyDropdownOptionsMatchRowCount(): Promise<void> {
    const options = await this.getDropdownOptions()
    const mismatches = []
    for (const option of options) {
      const rowCount = await this.selectDropdownOptionAndCountRows(option)
      if (rowCount !== parseInt(option, 10)) {
        mismatches.push(
          `Option "${option}": Expected rows (${option}), Actual rows (${rowCount})`
        )
      }
    }
    if (mismatches.length > 0) {
      throw new Error(`Mismatch found: ${mismatches.join(', ')}`)
    }
  }
  public pickRandomItems<T>(items: T[], count: number): T[] {
    return items.sort(() => 0.5 - Math.random()).slice(0, count)
  }

  async performAndVerifySearches(
    searchData: { searchTerm: string }[],
    numberOfTerms: number
  ): Promise<void> {
    const selectedTerms = this.pickRandomItems(searchData, numberOfTerms)
    for (const item of selectedTerms) {
      await this.performSearch(item.searchTerm)
      const results = await this.getSearchResults()
      const termFound = results.some((result) =>
        result.toLowerCase().includes(item.searchTerm.toLowerCase())
      )

      if (!termFound) {
        throw new Error(
          `Search term '${item.searchTerm}' not found in results.`
        )
      }

      await this.resetSearch()
    }
  }

  async performSearchAndValidatePagination(
    searchTerm: string,
    maxPagesToCheck: number
  ): Promise<void> {
    await Allure.step(`Perform search for: ${searchTerm}`, async () => {
      await this.performSearch(searchTerm)
    })

    const allPageData: string[][] = []
    for (
      let pageIndex = 0;
      pageIndex < maxPagesToCheck || maxPagesToCheck === -1;
      pageIndex++
    ) {
      const pageData = await this.getSearchResults()
      if (
        allPageData.some(
          (data) => JSON.stringify(data) === JSON.stringify(pageData)
        )
      ) {
        throw new Error(
          `Page ${pageIndex + 1} has the same data as a previous page.`
        )
      }
      allPageData.push(pageData)
      await this.page.waitForTimeout(2000) // Ensure the page is fully loaded
      const hasNextPage = await this.moveToNextPage()
      if (!hasNextPage) break // Exit if no more pages to navigate
    }

    await this.reloadAndResetSearch()
  }

  async testGoToPageFunctionality(maxPagesToCheck: number): Promise<void> {
    const visitedPages = new Set<string>()
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
      await this.goToPage(targetPage)
      const activePageNumber = await this.getActivePageNumber()

      if (activePageNumber !== targetPage.trim()) {
        throw new Error(
          `Expected page: ${targetPage.trim()}, but active page is: ${activePageNumber}`
        )
      }

      visitedPages.add(activePageNumber || '')
      pagesChecked++
    }
  }
  async performSearchAndNavigatePages(
    searchTerm: string,
    maxPagesToCheck: number
  ): Promise<void> {
    await this.performSearch(searchTerm)
    const visitedPages = new Set<string>()
    let pagesChecked = 0
    while (maxPagesToCheck === -1 || pagesChecked < maxPagesToCheck) {
      const paginationNumbers = await this.getPaginationNumbers()
      const unvisitedPages = paginationNumbers.filter(
        (page) => !visitedPages.has(page.trim())
      )

      if (unvisitedPages.length === 0) break

      const targetPage =
        unvisitedPages[Math.floor(Math.random() * unvisitedPages.length)]
      await this.goToPage(targetPage)
      const activePageNumber = await this.getActivePageNumber()

      if (activePageNumber !== targetPage.trim()) continue

      visitedPages.add(activePageNumber)
      pagesChecked++
    }
  }
  async verifyPageButtonDisabledForSelectedPages(): Promise<void> {
    await this.page.waitForTimeout(2000) // Ensure the page is fully loaded
    const totalPages = await this.getTotalPages()
    expect(totalPages).toBeGreaterThan(0)

    // Test key boundary pages and a middle page
    const pagesToTest = [0] // Always check the first page
    if (totalPages > 1) pagesToTest.push(totalPages - 1) // Last page
    if (totalPages > 2) pagesToTest.push(Math.floor(totalPages / 2)) // Middle page

    for (const pageIndex of pagesToTest) {
      const pageNumber = await this.getPageNumberByIndex(pageIndex)
      await this.selectPageByIndex(pageIndex)
      if (pageNumber) {
        await this.fillGoToPageInput(pageNumber.trim())
      } else {
        throw new Error('Page number is null')
      }
      const isButtonDisabled = await this.isGoToPageButtonDisabled()
      expect(isButtonDisabled).toBe(true)
    }
  }

  async navigateAndVerifyNextPage(pagesToNavigate: number): Promise<void> {
    const activePageNumber = await this.getActivePageNumber()
    if (!activePageNumber) {
      throw new Error('Active page number is undefined')
    }
    let currentPageNumber = parseInt(activePageNumber, 10)
    for (let i = 0; i < pagesToNavigate; i++) {
      const expectedNextPage = currentPageNumber + 1
      await this.clickNextPageButton(expectedNextPage.toString())
      const activePageNumber = await this.getActivePageNumber()
      if (activePageNumber === undefined) {
        throw new Error('Active page number is undefined')
      }
      const newPageNumber = parseInt(activePageNumber, 10)

      if (newPageNumber !== expectedNextPage) {
        throw new Error(
          `Expected to navigate to page ${expectedNextPage}, but landed on page ${newPageNumber}.`
        )
      }
      currentPageNumber = newPageNumber
    }
  }
  async verifyPreviousPageNavigation(
    startingPage: number,
    pagesToNavigateBack: number
  ): Promise<void> {
    await this.goToPage(startingPage.toString())
    const activePageNumber = await this.getActivePageNumber()
    if (!activePageNumber) {
      throw new Error('Active page number is undefined')
    }
    let currentPageNumber = parseInt(activePageNumber, 10)

    for (let i = 0; i < pagesToNavigateBack; i++) {
      if (currentPageNumber <= 1) break // Stop if on the first page

      const expectedPreviousPage = currentPageNumber - 1
      await this.clickPreviousPageButton()
      const activePageNumber = await this.getActivePageNumber()
      if (activePageNumber === undefined) {
        throw new Error('Active page number is undefined')
      }
      const newPageNumber = parseInt(activePageNumber, 10)

      if (newPageNumber !== expectedPreviousPage) {
        throw new Error(
          `Expected to navigate to page ${expectedPreviousPage}, but landed on page ${newPageNumber}.`
        )
      }
      currentPageNumber = newPageNumber // Update for the next iteration
    }
  }
  async verifyExpandedRowsMatchLabels(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      const expectedChildren = await this.getExpectedChildrenCount(i)
      const initialRowCount = await this.getRowCount()
      await this.expandRow(i)
      await this.waitForRowExpansion() // Assumes some delay or checking for animation completion

      const expandedRowCount = await this.getRowCount()
      expect(expandedRowCount - initialRowCount).toBe(expectedChildren)

      await this.collapseRow(i) // Collapse the row after checking
    }
  }
}

//***************************************Filter Components*******************************************************************************

export class FiltersPage {
  private page: Page

  public countryFilter: Locator
  public keywordsFilter: Locator
  public websiteFilter: Locator
  public numberOfEmployeesFilter: Locator
  public actionsFilter: Locator
  public companiesWithoutCampaignsFilter: Locator
  public customersOfProcessFilter: Locator
  public clearAllFiltersButton: Locator
  public applyFilterButton: Locator
  public nestedcountryDropdown: Locator

  constructor(page: Page) {
    this.page = page

    // Initialize locators
    this.countryFilter = this.page.locator('div[aria-label="Country"]')
    this.keywordsFilter = this.page.locator('div[aria-label="Keywords"]')
    this.websiteFilter = this.page.locator('div[aria-label="Website"]')
    this.numberOfEmployeesFilter = this.page.locator(
      'div[aria-label="Number of employees"]'
    )
    this.actionsFilter = this.page.locator('div[aria-label="Actions"]')
    this.companiesWithoutCampaignsFilter = this.page.locator(
      'div[aria-label="Companies without campaigns"]'
    )
    this.customersOfProcessFilter = this.page.locator(
      'div[aria-label="Customers of Process"]'
    )
    this.clearAllFiltersButton = this.page.locator(
      'div[role="button"]:has-text("Clear all filters")'
    )
    this.applyFilterButton = this.page.locator('button:has-text("Apply")')
    this.nestedcountryDropdown = this.page.locator(
      'div[aria-label="Country dropdown"]'
    )
  }

  // Apply Country Filter
  public async applyCountryFilter(country: string) {
    await Allure.step(`Apply Country Filter: ${country}`, async () => {
      await this.countryFilter.click()
      await this.page
        .locator(`div[data-ui-element="dropdown-list"] >> text=${country}`)
        .click()
      await this.applyFilterButton.click()
    })
  }

  // Apply Keywords Filter
  public async applyKeywordsFilter(keyword: string) {
    await Allure.step(`Apply Keywords Filter: ${keyword}`, async () => {
      await this.keywordsFilter.click()
      const keywordInput = this.page.locator(
        'input[placeholder="Search for keywords"]'
      )
      await keywordInput.fill(keyword)
      await this.applyFilterButton.click()
    })
  }

  // Apply Website Filter
  public async applyWebsiteFilter() {
    await Allure.step('Apply Website Filter', async () => {
      await this.websiteFilter.click()
      await this.applyFilterButton.click()
    })
  }

  // Apply Number of Employees Filter
  public async applyNumberOfEmployeesFilter(range: string) {
    await Allure.step(
      `Apply Number of Employees Filter: ${range}`,
      async () => {
        await this.numberOfEmployeesFilter.click()
        await this.page.locator(`text=${range}`).click()
        await this.applyFilterButton.click()
      }
    )
  }

  // Apply Actions Filter
  public async applyActionsFilter(action: string) {
    await Allure.step(`Apply Actions Filter: ${action}`, async () => {
      await this.actionsFilter.click()
      await this.page.locator(`text=${action}`).click()
      await this.applyFilterButton.click()
    })
  }

  // Apply Companies Without Campaigns Filter
  public async applyCompaniesWithoutCampaignsFilter() {
    await Allure.step('Apply Companies Without Campaigns Filter', async () => {
      await this.companiesWithoutCampaignsFilter.click()
      await this.applyFilterButton.click()
    })
  }

  // Apply Customers of Process Filter
  public async applyCustomersOfProcessFilter() {
    await Allure.step('Apply Customers of Process Filter', async () => {
      await this.customersOfProcessFilter.click()
      await this.applyFilterButton.click()
    })
  }

  // Apply Additional Filters (Handles all available filters)
  public async applyAdditionalFilters() {
    await Allure.step('Apply Additional Filters', async () => {
      await this.applyCountryFilter('France')
      await this.applyKeywordsFilter('Automation')
      await this.applyWebsiteFilter()
      await this.applyNumberOfEmployeesFilter('50-200')
      await this.applyActionsFilter('Active')
      await this.applyCompaniesWithoutCampaignsFilter()
      await this.applyCustomersOfProcessFilter()
    })
  }

  // Clear All Filters
  public async clearAllFilters() {
    await Allure.step('Clear All Filters', async () => {
      await this.clearAllFiltersButton.click()
    })
  }

  // Verify Filters Reset
  public async verifyFiltersReset() {
    await Allure.step('Verify Filters Reset', async () => {
      await this.page.waitForTimeout(1000) // Adjust this timeout as per application response time
      const filtersApplied = await this.page.locator('.applied-filter').count()
      if (filtersApplied > 0) {
        throw new Error('Filters were not cleared properly.')
      }
    })
  }

  // Verify All Filters are Visible
  public async verifyAllFiltersVisible() {
    await Allure.step('Verify All Filters are Visible', async () => {
      const filters = [
        this.countryFilter,
        this.keywordsFilter,
        this.websiteFilter,
        this.numberOfEmployeesFilter,
        this.actionsFilter,
        this.companiesWithoutCampaignsFilter,
        this.customersOfProcessFilter,
      ]
      for (const filter of filters) {
        await expect(filter).toBeVisible()
      }
    })
  }
  public async openCountryDropdown(): Promise<void> {
    await Allure.step('Open the country dropdown', async () => {
      await this.nestedcountryDropdown.click() // Click to open the dropdown
    })
  }

  public async selectRandomCountryFromDropdown(): Promise<string> {
    await Allure.step(
      'Select a random country from the dropdown',
      async () => {}
    )
    // Open the country dropdown
    await this.openCountryDropdown()

    // Wait for the dropdown options to appear
    const dropdownVisible = this.page.locator(
      '.ljYmaf0oxECrqq3P3FPK.ca-max-h-64.ca-overflow-auto.ca-inno-scroll.ca-py-aqua'
    )
    await expect(dropdownVisible).toBeVisible()

    // Get all visible country options
    const countryOptions = await dropdownVisible
      .locator('.ca-font-sans.ca-text-base')
      .allTextContents()

    // Ensure there are options to select
    if (countryOptions.length === 0) {
      throw new Error('No country options available in the dropdown.')
    }

    // Randomly pick a country from the options
    const randomIndex = Math.floor(Math.random() * countryOptions.length)
    const selectedCountry = countryOptions[randomIndex]

    // Click the randomly selected country
    const countryLocator = dropdownVisible.locator(
      `.ca-font-sans.ca-text-base:has-text("${selectedCountry}")`
    )
    await countryLocator.scrollIntoViewIfNeeded()
    await countryLocator.click()
    // Return the selected country for verification or logging
    return selectedCountry
  }

  public async verifySelectedCountry(selectedCountry: string): Promise<void> {
    await Allure.step(
      `Verify that the selected country is: ${selectedCountry}`,
      async () => {
        // Locator for the dropdown element
        const dropdownLocator = this.page.locator(
          `input[placeholder="${selectedCountry}"]`
        )

        // Verify that the dropdown has the selected country as a placeholder
        await expect(dropdownLocator).toHaveAttribute(
          'placeholder',
          selectedCountry
        )
      }
    )
  }
}
