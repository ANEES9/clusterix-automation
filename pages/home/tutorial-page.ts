import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'

export class TutorialPage {
  readonly page: Page
  translations: Record<string, any>

  // Locators
  readonly modal: Locator
  readonly modalTitle: Locator
  readonly modalContent: Locator
  readonly getStartedButton: Locator
  readonly closeTutorialCrossIcon: Locator

  constructor(page: Page, locale: string) {
    this.page = page

    // Fetch the 'tutorial' namespace translations based on the provided locale
    this.translations = getTranslations('tutorial', locale)

    this.modal = page.locator(`div[aria-label="Guide"]`)
    this.modalTitle = page.locator(
      `div.userflowjs-bubble-content h5:has-text("${this.translations.welcome_step.title}")`
    )
    this.modalContent = page.locator(
      `div.userflowjs-bubble-content p:has-text("${this.translations.welcome_step.description}")`
    )
    this.getStartedButton = page.locator(
      `div.userflowjs-bubble-button-text:has-text("${this.translations.welcome_step.button.text}")`
    )
    this.closeTutorialCrossIcon = page.locator(
      '[data-test-id="tour-close-button"]'
    )
  }
  // Navigate to page and ensure modal is visible
  async waitForModalToBeVisible() {
    await Allure.step(
      'Wait for the user flow modal to be visible',
      async () => {
        await expect(this.modal).toBeVisible()
      }
    )
  }

  // Verify modal title
  async assertModalTitle(expectedTitle: string) {
    await Allure.step('Verify the user flow modal title', async () => {
      await expect(this.modalTitle).toHaveText(expectedTitle)
    })
  }

  // Verify modal content
  async assertModalContent(expectedContent: string) {
    await Allure.step('Verify the user flow modal content', async () => {
      await expect(this.modalContent).toHaveText(expectedContent)
    })
  }

  // Click "Get Started" button
  async clickGetStarted() {
    await Allure.step(
      'Click on the "Get Started" button in the user flow modal',
      async () => {
        await expect(this.getStartedButton).toBeVisible()
        await this.getStartedButton.click()
      }
    )
  }

  // Click "Close Tutorial" button
  async skipTutorial() {
    await Allure.step(
      'Click on the "Close guide" button to skip the tutorial',
      async () => {
        await expect(this.closeTutorialCrossIcon).toBeVisible()
        await this.closeTutorialCrossIcon.click({ force: true })
      }
    )
  }
}
