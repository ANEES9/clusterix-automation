import { Page, Locator } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { APP_NAMES } from 'config/constants/app-names'

export class SurveyPage {
  readonly page: Page
  private translations: Record<string, any>

  // Locators
  readonly roleQuestion: Locator
  readonly nextButton: Locator
  readonly roleOptions: {
    ceoOption: Locator
    directorOption: Locator
    developerOption: Locator
    hrOption: Locator
    salesOption: Locator
    otherOption: Locator
  }
  readonly appQuestion: Locator
  readonly appOptions: {
    calendar: Locator
    email: Locator
    liveChat: Locator
    files: Locator
    office: Locator
    taskManagement: Locator
    timeTracking: Locator
    customers: Locator
    companySearcher: Locator
  }
  readonly backButton: Locator
  readonly otherToolsQuestion: Locator
  readonly otherToolsInput: Locator
  readonly completeButton: Locator

  constructor(page: Page, locale: string) {
    this.page = page

    // Fetch the 'container' namespace translations based on the provided locale
    this.translations = getTranslations('container', locale)

    // Question locators
    this.roleQuestion = page.getByText(
      `^${this.translations.user_survey.role_page.title}$`
    )
    // Role options locators
    this.roleOptions = {
      ceoOption: page.locator(
        `span:has-text("${this.translations.user_survey.role_page.roles.executive}")`
      ),
      directorOption: page.locator(
        `span:has-text("${this.translations.user_survey.role_page.roles.manager}")`
      ),
      developerOption: page.locator(
        `span:has-text("${this.translations.user_survey.role_page.roles.developer_designer}")`
      ),
      hrOption: page.locator(
        `span:has-text("${this.translations.user_survey.role_page.roles.hr}")`
      ),
      salesOption: page.locator(
        `span:has-text("${this.translations.user_survey.role_page.roles.sales_marketing}")`
      ),
      otherOption: page.locator(
        `span:has-text("${this.translations.user_survey.role_page.roles.other}")`
      ),
    }

    // App interest question locators
    this.appQuestion = page.getByText(
      `^${this.translations.user_survey.apps_page.title}$`
    )
    this.appOptions = {
      calendar: page.locator(`span:has-text("${APP_NAMES.calendar}")`),
      email: page.locator(`span:has-text("${APP_NAMES.email}")`),
      liveChat: page.locator(`span:has-text("${APP_NAMES.liveChat}")`),
      files: page.locator(`span:has-text("${APP_NAMES.files}")`),
      office: page.locator(`span:has-text("${APP_NAMES.office}")`),
      taskManagement: page.locator(
        `span:has-text("${APP_NAMES.taskManagement}")`
      ),
      timeTracking: page.locator(`span:has-text("${APP_NAMES.timeTracking}")`),
      customers: page.locator(`span:has-text("${APP_NAMES.customers}")`),
      companySearcher: page.locator(
        `span:has-text("${APP_NAMES.companySearcher}")`
      ),
    }

    this.otherToolsQuestion = page.getByText(
      `^${this.translations.user_survey.other_tools_page.title}$`
    )
    this.otherToolsInput = page.getByPlaceholder(
      this.translations.user_survey.other_tools_page.placeholder
    )

    // Next, back, complete buttons
    this.backButton = page.locator(
      `//div[text()="${this.translations.user_survey.back}"]/ancestor::button`
    )
    this.nextButton = page.locator(
      `//div[text()="${this.translations.user_survey.next}"]/ancestor::button`
    )
    this.completeButton = page.locator(
      `//div[text()="${this.translations.user_survey.complete}"]/ancestor::button`
    )
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Survey', async () => {
      await this.page.goto(`${baseURL}`)
    })
  }

  // Actions
  async selectRole(role: keyof typeof this.roleOptions) {
    await this.roleOptions[role].click()
  }

  async clickNext() {
    await this.nextButton.click()
  }

  async clickBack() {
    await this.backButton.click()
  }

  async selectApps(apps: Array<keyof typeof this.appOptions>) {
    for (const app of apps) {
      await this.appOptions[app].click()
    }
  }

  async enterOtherTools(tools: string) {
    await this.otherToolsInput.fill(tools)
  }

  async clickComplete() {
    await this.completeButton.click()
  }

  // Common flows
  async completeRoleQuestion(role: keyof typeof this.roleOptions) {
    await this.selectRole(role)
    await this.clickNext()
  }

  async completeAppInterestQuestion(apps: Array<keyof typeof this.appOptions>) {
    await this.selectApps(apps)
    await this.clickNext()
  }

  async completeOtherToolsQuestion(tools: string) {
    await this.enterOtherTools(tools)
    await this.clickComplete()
  }
}
