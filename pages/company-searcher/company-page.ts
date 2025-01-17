import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'

export class CompanyPage {
  private page: Page

  public companysearcherlink: Locator
  public topnavbar: Locator
  public searchinput: Locator
  public filterbutton: Locator
  public searchbutton: Locator
  public tableitemslabel: Locator
  public savesearchbutton: Locator
  public addcompanybutton: Locator
  public selectitemscheckbox: Locator
  public additionalbutton: Locator
  public primarycells: Locator
  public iconbutton: Locator
  public rows: Locator
  public headers: Locator
  public firstrowcells: Locator
  public linkintable: Locator
  public columnheader: Locator
  public table: Locator
  public resultsperpagedropdown: Locator
  public dropdownoptions: Locator
  public paginationbuttons: Locator
  public gotopageinput: Locator
  public gotopagebutton: Locator
  public paginationoptions: Locator
  public activepagelocator: Locator
  public paginationelements: Locator
  public dropdownoption: (option: string) => Locator

  constructor(page: Page) {
    this.page = page

    this.companysearcherlink = page.getByRole('link', {
      name: 'Company Searcher Find the',
    })
    this.topnavbar = page.locator('section[data-testid="app-searchbar"]')
    this.searchinput = page.locator('input[name="query"]')
    this.filterbutton = page
      .locator('.partwrapper-module_partwrapper__i8eip')
      .nth(1)
    this.searchbutton = page
      .locator('.partwrapper-module_partwrapper__i8eip')
      .nth(2)
    this.tableitemslabel = page.locator(
      '.partwrapper-module_partwrapper__i8eip.itemcountlabel-module_itemcountlabel__h2stj'
    )
    this.savesearchbutton = page.locator('button[aria-label="Save search"]')
    this.addcompanybutton = page.locator(
      'button:has(svg path[d="M8 0C7.6 0 6.9 0 6 0V6H0V8H6V14H8V8H14V6H8V0Z"])'
    )
    this.selectitemscheckbox = page.locator('button[role="checkbox"]')
    this.additionalbutton = page.locator(
      'button:has(svg path[d="M6 9L4.6 7.6L2 10.2V6.9H0V13.7H6.8V11.7H3.4L6 9ZM6.9 0V2H10.2L7.6 4.6L9 6L11.6 3.4V6.7H13.6V0H6.9Z"])'
    )
    this.primarycells = page.locator('.smarttable-module_primarycell__yng6n')
    this.iconbutton = page.locator('.o5wot2424rxsuci4ffyd')
    this.rows = page.locator('.smarttable-module_primarycell__yng6n')
    this.headers = page.locator('thead th')
    this.firstrowcells = page.locator(
      '.smarttable-module_primarycell__yng6n >> div.smarttable-module_cellcontentwrapper__ppyvz'
    )
    this.linkintable = page.locator(
      'div.basecellwrapper-module_wrapper__xcaqu a'
    )
    this.columnheader = page.locator('text=Company Name')
    this.table = page.locator('.smarttable-module_tablewrapper__o2vt5').nth(0)
    this.resultsperpagedropdown = page.locator('input[readonly][value]')
    this.dropdownoptions = page.locator(
      '.paginationbar-module_perpagedropdown__z9qfs div[data-value]'
    )
    this.paginationbuttons = page.locator(
      '.paginationbar-module_barbutton__o4gqx'
    )
    this.gotopageinput = page.locator(
      'div.paginationbar-module_gotopagewrapper__ub49t input'
    )
    this.gotopagebutton = page.locator(
      '.paginationbar-module_gotopagebutton__fcjek'
    )
    this.paginationoptions = page.locator(
      'paginationbar-module_settings__4abwr paginationbar-module_settingsopen__tk5pc'
    )
    this.activepagelocator = page.locator(
      '.paginationbar-module_pages__hf8oc .ca-bg-theme'
    )
    this.paginationelements = page.locator(
      '.paginationbar-module_pages__hf8oc .ca-whitespace-nowrap'
    )
    this.dropdownoption = (option: string) =>
      page.locator(
        `.paginationbar-module_perpagedropdown__z9qfs div[data-value="${option}"]`
      )
  }

  async searchcompany(query: string) {
    await this.searchinput.fill(query)
    await this.searchbutton.click()
  }

  async validatesearchresults(expectedtext: string) {
    await expect(this.primarycells).toContainText(expectedtext)
  }

  async gotopage(targetpage: string | number) {
    const targetpagestring =
      typeof targetpage === 'number' ? targetpage.toString() : targetpage.trim()
    await this.paginationbuttons.nth(2).click()
    await this.gotopageinput.fill(targetpagestring)
    await this.gotopagebutton.click()
    await this.page.waitForTimeout(2000)
  }

  async verifyuielements() {
    await Allure.step('verify top navigation bar elements', async () => {
      await expect(this.topnavbar).toBeVisible()
      await expect(this.searchinput).toBeVisible()
      await expect(this.searchinput).toHaveAttribute('placeholder', 'Search')
      await expect(this.filterbutton).toBeVisible()
      await expect(this.searchbutton).toBeVisible()
      await expect(this.tableitemslabel).toBeVisible()
      await expect(this.tableitemslabel).toHaveText(/table items/i)
      await expect(this.savesearchbutton).toBeVisible()
      await expect(this.addcompanybutton).toBeVisible()
      await expect(this.selectitemscheckbox).toBeVisible()
      await expect(this.additionalbutton).toBeVisible()
    })

    await Allure.step('verify table content', async () => {
      await expect(this.primarycells.first()).toBeVisible()
    })

    await Allure.step('verify comment icon button', async () => {
      await expect(this.iconbutton.first()).toBeVisible()
    })

    await Allure.step('verify table headers', async () => {
      const expectedheaders = [
        'company name',
        'children',
        'country',
        'employee count',
        'customer type',
        'contacts',
      ]
      for (const header of expectedheaders) {
        const headerlocator = this.headers.locator(`text=${header}`)
        await expect(headerlocator).toBeVisible()
      }
    })
  }

  async selectdropdownoptionandcountrows(option: string): Promise<number> {
    await this.paginationbuttons.nth(2).click()
    await this.resultsperpagedropdown.click()
    await this.dropdownoption(option).click()
    await this.page.waitForTimeout(2000)
    return this.rows.count()
  }

  async getdropdownoptions(): Promise<string[]> {
    await this.paginationbuttons.nth(2).click()
    const options = await this.dropdownoptions.allTextContents()
    await this.paginationbuttons.nth(2).click()
    return options
  }

  async performsearch(searchterm: string) {
    await this.searchinput.fill(searchterm)
    await this.searchbutton.click()
    await this.page.waitForTimeout(2000)
  }

  async resetsearch() {
    await this.searchinput.fill('')
    await this.searchbutton.click()
    await this.page.waitForTimeout(1000)
  }

  async getsearchresults(): Promise<string[]> {
    return await this.primarycells.allTextContents()
  }

  async getpaginationnumbers(): Promise<string[]> {
    return await this.paginationelements.allTextContents()
  }

  async navigatetopage(pagenumber: string) {
    const targetpageelement = this.paginationelements
      .filter({ hasText: pagenumber })
      .first()
    await targetpageelement.click()
    await this.page.waitForTimeout(2000)
  }

  async getactivepagenumber(): Promise<string | undefined> {
    return (await this.activepagelocator.textContent())?.trim()
  }

  async getcurrentpagedata(): Promise<string[]> {
    return await this.primarycells.allTextContents()
  }

  async resetsearchinput() {
    await this.searchinput.fill('')
    await this.searchbutton.click()
    await this.page.waitForTimeout(1000)
  }

  async handlepagination(
    maxpagestocheck: number | -1
  ): Promise<{ visitedpages: Set<string>; allpagedata: string[][] }> {
    let visitedpages = new Set<string>()
    let allpagedata: string[][] = []
    let pageschecked = 0

    while (maxpagestocheck === -1 || pageschecked < maxpagestocheck) {
      const paginationnumbers = await this.getpaginationnumbers()
      const unvisitedpages = paginationnumbers.filter(
        (page) => !visitedpages.has(page.trim())
      )

      if (unvisitedpages.length === 0) {
        break
      }

      const targetpage =
        unvisitedpages[Math.floor(Math.random() * unvisitedpages.length)]
      await this.navigatetopage(targetpage)

      const activepagenumber = await this.getactivepagenumber()
      if (activepagenumber !== targetpage.trim()) {
        continue
      }

      const currentpagedata = await this.getcurrentpagedata()
      allpagedata.push(currentpagedata)

      visitedpages.add(activepagenumber || '')
      pageschecked++
    }

    return { visitedpages, allpagedata }
  }

  async reloadpage() {
    await this.page.reload()
    await this.page.waitForTimeout(3000)
  }

  async gettotalpages(): Promise<number> {
    return await this.paginationelements.count()
  }

  async getpagenumberbyindex(index: number): Promise<string | null> {
    return await this.paginationelements.nth(index).textContent()
  }

  async selectpagebyindex(index: number) {
    await this.paginationelements.nth(index).click()
    await this.page.waitForTimeout(1000)
  }

  async isgotopagebuttondisabled(): Promise<boolean> {
    return await this.gotopagebutton.evaluate((el) =>
      el.classList.contains('hover:ca-cursor-not-allowed')
    )
  }

  async fillgotopageinput(pagenumber: string) {
    await this.paginationbuttons.nth(2).click()
    await this.gotopageinput.fill(pagenumber)
  }
}
