import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { APP_NAMES } from '../../shared/constants/app-names'

export class SurveyPage {
  readonly page: Page
  translations: Record<string, any>

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
  readonly otherInput: Locator
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
      this.translations.user_survey.role_page.title,
      { exact: true }
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
    this.otherInput = page.locator(
      `input[placeholder="${this.translations.user_survey.role_page.other_placeholder}"]`
    )
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

  // Navigate to survey
  async goto(baseURL: string | undefined) {
    await Allure.step(
      'Role question should be visible when user navigate to base url',
      async () => {
        await this.page.goto(`${baseURL}`)
        await expect(this.roleQuestion).toBeVisible()
      }
    )
  }

  async validateRoleTitleLocatorVisible() {
    await Allure.step(`Should check if the title is visible`, async () => {
      await expect(this.roleQuestion).toBeVisible()
    })
  }

  // Select role with assertion
  async selectRole(role: keyof typeof this.roleOptions) {
    await Allure.step(
      `Should be selected role: ${role} when user click on the role option`,
      async () => {
        await expect(this.roleOptions[role]).toBeVisible()
        await this.roleOptions[role].click()
      }
    )
  }

  async isRoleSelected(role: keyof typeof this.roleOptions): Promise<boolean> {
    const roleButton = this.roleOptions[role]
    return (await roleButton.getAttribute('aria-checked')) === 'true'
  }

  async assertRoleSelected(role: keyof typeof this.roleOptions) {
    await Allure.step(`Assert that role ${role} is selected`, async () => {
      const isSelected = await this.isRoleSelected(role)
      if (!isSelected) {
        throw new Error(`Role ${role} is not selected`)
      }
    })
  }

  // Click next with assertion
  async clickNext() {
    await Allure.step(
      'Should navigate to next page when user clicks on the next button',
      async () => {
        await expect(this.nextButton).toBeVisible()
        await this.nextButton.click()
      }
    )
  }

  // Click back with assertion
  async clickBack() {
    await Allure.step(
      'Should navigate to previous page when user clicks on the back button',
      async () => {
        await expect(this.backButton).toBeVisible()
        await this.backButton.click()
      }
    )
  }

  // Select apps with assertions
  async selectApps(apps: Array<keyof typeof this.appOptions>) {
    await Allure.step(
      `Should be selected apps: ${apps.join(', ')} when user click app options`,
      async () => {
        for (const app of apps) {
          await expect(this.appOptions[app]).toBeVisible()
          await this.appOptions[app].click()
        }
      }
    )
  }

  // Fill other tools input
  async enterOtherTools(tools: string) {
    await Allure.step(
      `Should be entered other tools: ${tools} when user fill the blank`,
      async () => {
        await expect(this.otherToolsInput).toBeVisible()
        await this.otherToolsInput.fill(tools)
      }
    )
  }

  // Click complete button
  async clickComplete() {
    await Allure.step(
      'Should be completed when user clicks complete button',
      async () => {
        await expect(this.completeButton).toBeVisible()
        await this.completeButton.click()
      }
    )
  }

  // Common flows
  async completeRoleQuestion(role: keyof typeof this.roleOptions) {
    await Allure.step(
      'Should complete role question when user select role and click on the next button',
      async () => {
        await this.selectRole(role)
        await this.clickNext()
      }
    )
  }

  // Complete app interest question
  async completeAppInterestQuestion(apps: Array<keyof typeof this.appOptions>) {
    await Allure.step(
      'Should complete app interest question when user select apps and click on the next button',
      async () => {
        await this.selectApps(apps)
        await this.clickNext()
      }
    )
  }

  // Complete other tools question
  async completeOtherToolsQuestion(tools: string) {
    await Allure.step(
      'Should complete other tools question when user enter other tools and click complete',
      async () => {
        await this.enterOtherTools(tools)
        await this.clickComplete()
      }
    )
  }
}
