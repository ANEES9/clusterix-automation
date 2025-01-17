import { Page, Locator } from '@playwright/test'

export class SurveyPage {
  readonly page: Page

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

  constructor(page: Page) {
    this.page = page

    // Question locators
    this.roleQuestion = page.getByText('What is your role?')
    this.nextButton = page.locator('//div[text()="Next"]/ancestor::button')

    // Role options locators
    this.roleOptions = {
      ceoOption: page.locator('span:has-text("CEO / CFO / COO")'),
      directorOption: page.locator('span:has-text("Director / Manager")'),
      developerOption: page.locator('span:has-text("Developer / Designer")'),
      hrOption: page.locator('span:has-text("Human Resources")'),
      salesOption: page.locator('span:has-text("Sales / Marketing")'),
      otherOption: page.locator('span:has-text("Other (please specify)")'),
    }

    // App interest question locators
    this.appQuestion = page.getByText('What app are you most interested in?')
    this.backButton = page.getByRole('button', { name: 'Back' })

    this.appOptions = {
      calendar: page.locator('span:has-text("Calendar")'),
      email: page.locator('span:has-text("Email")'),
      liveChat: page.locator('span:has-text("Live Chat")'),
      files: page.locator('span:has-text("Files")'),
      office: page.locator('span:has-text("Office")'),
      taskManagement: page.locator('span:has-text("Task Management")'),
      timeTracking: page.locator('span:has-text("Time Tracking")'),
      customers: page.locator('span:has-text("Customers")'),
      companySearcher: page.locator('span:has-text("Company Searcher")'),
    }

    this.otherToolsQuestion = page.getByText('Do you use other tools?')
    this.otherToolsInput = page.getByPlaceholder(
      'Enter the names of the tools or apps you use.'
    )
    this.completeButton = page.getByRole('button', { name: 'Complete' })
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
