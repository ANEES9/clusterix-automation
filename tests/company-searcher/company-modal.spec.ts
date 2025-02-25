import { BrowserContext, Page, test, expect } from '@playwright/test'
import { CompanyPage } from 'pages/company-searcher/company-page'
import { closeCurrentlyActivePopup } from 'helpers/ui/company-searcher/currently-active-popup'
import { collapseSidebar } from 'helpers/ui/company-searcher/sidebar-helper'
import { addCursorStyleAndScript } from 'common/cursor-helper'
import { companyModal } from 'pages/company-searcher/company-modal'
import { setupTestContext } from 'utils/test-context'
import { communicationModal } from 'pages/company-searcher/company-modal'
import usernamesData from 'utils/test-data/company-searcher/usernames.json' // Notice this import
import { waitForDebugger } from 'node:inspector'

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
    commModal = new communicationModal(sharedPage)
    names = usernamesData.usernames // Correctly accessing the usernames array
  })

  test('Verify company modal opens for multiple attempts and contains all elements', async () => {
    await modal.manageModal(2) // Number of modals to open
  })

  test('user can submit multiple comments and see them displayed', async () => {
    await modal.openModal(0)
    await modal.verifyModalContents()
    await commModal.genarateComments(1) // Modify the number of comments as needed
    await modal.closeModal()
  })

  test('user can manage modals, submit comments, and tag users', async () => {
    test.setTimeout(40000) // Increase the timeout to allow for multiple modals to be opened
    await modal.openModal(0)
    await modal.verifyModalContents()
    await commModal.genarateTaggedComments(1, usernamesData.usernames) // Specify iterations and provide usernames
    await modal.closeModal()
  })
  test.afterAll(async () => {
    await sharedContext.close()
  })
})
