import { Browser, Page, test } from '@playwright/test'
import { Allure } from 'common/allure-helper'
import { EmailPage } from 'pages/email/'
import { setupTestContext } from 'utils/test-context'
import { BrowserContext } from 'playwright'

let browser: Browser
let context: BrowserContext
let page: Page
let emailPage: EmailPage
let locale: string

test.describe.parallel('Dashboard Tab Tests', () => {
  test.beforeAll(async ({ browser: testBrowser, baseURL }, testInfo) => {
    browser = testBrowser
    context = await browser.newContext()
    page = await context.newPage()
    Allure.addAppOwner('Bulk Mailing')
    Allure.addSeverity('critical')
    Allure.addTag('smoke')
    const testContext = await setupTestContext(page, testInfo)
    locale = testContext.locale
    emailPage = new EmailPage(page, locale)
    await emailPage.goTo(baseURL)
  })

  test('Validate Email Home Page Dashboard is accessible', async () => {
    Allure.addDescription(
      'This test verifies that all default folders and key elements in the Email application are accessible on the Home Page Dashboard.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await Allure.step(
      'Verify the default folders in the Email application',
      async () => {
        await emailPage.verifyInboxFolder()
        await emailPage.verifySentItemsFolder()
        await emailPage.verifyJunkEmailFolder()
        await emailPage.verifyArchiveFolder()
        await emailPage.verifyDeletedItemsFolder()
        await emailPage.verifyDraftsFolder()
        await emailPage.verifyScheduledEmailsFolder()
      }
    )

    await Allure.step(
      'Verify key UI elements on the Email Home Page Dashboard',
      async () => {
        await emailPage.verifySettingButton()
        await emailPage.verifyNewEmail()
        await emailPage.verifyCreateFolderButton()
      }
    )
  })

  test('Validate Inbox in Home Page Dashboard is accessible and clickable', async () => {
    Allure.addDescription(
      'This test verifies that the Inbox folder on the Home Page Dashboard is accessible and can be clicked successfully.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await Allure.step(
      'Verify the Inbox folder is accessible and clickable',
      async () => {
        await emailPage.verifyInboxFolder()
        await emailPage.clickInboxFolder()
      }
    )
  })

  test('Validate Sent Items in Home Page Dashboard is accessible and clickable', async () => {
    Allure.addDescription(
      'This test verifies that the Sent Items folder on the Home Page Dashboard is accessible and can be clicked successfully.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await Allure.step(
      'Verify the Sent Items folder is accessible and clickable',
      async () => {
        await emailPage.verifySentItemsFolder()
        await emailPage.clickSentItemsFolder()
      }
    )
  })

  test('Validate Junk Email in Home Page Dashboard is accessible and clickable', async () => {
    Allure.addDescription(
      'This test verifies that the Junk Email folder on the Home Page Dashboard is accessible and can be clicked successfully.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await Allure.step(
      'Verify the Junk Email folder is accessible and clickable',
      async () => {
        await emailPage.verifyJunkEmailFolder()
        await emailPage.clickJunkEmailFolder()
      }
    )
  })

  test('Validate Archive in Home Page Dashboard is accessible and clickable', async () => {
    Allure.addDescription(
      'This test verifies that the Archive folder on the Home Page Dashboard is accessible and can be clicked successfully.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await Allure.step(
      'Verify the Archive folder is accessible and clickable',
      async () => {
        await emailPage.verifyArchiveFolder()
        await emailPage.clickArchiveFolder()
      }
    )
  })

  test('Validate Deleted Items in Home Page Dashboard is accessible and clickable', async () => {
    Allure.addDescription(
      'This test verifies that the Deleted Items folder on the Home Page Dashboard is accessible and can be clicked successfully.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await Allure.step(
      'Verify the Deleted Items folder is accessible and clickable',
      async () => {
        await emailPage.verifyDeletedItemsFolder()
        await emailPage.clickDeletedItemsFolder()
      }
    )
  })

  test('Validate Drafts in Home Page Dashboard is accessible and clickable', async () => {
    Allure.addDescription(
      'This test verifies that the Drafts folder on the Home Page Dashboard is accessible and can be clicked successfully.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await Allure.step(
      'Verify the Drafts folder is accessible and clickable',
      async () => {
        await emailPage.verifyDraftsFolder()
        await emailPage.clickDraftsFolder()
      }
    )
  })

  test('Validate Scheduled Emails in Home Page Dashboard is accessible and clickable', async () => {
    Allure.addDescription(
      'This test verifies that the Scheduled Emails folder on the Home Page Dashboard is accessible and can be clicked successfully.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await Allure.step(
      'Verify the Scheduled Emails folder is accessible and clickable',
      async () => {
        await emailPage.verifyScheduledEmailsFolder()
        await emailPage.clickScheduledEmailsFolder()
      }
    )
  })

  test('Validate Setting Button in Home Page Dashboard is accessible and clickable', async () => {
    Allure.addDescription(
      'This test verifies that the Setting button on the Home Page Dashboard is accessible and can be clicked successfully.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await Allure.step(
      'Verify the Setting button is accessible and clickable',
      async () => {
        await emailPage.verifySettingButton()
        await emailPage.clickOnSettings()
      }
    )
  })

  test('Validate New Email in Home Page Dashboard is accessible and clickable', async () => {
    Allure.addDescription(
      'This test verifies that the New Email button on the Home Page Dashboard is accessible, clickable, and that the email editor can be closed successfully.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await Allure.step(
      'Verify the New Email button is accessible and clickable',
      async () => {
        await emailPage.verifyNewEmail()
        await emailPage.clickOnNewEmail()
      }
    )

    await Allure.step('Verify the email editor can be closed', async () => {
      await emailPage.verifyCloseEditor()
      await emailPage.clickOnCloseEditor()
    })
  })

  test('Validate Create Folder Button in Home Page Dashboard is accessible and clickable', async () => {
    Allure.addDescription(
      'This test verifies that the Create Folder button on the Home Page Dashboard is accessible, clickable, and that the cancel folder modal functions correctly.'
    )
    Allure.addSeverity('normal')
    Allure.addTag('smoke')

    await Allure.step(
      'Verify the Create Folder button is accessible and clickable',
      async () => {
        await emailPage.verifyCreateFolderButton()
        await emailPage.clickOnCreateFolder()
      }
    )

    await Allure.step(
      'Verify the Cancel Folder modal is displayed and can be closed',
      async () => {
        await emailPage.verifyCancelFolderModal()
        await emailPage.clickOnCancelFolderModal()
      }
    )
  })

  test.afterAll(async () => {
    await context.close()
  })
})
