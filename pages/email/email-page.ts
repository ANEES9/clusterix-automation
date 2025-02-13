import { Page, Locator, expect, TestInfo } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { getTranslations } from 'common/get-translations-helper'

export class EmailPage {
  private page: Page
  private translations: Record<string, any>

  private currentApp: Locator
  private email: Locator
  private newEmail: Locator
  private toAddress: Locator
  private emailSubject: Locator
  private emailBody: Locator
  private sendEmail: Locator
  private emailSuccessfulToastMessage: Locator
  private firstEmail: Locator
  private topForwardEmail: Locator
  private settings: Locator
  private composeAndReply: Locator
  private manageSignature: Locator
  private addSignature: Locator
  private addSignatureTitle: Locator
  private addSignatureBody: Locator
  private saveSignature: Locator
  private editSignature!: Locator
  private selectSignature!: Locator
  private deleteSignature!: Locator
  private topReplyEmail: Locator
  private confirmPopup: Locator
  private createFolder: Locator
  private folderName: Locator
  private saveFolder: Locator
  private folderSuccessfulToastMessage: Locator
  private duplicateFolderErrorToastMessage: Locator
  private emailNameDropdown: Locator
  private switchBetweenEmail!: Locator
  private switchBackToEmail!: Locator
  static readonly URL = '/email'

  constructor(page: Page, locale: TestInfo) {
    this.page = page
    this.translations = getTranslations('email', locale)
    this.currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
    this.email = page.locator("//button[@title='Email']").first()
    this.newEmail = page.getByText('New email')
    this.toAddress = page.getByLabel('To:')
    this.emailSubject = page.getByLabel('Subject:')
    this.emailBody = page.getByRole('textbox').nth(2)
    this.sendEmail = page.getByText('Send', { exact: true })
    this.emailSuccessfulToastMessage = page.getByText('Message has been sent')
    this.firstEmail = page.getByTestId('innomail-today-1')
    this.topForwardEmail = page
      .locator('#thread-action-bar')
      .getByText('Forward')
    this.settings = page.locator('.ca-flex > button').first()
    this.composeAndReply = page.getByRole('button', {
      name: 'Compose and Reply',
    })
    this.manageSignature = page.getByText('Manage signatures')
    this.addSignature = page.getByRole('button', { name: 'Add signature' })
    this.addSignatureTitle = page.getByLabel('Signature title')
    this.addSignatureBody = page
      .locator('#signature-editor-body')
      .getByRole('textbox')
    this.saveSignature = page.getByText('Save')
    this.topReplyEmail = page.locator('#thread-action-bar').getByText('Reply')
    this.confirmPopup = page.getByRole('button', { name: 'Confirm' })
    this.createFolder = page.getByRole('button', { name: 'Create new folder' })
    this.folderName = page.getByPlaceholder('Enter a name for the folder')
    this.saveFolder = page.getByText('Create folder')
    this.folderSuccessfulToastMessage = page.getByText(
      'The folder has been created'
    )
    this.duplicateFolderErrorToastMessage = page.getByText(
      "The Mailbox couldn't be"
    )
    this.emailNameDropdown = page.locator('.DropDownSelect_a1__DpNtD')
  }

  set dynamicXPath(signName: string) {
    this.editSignature = this.page
      .locator('div')
      .filter({ hasText: new RegExp(`^${signName}$`) })
      .getByRole('button')
      .first()
    this.selectSignature = this.page
      .locator('#portal__root')
      .getByText(signName)
      .first()
    this.deleteSignature = this.page
      .locator('div')
      .filter({ hasText: new RegExp(`^${signName}$`) })
      .getByRole('button')
      .nth(1)
  }

  set switchBetweenEmailLocator(emailID: string) {
    this.switchBetweenEmail = this.page.getByText(emailID)
  }

  set switchBackToEmailLocator(emailID: string) {
    this.switchBackToEmail = this.page
      .locator('div')
      .filter({ hasText: new RegExp(`^${emailID}$`) })
      .first()
  }

  async goTo(baseURL: string | undefined) {
    await Allure.step('navigate to email url', async () => {
      await this.page.goto(`${baseURL}${EmailPage.URL}`)
    })
  }

  async validateCurrentApp() {
    await expect(this.page).toHaveURL(new RegExp(`${EmailPage.URL}$`))
    await expect(this.currentApp).toContainText('Email')
  }

  async navigateToEmail() {
    await Allure.step(
      'should navigate to email when email button is clicked',
      async () => {
        await this.email.click()
      }
    )
  }
  async verifyNewEmail() {
    await Allure.step('Verify New Email button is visible', async () => {
      await expect(this.newEmail).toBeVisible()
    })
  }

  async clickOnNewEmail() {
    await Allure.step('should click on new email', async () => {
      await this.newEmail.click()
    })
  }

  async verifyToAddressField() {
    await Allure.step('Verify To Address field is visible', async () => {
      await expect(this.toAddress).toBeVisible()
    })
  }

  async fillAndEnterToAddress(toAddress: string) {
    await Allure.step('should fill to address and press enter', async () => {
      await this.toAddress.fill(toAddress)
      await this.toAddress.press('Enter')
    })
  }

  async verifySubjectField() {
    await Allure.step('Verify Subject field is visible', async () => {
      await expect(this.emailSubject).toBeVisible()
    })
  }

  async fillAndEnterSubject(subject: string) {
    await Allure.step('should fill subject', async () => {
      await this.emailSubject.fill(subject)
    })
  }

  async verifyBodyofEmail() {
    await Allure.step('Verify Body field is visible', async () => {
      await expect(this.emailBody).toBeVisible()
    })
  }
  async clickOnBodyAndFill(body: string) {
    await Allure.step('should click on body', async () => {
      await this.emailBody.click()
      await this.page.waitForTimeout(5000)
      await this.emailBody.fill(body)
      await this.page.waitForTimeout(5000)
    })
  }

  async verifySendButton() {
    await Allure.step('Verify Send Email Button is visible', async () => {
      await expect(this.sendEmail).toBeVisible()
    })
  }
  async clickOnSend() {
    await Allure.step('should click on send', async () => {
      await this.sendEmail.click()
    })
  }

  async verifyEmailSuccessfulToastMessage() {
    await Allure.step(
      'should verify email successful toast message',
      async () => {
        await expect(this.emailSuccessfulToastMessage).toBeVisible()
      }
    )
  }

  async verifyFirstEmail() {
    await Allure.step('Verify first email is visible', async () => {
      await expect(this.firstEmail).toBeVisible()
    })
  }
  async clickOnFirstEmail() {
    await Allure.step('should click on first email', async () => {
      await this.firstEmail.click()
    })
  }

  async verifyTopForwardButton() {
    await Allure.step('Verify Top Forward button is visible', async () => {
      await expect(this.topForwardEmail).toBeVisible()
    })
  }

  async clickOnTopForward() {
    await Allure.step('should click on forward', async () => {
      await this.topForwardEmail.click()
    })
  }

  async verifySettingButton() {
    await Allure.step('Verify Setting Button is visible', async () => {
      await expect(this.settings).toBeVisible()
    })
  }

  async clickOnSettings() {
    await Allure.step('should click on setting', async () => {
      await this.settings.click()
    })
  }

  async verifyComposeAndReply() {
    await Allure.step(
      'Verify Compose and Reply section is visible',
      async () => {
        await expect(this.composeAndReply).toBeVisible()
      }
    )
  }

  async navigateToComposeAndReply() {
    await Allure.step('should navigate to compose and reply', async () => {
      await this.composeAndReply.click()
    })
  }

  async verifyManageSignatureButton() {
    await Allure.step('Verify Manage Signature Button is visible', async () => {
      await expect(this.manageSignature).toBeVisible()
    })
  }

  async clickOnManageSignature() {
    await Allure.step('should click on manage signature', async () => {
      await this.manageSignature.click()
    })
  }

  async verifyAddSignatureButton() {
    await Allure.step('Verify Add Signature Field is visible', async () => {
      await expect(this.addSignature).toBeVisible()
    })
  }

  async clickOnAddSignature() {
    await Allure.step('should click on add signature', async () => {
      await this.addSignature.click()
    })
  }

  async verifyTitleFieldOfSignature() {
    await Allure.step(
      'Verify Title field is visible in Manage Signature Modal',
      async () => {
        await expect(this.addSignatureTitle).toBeVisible()
      }
    )
  }
  async addTitleToSignature(title: string) {
    await Allure.step('should click and add title', async () => {
      await this.addSignatureTitle.click()
      await this.addSignatureTitle.fill(title)
    })
  }

  async verifyBodyFieldOfSignature() {
    await Allure.step(
      'Verify Body field is visible in Manage Signature Modal',
      async () => {
        await expect(this.addSignatureBody).toBeVisible()
      }
    )
  }

  async addBodyToSignature(body: string) {
    await Allure.step('should click and add body', async () => {
      await this.addSignatureBody.click()
      await this.addSignatureBody.fill(body)
    })
  }

  async verifySaveButtonOfSignature() {
    await Allure.step(
      'Verify Save Button is visible in Manage Signature Modal',
      async () => {
        await expect(this.saveSignature).toBeVisible()
      }
    )
  }

  async saveTheSignature() {
    await Allure.step('click on save button on manage signature', async () => {
      await this.saveSignature.click()
    })
  }

  async verifyEditSiganture() {
    await Allure.step('Verify Edit Signature Button is visible', async () => {
      await expect(this.editSignature).toBeVisible()
    })
  }
  async editTheSignature() {
    await Allure.step('click on edit the signature', async () => {
      await this.editSignature.click()
    })
  }

  async verifyNewSignatureIsPresent() {
    await Allure.step('Verify New Signature is visible', async () => {
      await expect(this.selectSignature).toBeVisible()
    })
  }
  async selectTheSignature() {
    await Allure.step('click to select the signature', async () => {
      await this.selectSignature.click()
    })
  }

  async verifyDeleteSignature() {
    await Allure.step('Verify Delete Siganture Button is visible', async () => {
      await expect(this.deleteSignature).toBeVisible()
    })
  }
  async deleteTheSignature() {
    await Allure.step('click to delete the signature', async () => {
      await this.deleteSignature.click()
    })
  }

  async verifyTopReplyButton() {
    await Allure.step(
      'Verify Top Reply To Email button is visible',
      async () => {
        await expect(this.topReplyEmail).toBeVisible()
      }
    )
  }

  async clickOnTopReplyButton() {
    await Allure.step('click on reply button', async () => {
      await this.topReplyEmail.click()
    })
  }

  async verifyConfirmPopup() {
    await Allure.step('Verify Confirmation Popup is visible', async () => {
      await expect(this.confirmPopup).toBeVisible()
    })
  }

  async clickOnConfirm() {
    await Allure.step('click on confirm button', async () => {
      await this.confirmPopup.click()
    })
  }

  async verifyCreateFolderButton() {
    await Allure.step('Verify Create Folder Button is visible', async () => {
      await expect(this.createFolder).toBeVisible()
    })
  }

  async clickOnCreateFolder() {
    await Allure.step('click on create folder button', async () => {
      await this.createFolder.click()
    })
  }

  async verifyFolderNameField() {
    await Allure.step('Verify Folder Name field is visible', async () => {
      await expect(this.folderName).toBeVisible()
    })
  }

  async fillFolderName(folderName: string) {
    await Allure.step('fill folder name', async () => {
      await this.folderName.fill(folderName)
    })
  }

  async verifySaveFolderButton() {
    await Allure.step('Verify Save Folder Button is visible', async () => {
      await expect(this.saveFolder).toBeVisible()
    })
  }

  async clickOnSaveFolder() {
    await Allure.step('click on save folder button', async () => {
      await this.saveFolder.click()
    })
  }

  async verifyFolderSuccessfulToastMessage() {
    await Allure.step(
      'should verify folder creation successful toast message',
      async () => {
        await expect(this.folderSuccessfulToastMessage).toBeVisible()
      }
    )
  }

  async verifyDuplicateFolderErrorToastMessage() {
    await Allure.step(
      'should verify duplicate folder error toast message',
      async () => {
        await expect(this.duplicateFolderErrorToastMessage).toBeVisible()
      }
    )
  }

  async verifySelectEmailDropdown() {
    await Allure.step('Verify Select Email Dropdown is visible', async () => {
      await expect(this.emailNameDropdown).toBeVisible()
    })
  }
  async clickOnEmailNameDropdown() {
    await Allure.step('click on email name dropdown', async () => {
      await this.emailNameDropdown.click()
    })
  }

  async verifyEmailIDIsPresent() {
    await Allure.step(
      'Verify Selected Email ID in dropdown is visible',
      async () => {
        await expect(this.switchBetweenEmail).toBeVisible()
      }
    )
  }

  async clickOnSwitchBetweenEmail() {
    await Allure.step('click on switch between email', async () => {
      await this.switchBetweenEmail.click()
    })
  }

  async verifyOrginalEmailIDIsPresent() {
    await Allure.step(
      'Verify Original Email ID in dropdown is visible',
      async () => {
        await expect(this.switchBackToEmail).toBeVisible()
      }
    )
  }
  async clickOnSwitchBackToEmail() {
    await Allure.step('click on switch back to email', async () => {
      await this.switchBackToEmail.click()
    })
  }
}
