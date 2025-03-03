import { BrowserContext, Page, test, expect } from '@playwright/test'
import { CompanyPage } from 'pages/company-searcher/company-page'
import { closeCurrentlyActivePopup } from 'helpers/ui/company-searcher/currently-active-popup'
import { collapseSidebar } from 'helpers/ui/company-searcher/sidebar-helper'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { companyModal } from 'pages/company-searcher/company-modal'
import { setupTestContext } from 'utils/test-context'
import { communicationModal } from 'pages/company-searcher/company-modal'
import usernamesData from 'utils/test-data/company-searcher/usernames.json' // Notice this import
import { Allure } from 'common/allure-helper'
import { faker } from '@faker-js/faker/locale/en'

let sharedPage: Page
let sharedContext: BrowserContext
let locale: string

test.describe('company modal tests', () => {
  let modal: companyModal
  let commModal: communicationModal
  let names: string[]
  test.beforeAll(async ({ browser, baseURL }, testInfo) => {
    sharedContext = await browser.newContext()
    sharedPage = await sharedContext.newPage()
    await sharedPage.goto(baseURL!)
    const context = await setupTestContext(sharedPage, testInfo)
    locale = context.locale
    await sharedPage.waitForLoadState('networkidle')
    await addCursorStyleAndScript(sharedPage)
    const companyPage = new CompanyPage(sharedPage, locale)
    await companyPage.naviagtetoCompanySearcher()
    await collapseSidebar(sharedPage)
    await closeCurrentlyActivePopup(sharedPage)
    modal = new companyModal(sharedPage, locale)
    commModal = new communicationModal(sharedPage, locale)
    names = usernamesData.usernames // Correctly accessing the usernames array
  })

  test('Verify company modal opens for multiple attempts and contains all elements', async () => {
    Allure.addSeverity('critical')
    Allure.addDescription(
      'Verify company modal opens for multiple attempts and contains all elements'
    )
    await modal.manageModal(2) // Number of modals to open
  })

  test('Verify communication modal opens and contains all elements', async () => {
    Allure.addSeverity('critical')
    Allure.addDescription(
      'Verify communication modal opens and contains all elements'
    )
    await modal.openModal(0)
    await commModal.verifyVisibility()
    await modal.closeModal()
  })
  test('user can submit multiple comments and see them displayed', async () => {
    Allure.addSeverity('critical')
    Allure.addDescription(
      'user can submit multiple comments and see them displayed'
    )
    await modal.openModal(0)
    await modal.verifyModalContents()
    await commModal.genarateComments(1) // Modify the number of comments as needed
    await modal.closeModal()
  })

  test('Verify communication tab is collapsed', async () => {
    Allure.addSeverity('normal')
    Allure.addDescription('')
    // Navigate to the specific page where the communication tab is located
    await modal.openModal(0)
    await commModal.closesidepanel()
    await commModal.verifyclosePanel()
    await modal.closeModal()
  })

  test('user can manage modals, submit comments, and tag users', async () => {
    Allure.addSeverity('normal')
    Allure.addDescription(
      'user can manage modals, submit comments, and tag users'
    )
    test.setTimeout(40000) // Increase the timeout to allow for multiple modals to be opened
    await modal.openModal(0)
    await modal.verifyModalContents()
    await commModal.genarateTaggedComments(1, usernamesData.usernames) // Specify iterations and provide usernames
    await modal.closeModal()
  })

  test('Dynamic search filter functionality test', async () => {
    Allure.addSeverity('critical')
    Allure.addDescription('Dynamic search filter functionality test')
    await modal.openModal(0)
    await commModal.genarateComments(3) // Modify the number of comments as needed
    const pickedComment = await commModal.pickCommentText()
    await commModal.typeInSearchField(pickedComment)
    await commModal.assertCommentsContainText(pickedComment)
    await modal.closeModal()
  })

  test('Verify navigation to communications tab', async () => {
    Allure.addSeverity('normal')
    Allure.addDescription(
      'Verify navigation to communications tab from the right panel'
    )
    await modal.openModal(0)
    await commModal.closesidepanel()
    await commModal.verifyCommunicationTabNavigation()
  })

  test('verify navigation to notes tab', async () => {
    Allure.addSeverity('normal')
    Allure.addDescription('verify navigation to notes tab from the right panel')
    await commModal.closesidepanel()
    await commModal.VerifyNotesTabNavigation()
  })

  test('Verify navigation to contacts tab', async () => {
    Allure.addSeverity('normal')
    Allure.addDescription(
      'Verify navigation to contacts tab from the right panel'
    )
    await commModal.closesidepanel()
    await commModal.VerifyContactsNavigation()
  })

  test('Verify navigation to documents tab', async () => {
    Allure.addSeverity('normal')
    Allure.addDescription(
      'Verify navigation to documents tab from the right panel'
    )
    await commModal.closesidepanel()
    await commModal.VerifyDocumentsNavigation()
    await modal.closeModal()
  })

  test('create and verify a note with dynamic content', async () => {
    Allure.addSeverity('normal')
    Allure.addDescription('verify Notes creation Functionality')
    await modal.openModal(0)
    await commModal.openNotesTab()
    await commModal.createAndVerifyNote()
  })

  test.afterAll(async () => {
    await sharedContext.close()
  })
})
