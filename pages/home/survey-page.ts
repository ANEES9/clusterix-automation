import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'
import { APP_NAMES } from 'constants/app-names'

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
    this.translations = getTranslations('home', locale)

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
      `input[placeholder="${this.translations.user_survey.role_page.roles.other_placeholder}"]`
    )
    // App interest question locators
    this.appQuestion = page.getByText(
      `${this.translations.user_survey.apps_page.title}`
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
      `${this.translations.user_survey.other_tools_page.title}`
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

  // Select role with assertion and validation
  async selectRole(
    role: keyof typeof this.roleOptions,
    otherInputValue?: string
  ) {
    await Allure.step(`Selecting the role: ${role}`, async () => {
      const roleButton = this.roleOptions[role]

      // Ensure the button is visible before interaction
      await expect(roleButton).toBeVisible()

      // If selecting "Other", handle input field
      if (role === 'otherOption' && otherInputValue) {
        const inputField = this.otherInput
        await roleButton.click()
        await expect(inputField).toBeVisible()
        await inputField.fill(otherInputValue)
        await expect(inputField).toHaveValue(otherInputValue)
      } else {
        // For other roles, just click and verify the button selection
        const buttonLocator = roleButton.locator('..') // Get parent button
        const initialClass = (await buttonLocator.getAttribute('class')) ?? ''
        await roleButton.click()
        await expect(buttonLocator).not.toHaveAttribute('class', initialClass)
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

  async validateAppInterestsTitleVisible() {
    await Allure.step(`Should check if the title is visible`, async () => {
      await expect(this.appQuestion).toBeVisible()
    })
  }

  // Select apps with assertion and validation
  async selectApps(apps: Array<keyof typeof this.appOptions>) {
    await Allure.step(`Selecting apps: ${apps.join(', ')}`, async () => {
      for (const app of apps) {
        const appButton = this.appOptions[app]
        // Ensure the app button is visible before interaction
        await expect(appButton).toBeVisible()
        // Get the parent button that actually changes class on selection
        const buttonLocator = appButton.locator('..')
        const initialClass = (await buttonLocator.getAttribute('class')) ?? ''
        // Click the app button
        await appButton.click()
        // Verify that the button's class has changed (indicating selection)
        await expect(buttonLocator).not.toHaveAttribute('class', initialClass)
      }
    })
  }

  async validateOtherToolsTitleVisible() {
    await Allure.step(`Should check if the title is visible`, async () => {
      await expect(this.otherToolsQuestion).toBeVisible()
    })
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
