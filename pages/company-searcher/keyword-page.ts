// EnhancedSearchPage.ts
import { Page, expect } from '@playwright/test'
import { getTranslations } from 'common/get-translations-helper'
import { Allure } from 'common/allure-helper'
import { CompanyPage } from './company-page'

export class KeywordPage {
  private readonly page: Page
  private readonly translations: Record<string, any>

  // Simplified and updated locators
  private sidebarButton
  private searchInput
  private searchButton

  private filterButton
  private saveSearchButton
  private addCompanyButton
  private title
  private description
  private selectItemsCheckbox
  private expandButton
  private primaryCell
  private activePageLocator
  private nextPageButton
  private previousPageButton

  constructor(page: Page, locale: string) {
    this.page = page
    this.translations = getTranslations('company-searcher', locale)

    this.sidebarButton = this.page
      .locator('._sideBarButton__name_1gqqn_243')
      .nth(1)
    this.searchInput = this.page.locator(
      '.PartWrapper-module_partWrapper__I8EIP input[name="query"]'
    )
    this.searchButton = this.page.locator(
      '.PartWrapper-module_partWrapper__I8EIP button'
    )
    this.filterButton = this.page.locator(
      '.PartWrapper-module_partWrapper__I8EIP >> nth=1'
    )
    this.saveSearchButton = this.page.locator(
      '.ButtonWrapper-module_buttonWrapper__T-wbD >>nth=0'
    )
    this.addCompanyButton = this.page.locator(
      '.ButtonWrapper-module_buttonWrapper__T-wbD >>nth=1'
    )
    this.title = this.page.locator('.EmptyState-module_title__-piqa')
    this.description = this.page.locator(
      '.EmptyState-module_description__fsJOc'
    )
    this.selectItemsCheckbox = page.locator('button[role="checkbox"]')
    this.expandButton = page.locator(
      'button:has(svg path[d="M6 9L4.6 7.6L2 10.2V6.9H0V13.7H6.8V11.7H3.4L6 9ZM6.9 0V2H10.2L7.6 4.6L9 6L11.6 3.4V6.7H13.6V0H6.9Z"])'
    )
    this.primaryCell = page.locator('.cocLDVBJ_LM9BO4ywmZG')

    //Pagination Bar Locators
    this.activePageLocator = page.locator(
      '.PaginationBar-module_pages__hF8oC .ca-bg-theme'
    )
    this.nextPageButton = page
      .locator('.PaginationBar-module_barButton__o4GQx')
      .nth(1)
    this.previousPageButton = page
      .locator('.PaginationBar-module_barButton__o4GQx')
      .first()
  }

  async openSearch() {
    await Allure.step('Open the search panel', async () => {
      await this.sidebarButton.click()
      await expect(this.searchInput).toBeVisible()
    })
  }

  async verifySearchInput() {
    await Allure.step('Verify the search input placeholder', async () => {
      await expect(this.searchInput).toHaveAttribute(
        'placeholder',
        this.translations.search_placeholder
      )
    })
  }

  async verifyButtonVisible(p0: string) {
    await Allure.step(
      'Verify the visibility of the search button',
      async () => {
        await expect(this.searchButton).toBeVisible()
      }
    )
  }
  async clickNextPageButton(expectedNextPage: string): Promise<void> {
    const isDisabled = await this.nextPageButton.isDisabled()
    if (!isDisabled) {
      await this.nextPageButton.click()
    } else {
      throw new Error('Next button is disabled.')
    }
  }

  public async verifyInitialMessage() {
    await Allure.step(
      'Verify the initial message displayed on search',
      async () => {
        // Assuming 'this.translations' is correctly initialized and contains the expected translations
        const expectedTitle =
          this.translations.main.keyword_search_page.empty_state.title // Ensure these keys match your translations structure
        const expectedDescription =
          this.translations.main.keyword_search_page.empty_state.description
        await expect(this.title).toHaveText(expectedTitle)
        await expect(this.description).toHaveText(expectedDescription)
        console.log(
          `Debug: Verified the description text as '${expectedDescription}'`
        )
      }
    )
  }

  async verifyElementsPresence() {
    await Allure.step(
      'Check all key elements are present on the page',
      async () => {
        await expect(this.filterButton).toBeVisible()
        await expect(this.saveSearchButton).toBeVisible()
        await expect(this.addCompanyButton).toBeVisible()
        await expect(this.selectItemsCheckbox).toBeVisible()
        await expect(this.expandButton).toBeVisible()
      }
    )
  }

  async performSearch(searchTerm: string) {
    await Allure.step(
      `Perform search using the term: "${searchTerm}"`,
      async () => {
        await this.page.waitForTimeout(1000)
        await this.searchInput.fill(searchTerm)
        await this.searchButton.click()
      }
    )
  }

  async getSearchResults(): Promise<string[]> {
    let results: string[] = []
    await Allure.step('Fetch the search results from the page', async () => {
      await this.page.waitForTimeout(2000)
      results = await this.primaryCell.allTextContents()
    })
    return results
  }
  async verifySearchResultsHaveData(term: string): Promise<void> {
    await Allure.step(
      'Verify that each search result contains valid data',
      async () => {
        const results = await this.getSearchResults()
        if (results.length === 0) {
          throw new Error('The search results table is empty.')
        }

        results.forEach((result, index) => {
          if (result.trim() === '') {
            throw new Error(
              `Result row ${index + 1} is empty. Each row should contain non-empty data.`
            )
          }
          // Additional checks can be added here, such as format or content-specific validations
        })
      }
    )
  }
  async resetSearch() {
    await Allure.step('Reset the search field', async () => {
      await this.searchInput.fill('')
      await this.searchButton.click()
      await this.page.waitForTimeout(1000)
    })
  }

  async reloadPage() {
    await Allure.step('Reload the current page to reset state', async () => {
      await this.page.reload()
      await this.page.waitForTimeout(2000)
    })
  }

  async getActivePageNumber(): Promise<string | undefined> {
    let activePageNum: string | undefined
    await Allure.step('Get the active page number', async () => {
      await this.page.waitForTimeout(3000)
      activePageNum = (await this.activePageLocator.textContent())?.trim()
    })
    return activePageNum
  }

  async randomSelector<T>(array: T[], count: number): Promise<T[]> {
    let selectedItems: T[] = []
    await Allure.step('Select random items from an array', async () => {
      const pickRandomItems = (array: T[], count: number): T[] => {
        return array.sort(() => 0.5 - Math.random()).slice(0, count) // Shuffle and pick random items
      }
      selectedItems = pickRandomItems(array, count)
    })
    return selectedItems
  }

  async navigatePages(
    companyPage: {
      clickNextPageButton: (arg0: string) => any
      validatePageChange: (arg0: number) => any
    },
    startPage: number,
    pagesToNavigate: number
  ): Promise<void> {
    await Allure.step(
      `Navigate through ${pagesToNavigate} pages starting from page ${startPage}`,
      async () => {
        let currentPageNumber = startPage
        for (let i = 0; i < pagesToNavigate; i++) {
          const expectedNextPage = currentPageNumber + 1
          await companyPage.clickNextPageButton(expectedNextPage.toString())
          currentPageNumber =
            await companyPage.validatePageChange(expectedNextPage)
        }
      }
    )
  }

  async validatePageNumber(pageNumber: string): Promise<number> {
    let numericPageNumber = 0
    await Allure.step('Validate the page number', async () => {
      if (!pageNumber) {
        throw new Error('Page number is not available.')
      }
      numericPageNumber = parseInt(pageNumber, 10)
      if (isNaN(numericPageNumber)) {
        throw new Error(`Invalid page number: "${pageNumber}"`)
      }
    })
    return numericPageNumber
  }

  async navigateAndVerifyNextPage(expectedPageNumber: number) {
    let numericNewPageNumber = 0
    await Allure.step(
      `Navigate to and verify page number ${expectedPageNumber}`,
      async () => {
        await this.clickNextPageButton(expectedPageNumber.toString())
        const newPageNumber = await this.getActivePageNumber()
        if (!newPageNumber) {
          throw new Error('Failed to retrieve the new active page number.')
        }
        numericNewPageNumber = parseInt(newPageNumber, 10)
        if (isNaN(numericNewPageNumber)) {
          throw new Error(`Invalid new page number: "${newPageNumber}"`)
        }
        expect(numericNewPageNumber).toBe(expectedPageNumber)
      }
    )
    return numericNewPageNumber
  }
}
