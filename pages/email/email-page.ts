// import {
//   Page,
//   Locator,
//   expect,
//   LocatorScreenshotOptions,
// } from '@playwright/test'
// import { Allure } from 'common/allure-helper'

// export class EmailPage {
//   private page: Page
//   private currentapp: Locator
//   private email: Locator
//   private newemail: Locator
//   private toaddress: Locator
//   private emailsubject: Locator
//   private emailbody: Locator
//   private sendemail: Locator
//   private emailsuccessfulltoastmessage: Locator
//   private firstemail: Locator
//   private forwardemail: Locator
//   private settings: Locator
//   private composeandreply: Locator
//   private managesignature: Locator
//   private addsignature: Locator
//   private addsignaturetitle: Locator
//   private addsignaturebody: Locator
//   private savesignature: Locator
//   private editsignature!: Locator
//   private selectsignature!: Locator
//   private deletesignature!: Locator
//   private replyemail: Locator
//   private confirmpopup: Locator
//   static readonly URL = '/email'

//   constructor(page: Page) {
//     this.page = page
//     this.currentapp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
//     this.email = page.locator("//button[@title='Email']").first()
//     this.newemail = page.getByText('New email')
//     this.toaddress = page.getByLabel('To:')
//     this.emailsubject = page.getByLabel('Subject:')
//     this.emailbody = page.getByRole('textbox').nth(2)
//     this.sendemail = page.getByText('Send', { exact: true })
//     this.emailsuccessfulltoastmessage = page.getByText('Message has been sent')
//     this.firstemail = page.getByTestId(
//       'innomail-today-1'
//     )
//     this.forwardemail = page.locator('#thread-action-bar').getByText('Forward')
//     this.settings = page
//       .locator('#navigation_sidebar')
//       .getByRole('button')
//       .first()
//     this.composeandreply = page.getByRole('button', {
//       name: 'Compose and Reply',
//     })
//     this.managesignature = page.getByText('Manage signatures')
//     this.addsignature = page.getByText('Add signature')
//     this.addsignaturetitle = page.locator('input[type="text"]')
//     this.addsignaturebody = page
//       .locator('#signature-editor-body')
//       .getByRole('textbox')
//     this.savesignature = page.getByText('Save')
//     this.replyemail = page.locator('#thread-action-bar').getByText('Reply')
//     this.confirmpopup = page.getByRole('button', { name: 'Confirm' })
//   }

//   set dynamicxpath(sign_name: string) {
//     this.editsignature = this.page
//       .locator('div')
//       .filter({ hasText: new RegExp(`^${sign_name}$`) })
//       .getByRole('button')
//       .first()
//     this.selectsignature = this.page
//       .locator('#portal__root')
//       .getByText(sign_name)
//       .first()
//     this.deletesignature = this.page
//       .locator('div')
//       .filter({ hasText: new RegExp(`^${sign_name}$`) })
//       .getByRole('button')
//       .nth(1)
//   }

//   async goto(baseURL: string | undefined) {
//     await Allure.step('navigate to email url', async () => {
//       await this.page.goto(`${baseURL}${EmailPage.URL}`)
//     })
//   }

//   async validatecurrentapp() {
//     await expect(this.page).toHaveURL(new RegExp(`${EmailPage.URL}$`))
//     await expect(this.currentapp).toContainText('Email')
//   }

//   async navigatetoemail() {
//     await Allure.step(
//       'should navigate to email when email button is clicked',
//       async () => {
//         await this.email.click()
//       }
//     )
//   }

//   async clickonnewemail() {
//     await Allure.step('should click on new email', async () => {
//       await this.newemail.click()
//     })
//   }

//   async fillandentertoaddress(to_address: string) {
//     await Allure.step('should fill to address and press enter', async () => {
//       await this.toaddress.fill(to_address)
//       await this.toaddress.press('Enter')
//     })
//   }

//   async fillandentersubject(subject: string) {
//     await Allure.step('should fill subject', async () => {
//       await this.emailsubject.fill(subject)
//     })
//   }

//   async clickonbodyandfill(body: string) {
//     await Allure.step('should click on body', async () => {
//       await this.emailbody.click()
//       await this.page.waitForTimeout(5000)
//       await this.emailbody.fill(body)
//       await this.page.waitForTimeout(5000)
//     })
//   }

//   async clickonsend() {
//     await Allure.step('should click on send', async () => {
//       await this.sendemail.click()
//     })
//   }

//   async verifyemailsuccessfultoastmessage() {
//     await Allure.step(
//       'should verify email successful toast message',
//       async () => {
//         await expect(this.emailsuccessfulltoastmessage).toBeVisible()
//       }
//     )
//   }

//   async clickonfirstemail() {
//     await Allure.step('should click on first email', async () => {
//       await this.firstemail.click()
//     })
//   }

//   async clickonforward() {
//     await Allure.step('should click on forward', async () => {
//       await this.forwardemail.click()
//     })
//   }

//   async clickonsettings() {
//     await Allure.step('should click on setting', async () => {
//       await this.settings.click()
//     })
//   }

//   async navigatetocomposeandreply() {
//     await Allure.step('should navigate to compose and reply', async () => {
//       await this.composeandreply.click()
//     })
//   }

//   async clickonmanagesignature() {
//     await Allure.step('should click on manage signature', async () => {
//       await this.managesignature.click()
//     })
//   }

//   async clickonaddsignature() {
//     await Allure.step('should click on add signature', async () => {
//       await this.addsignature.click()
//     })
//   }

//   async addtitosignature(title: string) {
//     await Allure.step('should click and add title', async () => {
//       await this.addsignaturetitle.click()
//       await this.addsignaturetitle.fill(title)
//     })
//   }

//   async addbodytosignature(body: string) {
//     await Allure.step('should click and add body', async () => {
//       await this.addsignaturebody.click()
//       await this.addsignaturebody.fill(body)
//     })
//   }

//   async savethesignature() {
//     await Allure.step('click on save button on manage signature', async () => {
//       await this.savesignature.click()
//     })
//   }

//   async editthesignature() {
//     await Allure.step('click on edit the signature', async () => {
//       await this.editsignature.click()
//     })
//   }

//   async selectthesignature() {
//     await Allure.step('click to select the signature', async () => {
//       await this.selectsignature.click()
//     })
//   }

//   async deletethesignature() {
//     await Allure.step('click to delete the signature', async () => {
//       await this.deletesignature.click()
//     })
//   }

//   async clickonreply() {
//     await Allure.step('click on reply button', async () => {
//       await this.replyemail.click()
//     })
//   }

//   async clickonconfirm() {
//     await Allure.step('click on confirm button', async () => {
//       await this.confirmpopup.click()
//     })
//   }
// }

import {
  Page,
  Locator,
  expect,
  LocatorScreenshotOptions,
} from '@playwright/test'
import { Allure } from 'common/allure-helper'

export class EmailPage {
  private page: Page
  private currentApp: Locator
  private email: Locator
  private newEmail: Locator
  private toAddress: Locator
  private emailSubject: Locator
  private emailBody: Locator
  private sendEmail: Locator
  private emailSuccessfulToastMessage: Locator
  private firstEmail: Locator
  private forwardEmail: Locator
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
  private replyEmail: Locator
  private confirmPopup: Locator
  static readonly URL = '/email'

  constructor(page: Page) {
    this.page = page
    this.currentApp = page.locator('p.m5ZbRpDkQfW8BXDqdzmY')
    this.email = page.locator("//button[@title='Email']").first()
    this.newEmail = page.getByText('New email')
    this.toAddress = page.getByLabel('To:')
    this.emailSubject = page.getByLabel('Subject:')
    this.emailBody = page.getByRole('textbox').nth(2)
    this.sendEmail = page.getByText('Send', { exact: true })
    this.emailSuccessfulToastMessage = page.getByText('Message has been sent')
    this.firstEmail = page.getByTestId('innomail-today-1')
    this.forwardEmail = page.locator('#thread-action-bar').getByText('Forward')
    this.settings = page
      .locator('#navigation_sidebar')
      .getByRole('button')
      .first()
    this.composeAndReply = page.getByRole('button', {
      name: 'Compose and Reply',
    })
    this.manageSignature = page.getByText('Manage signatures')
    this.addSignature = page.getByText('Add signature')
    this.addSignatureTitle = page.locator('input[type="text"]')
    this.addSignatureBody = page
      .locator('#signature-editor-body')
      .getByRole('textbox')
    this.saveSignature = page.getByText('Save')
    this.replyEmail = page.locator('#thread-action-bar').getByText('Reply')
    this.confirmPopup = page.getByRole('button', { name: 'Confirm' })
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

  async clickOnNewEmail() {
    await Allure.step('should click on new email', async () => {
      await this.newEmail.click()
    })
  }

  async fillAndEnterToAddress(toAddress: string) {
    await Allure.step('should fill to address and press enter', async () => {
      await this.toAddress.fill(toAddress)
      await this.toAddress.press('Enter')
    })
  }

  async fillAndEnterSubject(subject: string) {
    await Allure.step('should fill subject', async () => {
      await this.emailSubject.fill(subject)
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

  async clickOnFirstEmail() {
    await Allure.step('should click on first email', async () => {
      await this.firstEmail.click()
    })
  }

  async clickOnForward() {
    await Allure.step('should click on forward', async () => {
      await this.forwardEmail.click()
    })
  }

  async clickOnSettings() {
    await Allure.step('should click on setting', async () => {
      await this.settings.click()
    })
  }

  async navigateToComposeAndReply() {
    await Allure.step('should navigate to compose and reply', async () => {
      await this.composeAndReply.click()
    })
  }

  async clickOnManageSignature() {
    await Allure.step('should click on manage signature', async () => {
      await this.manageSignature.click()
    })
  }

  async clickOnAddSignature() {
    await Allure.step('should click on add signature', async () => {
      await this.addSignature.click()
    })
  }

  async addTitleToSignature(title: string) {
    await Allure.step('should click and add title', async () => {
      await this.addSignatureTitle.click()
      await this.addSignatureTitle.fill(title)
    })
  }

  async addBodyToSignature(body: string) {
    await Allure.step('should click and add body', async () => {
      await this.addSignatureBody.click()
      await this.addSignatureBody.fill(body)
    })
  }

  async saveTheSignature() {
    await Allure.step('click on save button on manage signature', async () => {
      await this.saveSignature.click()
    })
  }

  async editTheSignature() {
    await Allure.step('click on edit the signature', async () => {
      await this.editSignature.click()
    })
  }

  async selectTheSignature() {
    await Allure.step('click to select the signature', async () => {
      await this.selectSignature.click()
    })
  }

  async deleteTheSignature() {
    await Allure.step('click to delete the signature', async () => {
      await this.deleteSignature.click()
    })
  }

  async clickOnReply() {
    await Allure.step('click on reply button', async () => {
      await this.replyEmail.click()
    })
  }

  async clickOnConfirm() {
    await Allure.step('click on confirm button', async () => {
      await this.confirmPopup.click()
    })
  }
}
