import { Page, Locator, expect } from '@playwright/test'
import { Allure } from 'common/allure-helper'

export class EmailPage {
  private page: Page
  private currentApp: Locator
  // private page: Page
  private email: Locator
  private newEmail: Locator
  private toAddress: Locator
  private emailSubject: Locator
  private emailBody: Locator
  private sendEmail: Locator
  private emailSuccesfullToastMessage: Locator

  static readonly URL = '/email'

  constructor(page: Page) {
    this.page = page
    this.currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
    this.email = page.locator("//button[@title='Email']").first()
    this.newEmail = page.getByText('New email')
    this.toAddress = page.getByLabel('To:')
    this.emailSubject = page.getByLabel('Subject:')
    this.emailBody = page.getByRole('textbox').nth(2)
    this.sendEmail = page.getByText('Send')
    this.emailSuccesfullToastMessage = page.getByText('Message has been sent')
  }

  async goto(baseURL: string | undefined) {
    await Allure.step('Navigate to Email URL', async () => {
      await this.page.goto(`${baseURL}${EmailPage.URL}`)
    })
  }
  async validateCurrentApp() {
    await expect(this.page).toHaveURL(new RegExp(`${EmailPage.URL}$`))
    await expect(this.currentApp).toContainText('Email')
  }

  async navigateToEmail() {
    await Allure.step(
      'should Navigate to Email when Email button is clicked',
      async () => {
        await this.email.click()
      }
    )
  }

  async clickOnEmail() {
    await Allure.step('should Click on New Email', async () => {
      await this.newEmail.click()
    })
  }

  async fillAndEnterToAddress(to_address: string) {
    await Allure.step('should Fill To Address and press Enter', async () => {
      await this.toAddress.fill(to_address)
      await this.toAddress.press('Enter')
    })
  }

  async fillAndEnterSubject(subject: string) {
    await Allure.step('should Fill Subject', async () => {
      await this.emailSubject.fill(subject)
    })
  }

  async clickOnBodyAndFill(body: string) {
    await Allure.step('should Click on Body', async () => {
      await this.emailBody.click()
      await this.page.waitForTimeout(5000)
      await this.emailBody.fill(body)
      await this.page.waitForTimeout(5000)
    })
  }

  async clickOnSend() {
    await Allure.step('should Click on Send', async () => {
      await this.sendEmail.click()
    })
  }

  async verifyEmailSuccessfulToastMessage() {
    await Allure.step(
      'should verify email successful toast message',
      async () => {
        await expect(this.emailSuccesfullToastMessage).toBeVisible()
      }
    )
  }
}
